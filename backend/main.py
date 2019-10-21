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
    actualPage = int(page) - 1
    data = con.execute(f"SELECT * FROM staging.district LIMIT 8 OFFSET {str(actualPage)}")
    pages = con.execute("SELECT COUNT(*) AS pages FROM staging.district")
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
    actualPage = int(page) - 1
    data = con.execute(f"SELECT * FROM staging.house_representatives LIMIT 8 OFFSET {actualPage}")
    pages = con.execute("SELECT COUNT(*) AS pages FROM staging.house_representatives")
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
    actualPage = int(page) - 1
    data = con.execute(f"SELECT * FROM staging.legislations LIMIT 8 OFFSET {str(actualPage)}")
    pages = con.execute("SELECT COUNT(*) AS pages FROM staging.legislations")
    for row in pages:
        pages = ceil(int(row["pages"]) / numLimit)
    resultData = [dict(r) for r in data]
    metaData = {"currentPage" : page, "numPages" : pages}
    return jsonify({"data": resultData, "metaData": metaData})

# instance page apis
@app.route("/Districts/<id>")
def district(id = ""):
    data = con.execute("SELECT * FROM staging.district WHERE id = " + id)
    return jsonify([dict(r) for r in data])

@app.route("/Representatives/<id>")
def representative(id = ""):
    data = con.execute("SELECT * FROM staging.house_representatives WHERE id = '" + id + "'")
    return jsonify([dict(r) for r in data])

@app.route("/Legislations/<id>")
def legislation(id = ""):
    data = con.execute("SELECT * FROM staging.legislations WHERE index = " + id)
    return jsonify([dict(r) for r in data])

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