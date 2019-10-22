from flask import Flask, jsonify, request
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy.sql import text
import sys
sys.path.append('DB_Load')
import db_creds as creds
from flask_cors import CORS
from math import ceil

application = app = Flask(__name__)
CORS(app)

def pgadminconnect():
    db_name = creds.PGDATABASE
    db_pwd = creds.PGPASSWORD
    db_user = creds.PGUSER
    db_host = creds.PGHOST
    db_port = creds.PGPORT
    db_uri = "postgres+psycopg2://"+ str(db_user) + ":" + str(db_pwd) + '@' + str(db_host) + \
             ':' + str(db_port) + '/' + str(db_name)
    print(db_uri)
    engine = create_engine(db_uri)
    con = engine.connect()
    print(con)
    return [con,engine]

[con, engine] = pgadminconnect()

@app.route("/")
def home():
    data = con.execute("SELECT * FROM staging.district LIMIT 5 OFFSET 0")
    return jsonify([dict(r) for r in data])

# model page apis
@app.route("/Districts")
def districts():
    page = request.args.get('page')
    numLimit = request.args.get('limit')
    if page is None:
        page = 1
    if numLimit is None:
        numLimit = 8
    actualPage = (int(page) - 1) * numLimit
    data = con.execute(f"SELECT d.*, m.full_name FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND d.congressional_district = m.district LIMIT 8 OFFSET {str(actualPage)}")
    pages = con.execute("SELECT COUNT(*) AS pages FROM application.districts")
    for row in pages:
        pages = ceil(int(row["pages"]) / numLimit)
    resultData = [dict(r) for r in data]
    metaData = {"currentPage" : page, "numPages" : pages}
    return jsonify({"data": resultData, "metaData": metaData})

@app.route("/Representatives")
def representatives():
    page = request.args.get('page')
    numLimit = request.args.get('limit')
    if page is None:
        page = 1
    if numLimit is None:
        numLimit = 8
    actualPage = (int(page) - 1) * numLimit
    data = con.execute(f"SELECT * FROM application.members WHERE short_title = 'Rep.' LIMIT 8 OFFSET {actualPage}")
    pages = con.execute("SELECT COUNT(*) AS pages FROM application.members WHERE short_title = 'Rep.'")
    for row in pages:
        pages = ceil(int(row["pages"]) / numLimit)
    resultData = [dict(r) for r in data]
    metaData = {"currentPage" : page, "numPages" : pages}
    return jsonify({"data": resultData, "metaData": metaData})

@app.route("/Legislations")
def legislations():
    page = request.args.get('page')
    numLimit = request.args.get('limit')
    if page is None:
        page = 1
    if numLimit is None:
        numLimit = 8
    actualPage = (int(page) - 1) * numLimit
    data = con.execute(f"SELECT * FROM application.legislations WHERE sponsor_title = 'Rep.' LIMIT 8 OFFSET {str(actualPage)}")
    pages = con.execute("SELECT COUNT(*) AS pages FROM application.legislations WHERE sponsor_title = 'Rep.'")
    for row in pages:
        pages = ceil(int(row["pages"]) / numLimit)
    resultData = [dict(r) for r in data]
    metaData = {"currentPage" : page, "numPages" : pages}
    return jsonify({"data": resultData, "metaData": metaData})

# instance page apis
@app.route("/Districts/<id>")
def district(id = ""):
    data0 = con.execute("SELECT * FROM application.districts WHERE id = " + id)
    data1 = con.execute("SELECT l.names FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND d.congressional_district = m.district JOIN (SELECT l.sponsor_name, array_to_string(array_agg(l.short_title), ',') AS names FROM application.legislations AS l GROUP BY l.sponsor_name) AS l ON m.full_name = l.sponsor_name WHERE d.id = " + id)
    data2 = con.execute("SELECT l.names FROM application.districts AS d JOIN (SELECT l.sponsor_state, array_to_string(array_agg(l.short_title), ',') AS names FROM application.legislations AS l GROUP BY l.sponsor_state) AS l ON d.state = l.sponsor_state WHERE d.id = " + id)
    data3 = con.execute("SELECT m.id, m.full_name FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND CAST(d.congressional_district AS INT) = CAST(m.district AS INT) WHERE d.id = " + id)
    data = {}
    data['district'] = [dict(r) for r in data0]
    data['legislationByRepresentative'] = [dict(r) for r in data1]
    data['legislationBySenate'] = [dict(r) for r in data2]
    data['representative'] = [dict(r) for r in data3]
    return jsonify(data)

@app.route("/Representatives/<id>")
def representative(id = ""):
    member = con.execute("SELECT * FROM application.members WHERE id = '" + id + "'")
    fromDistrict = con.execute("SELECT d.id, d.state, d.congressional_district, d.state_abbreviation FROM application.members AS m JOIN application.districts AS d ON m.state = d.state and cast(m.district AS INT) = cast(d.congressional_district AS INT) WHERE m.short_title = 'Rep.' and m.id = '" + id +"';")
    passedLegislation = con.execute("SELECT l.id, l.short_title from application.members AS m JOIN application.legislations AS l ON m.full_name = l.sponsor_name WHERE m.short_title = 'Rep.' and m.id = '" + id +"';")
    data = {}
    data['member'] = [dict(r) for r in member]
    data['fromDistrict'] = [dict(r) for r in fromDistrict]
    data['passedLegislation'] = [dict(r) for r in passedLegislation]
    return jsonify(data)

@app.route("/Legislations/<id>")
def legislation(id = ""):
    legislation = con.execute("SELECT * FROM application.legislations WHERE id = " + id)
    sponsor = con.execute("SELECT m.id FROM application.legislations AS l JOIN application.members AS m ON m.full_name = l.sponsor_name WHERE l.id = " + id)
    fromDistrict = con.execute("SELECT d.id, d.state, d.congressional_district FROM application.districts AS d JOIN (SELECT m.id, m.state, m.district FROM application.legislations AS l JOIN application.members AS m ON m.full_name = l.sponsor_name WHERE l.id = " + id + ") AS m ON m.state = d.state and CAST(m.district AS INT) = CAST(d.congressional_district AS INT);")
    data = {}
    data['legislation'] = [dict(r) for r in legislation]
    data['sponsor'] = [dict(r) for r in sponsor]
    data['passedLegislation'] = [dict(r) for r in fromDistrict]
    return jsonify(data)

# for later use
@app.route("/Districts/sort")
def sortedDistricts():
    return jsonify(response="for later implementation")

@app.route("/Representatives/sort")
def sortedRepresentatives():
    return jsonify(response="for later implementation")

@app.route("/Legislations/sort")
def sortedLegislations():
    return jsonify(response="for later implementation")

@app.route("/Districts/filter")
def filteredDistricts():
    return jsonify(response="for later implementation")

@app.route("/Representatives/filter")
def filteredRepresentatives():
    return jsonify(response="for later implementation")

@app.route("/Legislations/filter")
def filteredLegislations():
    return jsonify(response="for later implementation")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=80)