from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy.sql import text
import sys
sys.path.append('DB_Load')
import db_creds as creds

application = app = Flask(__name__)

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
    data = con.execute("SELECT * FROM staging.district")
    return jsonify([dict(r) for r in data])

@app.route("/Representatives")
def representatives():
    data = con.execute("SELECT * FROM staging.house_representatives")
    return jsonify([dict(r) for r in data])

@app.route("/Legislations")
def legislations():
    data = con.execute("SELECT * FROM staging.legislations")
    return jsonify([dict(r) for r in data])

# instance page apis
@app.route("/Districts/instance/<id>")
def district(id = ""):
    data = con.execute("SELECT * FROM staging.district WHERE id = " + id)
    return jsonify([dict(r) for r in data])

@app.route("/Representatives/instance/<crp_id>")
def representative(crp_id = ""):
    data = con.execute("SELECT * FROM staging.house_representatives WHERE crp_id = '" + crp_id + "'")
    return jsonify([dict(r) for r in data])

@app.route("/Legislations/instance/<index>")
def legislation(index = ""):
    data = con.execute("SELECT * FROM staging.legislations WHERE index = " + index)
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