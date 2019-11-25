# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring
# pylint: disable = too-many-lines
# pylint: disable = import-error
# pylint: disable = line-too-long
import sys

sys.path.append("DB_Load")
import db_creds as creds
from flask_cors import CORS
from math import ceil
from flask import Flask, jsonify, request, json
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from flask_api import status
from werkzeug.exceptions import HTTPException, BadRequest

application = app = Flask(__name__)
CORS(app)

def pgadminconnect():
    db_name = creds.PGDATABASE
    db_pwd = creds.PGPASSWORD
    db_user = creds.PGUSER
    db_host = creds.PGHOST
    db_port = creds.PGPORT
    db_uri = (
        "postgres+psycopg2://"
        + str(db_user)
        + ":"
        + str(db_pwd)
        + "@"
        + str(db_host)
        + ":"
        + str(db_port)
        + "/"
        + str(db_name)
    )
    print(db_uri)
    engine = create_engine(db_uri)
    con = engine.connect()
    print(con)
    return [con, engine]


[con, engine] = pgadminconnect()

# from flask documentation
@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

@app.route("/")
def home():
    data = {
        "status": 200,
        "response": "Welcome to foodmeonce.me API services. You can get all the information about our service in this API.",
    }
    return jsonify(data)


# model page apis
@app.route("/Districts")
def districts():
    page = request.args.get("page")
    numLimit = request.args.get("limit")
    if page is None:
        page = 1
    if numLimit is None:
        numLimit = 8
    actualPage = (int(page) - 1) * int(numLimit)
    data = con.execute(
        f"SELECT d.*, m.full_name  FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND cast(d.congressional_district as INTEGER) = cast(m.district as INTEGER) order by d.state, d.congressional_district LIMIT {numLimit} OFFSET {str(actualPage)}"
    )
    pages = con.execute("SELECT COUNT(*) AS pages FROM application.districts")
    for row in pages:
        pages = ceil(int(row["pages"]) / int(numLimit))
    resultData = [dict(r) for r in data]
    metaData = {"currentPage": page, "numPages": pages}
    return jsonify({"data": resultData, "metaData": metaData})


@app.route("/Representatives")
def representatives():
    page = request.args.get("page")
    numLimit = request.args.get("limit")
    if page is None:
        page = 1
    if numLimit is None:
        numLimit = 8
    actualPage = (int(page) - 1) * int(numLimit)
    data = con.execute(
        f"SELECT * FROM application.members ORDER BY application.members.full_name LIMIT {numLimit} OFFSET {actualPage}"
    )
    pages = con.execute(
        "SELECT COUNT(*) AS pages FROM application.members"
    )
    for row in pages:
        pages = ceil(int(row["pages"]) / int(numLimit))
    resultData = [dict(r) for r in data]
    metaData = {"currentPage": page, "numPages": pages}
    return jsonify({"data": resultData, "metaData": metaData})

@app.route("/Legislations")
def legislations():
    page = request.args.get("page")
    numLimit = request.args.get("limit")
    if page is None:
        page = 1
    if numLimit is None:
        numLimit = 8
    actualPage = (int(page) - 1) * int(numLimit)
    data = con.execute(
        f"SELECT * FROM application.legislations  order by application.legislations.short_title LIMIT {numLimit} OFFSET {str(actualPage)}"
    )
    pages = con.execute(
        "SELECT COUNT(*) AS pages FROM application.legislations"
    )
    for row in pages:
        pages = ceil(int(row["pages"]) / int(numLimit))
    resultData = [dict(r) for r in data]
    metaData = {"currentPage": page, "numPages": pages}
    return jsonify({"data": resultData, "metaData": metaData})


# instance page apis
@app.route("/Districts/<id>")
def district(id=""):
    data0 = con.execute("SELECT * FROM application.districts WHERE id = " + id)
    data1 = con.execute(
        "SELECT l.short_title, l.id FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND d.congressional_district = m.district JOIN (SELECT l.id, l.sponsor_name, l.short_title FROM application.legislations AS l) AS l ON m.full_name = l.sponsor_name WHERE d.id = "
        + id
    )
    data2 = con.execute(
        "SELECT l.short_title, l.id FROM application.districts AS d JOIN (SELECT l.id, l.sponsor_state, l.short_title FROM application.legislations AS l) AS l ON d.state_abbreviation = l.sponsor_state WHERE d.id = "
        + id
    )
    data3 = con.execute(
        "SELECT m.id, m.full_name, m.party FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND CAST(d.congressional_district AS INT) = CAST(m.district AS INT) WHERE d.id = "
        + id
    )
    data = {}
    data["district"] = [dict(r) for r in data0]
    data["legislationByRepresentative"] = [dict(r) for r in data1]
    data["legislationBySenate"] = [dict(r) for r in data2]
    data["representative"] = [dict(r) for r in data3]
    return jsonify(data)


@app.route("/Representatives/<id>")
def representative(id=""):
    member = con.execute("SELECT * FROM application.members WHERE id = '" + id + "'")
    type = con.execute("SELECT type_flag FROM application.members WHERE id = '" + id + "'")
    type_dict = [dict(r) for r in type]
    # print(type_dict[0]["type_flag"])
    if type_dict[0]["type_flag"]:
        fromDistrict = con.execute(
            "SELECT d.id, d.state, d.congressional_district, d.state_abbreviation FROM application.members AS m JOIN application.districts AS d ON m.state = d.state and cast(m.district AS INT) = cast(d.congressional_district AS INT) WHERE m.short_title = 'Rep.' and m.id = '"
            + id
            + "';"
        )
    else:
        fromDistrict = con.execute(
            "SELECT distinct m.full_name, type_flag, d.state_abbreviation FROM application.members as m JOIN application.districts as d on m.state = d.state  where m.id = '"
            + id
            + "';"
            )
    passedLegislation = con.execute(
        "SELECT l.id, l.short_title from application.members AS m JOIN application.legislations AS l ON m.full_name = l.sponsor_name and m.id = '"
        + id
        + "';"
    )
    data = {}
    data["member"] = [dict(r) for r in member]
    data["fromDistrict"] = [dict(r) for r in fromDistrict]
    data["passedLegislation"] = [dict(r) for r in passedLegislation]
    return jsonify(data)


@app.route("/Legislations/<id>")
def legislation(id=""):
    legislation = con.execute("SELECT * FROM application.legislations WHERE id = " + id)
    sponsor = con.execute(
        "SELECT m.id, m.full_name FROM application.legislations AS l JOIN application.members AS m ON m.full_name = l.sponsor_name WHERE l.id = "
        + id
    )
    sponsor_type = con.execute(
        "SELECT m.id, m.type_flag FROM application.legislations AS l JOIN application.members AS m ON m.full_name = l.sponsor_name WHERE l.id = "
        + id
    )
    type_dict = [dict(r) for r in sponsor_type]
    # print(type_dict[0]["type_flag"])
    if (type_dict[0]["type_flag"]):
        fromDistrict = con.execute(
            "SELECT m.full_name, d.id, m.state, m.district FROM application.legislations AS l JOIN application.members AS m ON m.full_name = l.sponsor_name "
            "JOIN application.districts as d "
            "on m.state = d.state and cast(m.district as INT) = cast(d.congressional_district as INT) where l.id = '"
            + id
            + "';"
        )
    else:
        fromDistrict = con.execute(
            "SELECT distinct m.full_name, type_flag, m.state FROM application.legislations AS l JOIN application.members AS m ON m.full_name = l.sponsor_name WHERE l.id = '"
            + id
            + "';"
        )
    data = {}
    data["legislation"] = [dict(r) for r in legislation]
    data["sponsor"] = [dict(r) for r in sponsor]
    data["fromDistrict"] = [dict(r) for r in fromDistrict]
    return jsonify(data)

@app.route("/Districts/sort")
def sortedDistricts():
    try:
        attribute = request.args.get("attribute")
        order = request.args.get("order")
        page = request.args.get("page")
        numLimit = request.args.get("limit")
        if attribute is None:
            raise BadRequest("Please make sure the query parameters are passed in with correct attribute name and value")
        if order is None or (order != "ASC" and order != "DESC"):
            order = "ASC"
        if page is None:
            page = 1
        if numLimit is None:
            numLimit = 8
        actualPage = (int(page) - 1) * int(numLimit)
        data = con.execute(
            f"SELECT d.*, m.full_name  FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND cast(d.congressional_district as INTEGER) = cast(m.district as INTEGER) order by d.{attribute} {order} LIMIT {numLimit} OFFSET {str(actualPage)}"
        )
        pages = con.execute("SELECT COUNT(*) AS pages FROM application.districts")
        for row in pages:
            pages = ceil(int(row["pages"]) / int(numLimit))
        resultData = [dict(r) for r in data]
        metaData = {"currentPage": page, "numPages": pages}
        return jsonify({"data": resultData, "metaData": metaData, "sorted": attribute + "-" + order})
    except SQLAlchemyError as ex:
        raise BadRequest("Please make sure the query parameters are passed in with correct attribute name and value")


@app.route("/Representatives/sort")
def sortedRepresentatives():
    try:
        attribute = request.args.get("attribute")
        order = request.args.get("order")
        page = request.args.get("page")
        numLimit = request.args.get("limit")
        if attribute is None:
            raise BadRequest("Please make sure the query parameters are passed in with correct attribute name and value")
        if order is None or (order != "ASC" and order != "DESC"):
            order = "ASC"
        if page is None:
            page = 1
        if numLimit is None:
            numLimit = 8
        actualPage = (int(page) - 1) * int(numLimit)
        data = con.execute(
            f"SELECT * FROM application.members ORDER BY application.members.{attribute} {order} LIMIT {numLimit} OFFSET {actualPage}"
        )
        pages = con.execute(
            "SELECT COUNT(*) AS pages FROM application.members"
        )
        for row in pages:
            pages = ceil(int(row["pages"]) / int(numLimit))
        resultData = [dict(r) for r in data]
        metaData = {"currentPage": page, "numPages": pages}
        return jsonify({"data": resultData, "metaData": metaData, "sorted": attribute + "-" + order})
    except SQLAlchemyError as ex:
        raise BadRequest("Please make sure the query parameters are passed in with correct attribute name and value")


@app.route("/Legislations/sort")
def sortedLegislations():
    try:
        attribute = request.args.get("attribute")
        order = request.args.get("order")
        page = request.args.get("page")
        numLimit = request.args.get("limit")
        if attribute is None:
            raise BadRequest("Please make sure the query parameters are passed in with correct attribute name and value")
        if order is None or (order != "ASC" and order != "DESC"):
            order = "ASC"
        if page is None:
            page = 1
        if numLimit is None:
            numLimit = 8
        actualPage = (int(page) - 1) * int(numLimit)
        data = con.execute(
            f"SELECT * FROM application.legislations  order by application.legislations.{attribute} {order} LIMIT {numLimit} OFFSET {str(actualPage)}"
        )
        pages = con.execute(
            "SELECT COUNT(*) AS pages FROM application.legislations"
        )
        for row in pages:
            pages = ceil(int(row["pages"]) / int(numLimit))
        resultData = [dict(r) for r in data]
        metaData = {"currentPage": page, "numPages": pages}
        return jsonify({"data": resultData, "metaData": metaData, "sorted": attribute + "-" + order})
    except SQLAlchemyError as ex:
        raise BadRequest("Please make sure the query parameters are passed in with correct attribute name and value")


@app.route("/Districts/filter")
def filteredDistricts():
    try:
        page = request.args.get("page")
        numLimit = request.args.get("limit")

        state = request.args.get("state")
        population = request.args.get("population")
        mean_income = request.args.get("mean_income")
        median_age = request.args.get("median_age")
        gender_ratio = request.args.get("gender_ratio")
        
        filteringPhrase = ""
        if state is not None:
            filteringPhrase += f" d.state like '%%{state}%%'"
        if population is not None:
            minMax = population.split(',')
            addAnd = " and" if filteringPhrase != "" else ""
            filteringPhrase += addAnd
            filteringPhrase += f" population between {minMax[0]} and {minMax[1]}"
        if mean_income is not None:
            minMax = mean_income.split(',')
            addAnd = " and" if filteringPhrase != "" else ""
            filteringPhrase += addAnd
            filteringPhrase += f" mean_income between {minMax[0]} and {minMax[1]}"
        if median_age is not None:
            minMax = median_age.split(',')
            addAnd = " and" if filteringPhrase != "" else ""
            filteringPhrase += addAnd
            filteringPhrase += f" median_age between {minMax[0]} and {minMax[1]}"
        if gender_ratio is not None:
            minMax = gender_ratio.split(',')
            addAnd = " and" if filteringPhrase != "" else ""
            filteringPhrase += addAnd
            filteringPhrase += f" gender_ratio between {minMax[0]} and {minMax[1]}"
        if filteringPhrase != "":
            filteringPhrase = " WHERE " + filteringPhrase

        if page is None:
            page = 1
        if numLimit is None:
            numLimit = 8
        actualPage = (int(page) - 1) * int(numLimit)
        query = f"SELECT d.*, m.full_name  FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND cast(d.congressional_district as INTEGER) = cast(m.district as INTEGER) {filteringPhrase} order by d.state, d.congressional_district LIMIT {numLimit} OFFSET {str(actualPage)}"
        data = con.execute(query)
        pages = con.execute(f"SELECT COUNT(d.*) AS pages FROM (SELECT d.*, m.full_name  FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND cast(d.congressional_district as INTEGER) = cast(m.district as INTEGER) {filteringPhrase} order by d.state, d.congressional_district) AS d")
        for row in pages:
            pages = ceil(int(row["pages"]) / int(numLimit))
        resultData = [dict(r) for r in data]
        metaData = {"currentPage": page, "numPages": pages}
        return jsonify({"data": resultData, "metaData": metaData})
    except SQLAlchemyError as ex:
        raise BadRequest("Please make sure the query parameters are passed in with correct attribute name and value")


@app.route("/Representatives/filter")
def filteredRepresentatives():
    try:
        page = request.args.get("page")
        numLimit = request.args.get("limit")

        date_of_birth = request.args.get("date_of_birth")
        seniority = request.args.get("seniority")
        party = request.args.get("party")
        state = request.args.get("state")
        
        filteringPhrase = ""
        if date_of_birth is not None:
            minMax = date_of_birth.split(',')
            if filteringPhrase != "" :
                filteringPhrase += " and "
            filteringPhrase += f"cast(left(date_of_birth, 4) as int) between {minMax[0]} and {minMax[1]}"
        if seniority is not None:
            minMax = seniority.split(',')
            if filteringPhrase != "" :
                filteringPhrase += " and "
            filteringPhrase += f"seniority between {minMax[0]} and {minMax[1]}"
        if party is not None:
            if filteringPhrase != "" :
                filteringPhrase += " and "
            filteringPhrase += f"party like '%%{party}%%'"
        if state is not None:
            if filteringPhrase != "" :
                filteringPhrase += " and "
            filteringPhrase += f"state like '%%{state}%%'"
        if filteringPhrase != "":
            filteringPhrase = "WHERE " + filteringPhrase

        if page is None:
            page = 1
        if numLimit is None:
            numLimit = 8
        actualPage = (int(page) - 1) * int(numLimit)
        data = con.execute(f"SELECT * FROM application.members {filteringPhrase} ORDER BY application.members.full_name LIMIT {numLimit} OFFSET {actualPage}")
        pages = con.execute(f"SELECT COUNT(m.*) AS pages FROM (SELECT * FROM application.members {filteringPhrase} ORDER BY application.members.full_name) AS m")
        print("done here")
        for row in pages:
            pages = ceil(int(row["pages"]) / int(numLimit))
        resultData = [dict(r) for r in data]
        metaData = {"currentPage": page, "numPages": pages}
        return jsonify({"data": resultData, "metaData": metaData})
    except SQLAlchemyError as ex:
        raise BadRequest("Please make sure the query parameters are passed in with correct attribute name and value")


@app.route("/Legislations/filter")
def filteredLegislations():
    try:
        page = request.args.get("page")
        numLimit = request.args.get("limit")

        introduced_date = request.args.get("introduced_date")
        enacted = request.args.get("enacted")
        sponsor_party = request.args.get("sponsor_party")
        bill_type = request.args.get("bill_type")
        sponsor_name = request.args.get("sponsor_name")
        #sponsor_name = sponsor_name.lower()
        status = request.args.get("status")
        
        filteringPhrase = ""
        if introduced_date is not None:
            minMax = introduced_date.split(',')
            if filteringPhrase != "" :
                filteringPhrase += " and "
            filteringPhrase += f"cast(left(introduced_date, 4) as int) between {minMax[0]} and {minMax[1]}"
        if enacted is not None:
            minMax = enacted.split(',')
            if filteringPhrase != "" :
                filteringPhrase += " and "
            filteringPhrase += f"cast(left(enacted, 4) as int) between {minMax[0]} and {minMax[1]}"
        if sponsor_party is not None:
            if filteringPhrase != "" :
                filteringPhrase += " and "
            filteringPhrase += f"sponsor_party like '%%{sponsor_party}%%'"
        if status is not None:
            if filteringPhrase != "" :
                filteringPhrase += " and "
            if status == "Pending":
                filteringPhrase += f"enacted is null"
            else:
                filteringPhrase += f"enacted is not null"
        if bill_type is not None:
            if filteringPhrase != "" :
                filteringPhrase += " and "
            filteringPhrase += f"bill_type like '%%{bill_type}%%'"
        if sponsor_name is not None:
            if filteringPhrase != "" :
                filteringPhrase += " and "
            filteringPhrase += f"sponsor_name like '%%{sponsor_name}%%'"
        if filteringPhrase != "":
            filteringPhrase = "WHERE " + filteringPhrase

        if page is None:
            page = 1
        if numLimit is None:
            numLimit = 8
        actualPage = (int(page) - 1) * int(numLimit)
        query = f"SELECT * FROM application.legislations {filteringPhrase} order by application.legislations.short_title LIMIT {numLimit} OFFSET {str(actualPage)}"
        print(query)
        data = con.execute(query)
        pages = con.execute(f"SELECT COUNT(l.*) AS pages FROM (SELECT * FROM application.legislations  {filteringPhrase} order by application.legislations.short_title) AS l")
        for row in pages:
            pages = ceil(int(row["pages"]) / int(numLimit))
        resultData = [dict(r) for r in data]
        metaData = {"currentPage": page, "numPages": pages}
        return jsonify({"data": resultData, "metaData": metaData})
    except SQLAlchemyError as ex:
        raise BadRequest("Please make sure the query parameters are passed in with correct attribute name and value")

@app.route("/Districts/search")
def searchDistricts():
    try:
        attribute = request.args.get("attribute")
        if attribute is None:
            raise BadRequest("Please make sure the query parameters are passed in with search phrase")
        splittedAttributes = attribute.split(' ')
        attributes = []
        for i in range(len(splittedAttributes)):
            attributes.append(f"'%%{splittedAttributes[i]}%%'")

        searchPhrase = ""
        searchPhrase = generatePhrase(searchPhrase, "lower(d.state) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(d.congressional_district) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(population as VARCHAR(11))) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(mean_income as VARCHAR(11))) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(median_age as VARCHAR(11))) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(m.full_name) LIKE", attributes)

        page = request.args.get("page")
        numLimit = request.args.get("limit")
        if page is None:
            page = 1
        if numLimit is None:
            numLimit = 8
        actualPage = (int(page) - 1) * int(numLimit)
        query = f"SELECT d.*, m.full_name  FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND cast(d.congressional_district as INTEGER) = cast(m.district as INTEGER) WHERE {searchPhrase} ORDER BY d.state, d.congressional_district LIMIT {numLimit} OFFSET {str(actualPage)}"
        data = con.execute(query)
        pageQuery = f"SELECT COUNT(d.*) AS pages FROM (SELECT d.*, m.full_name  FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND cast(d.congressional_district as INTEGER) = cast(m.district as INTEGER) WHERE {searchPhrase}) AS d"
        pages = con.execute(pageQuery)
        for row in pages:
            pages = ceil(int(row["pages"]) / int(numLimit))
        resultData = [dict(r) for r in data]
        metaData = {"currentPage": page, "numPages": pages}
        return jsonify({"data": resultData, "metaData": metaData})
    except SQLAlchemyError as ex:
        raise BadRequest("Please make sure the query parameters are passed in with search phrase")

@app.route("/Representatives/search")
def searchRepresentatives():
    try:
        attribute = request.args.get("attribute")
        if attribute is None:
            raise BadRequest("Please make sure the query parameters are passed in with search phrase")
        splittedAttributes = attribute.split(' ')
        attributes = []
        for i in range(len(splittedAttributes)):
            attributes.append(f"'%%{splittedAttributes[i]}%%'")

        searchPhrase = ""
        searchPhrase = generatePhrase(searchPhrase, "lower(full_name) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(2019 - CAST(LEFT(date_of_birth,4) AS int) AS VARCHAR(3))) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(seniority as VARCHAR(4))) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(party) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(state) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(title) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(district as VARCHAR(4))) LIKE", attributes)

        page = request.args.get("page")
        numLimit = request.args.get("limit")
        if page is None:
            page = 1
        if numLimit is None:
            numLimit = 8
        actualPage = (int(page) - 1) * int(numLimit)
        query = f"SELECT * FROM application.members WHERE {searchPhrase} ORDER BY application.members.full_name LIMIT {numLimit} OFFSET {actualPage}"
        data = con.execute(query)
        pages = con.execute(f"SELECT COUNT(m.*) AS pages FROM (SELECT * FROM application.members WHERE {searchPhrase}) AS m")
        for row in pages:
            pages = ceil(int(row["pages"]) / int(numLimit))
        resultData = [dict(r) for r in data]
        metaData = {"currentPage": page, "numPages": pages}
        return jsonify({"data": resultData, "metaData": metaData})
    except SQLAlchemyError as ex:
        raise BadRequest("Please make sure the query parameters are passed in with search phrase")

@app.route("/Legislations/search")
def searchLegislations():
    try:
        attribute = request.args.get("attribute")
        if attribute is None:
            raise BadRequest("Please make sure the query parameters are passed in with search phrase")
        splittedAttributes = attribute.split(' ')
        attributes = []
        for i in range(len(splittedAttributes)):
            attributes.append(f"'%%{splittedAttributes[i]}%%'")

        searchPhrase = ""
        searchPhrase = generatePhrase(searchPhrase, "lower(short_title) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(enacted) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(sponsor_party) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(bill_type) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(sponsor_name) LIKE", attributes)

        page = request.args.get("page")
        numLimit = request.args.get("limit")
        if page is None:
            page = 1
        if numLimit is None:
            numLimit = 8
        actualPage = (int(page) - 1) * int(numLimit)
        query = f"SELECT * FROM application.legislations WHERE {searchPhrase} order by application.legislations.short_title LIMIT {numLimit} OFFSET {str(actualPage)}"
        data = con.execute(query)
        pages = con.execute(f"SELECT COUNT(l.*) AS pages FROM (SELECT * FROM application.legislations WHERE {searchPhrase} order by application.legislations.short_title) AS l")
        for row in pages:
            pages = ceil(int(row["pages"]) / int(numLimit))
        resultData = [dict(r) for r in data]
        metaData = {"currentPage": page, "numPages": pages}
        return jsonify({"data": resultData, "metaData": metaData})
    except SQLAlchemyError as ex:
        raise BadRequest("Please make sure the query parameters are passed in with search phrase")

def generatePhrase(searchPhrase, phrase, attributes):
    for i in range(len(attributes)):
        if searchPhrase != "":
            searchPhrase += " OR "
        searchPhrase += f"{phrase} {attributes[i]}"
    return searchPhrase

@app.route("/Search")
def searchEntire():
    try:
        attribute = request.args.get("attribute")
        if attribute is None:
            raise BadRequest("Please make sure the query parameters are passed in with search phrase")
        splittedAttributes = attribute.split(' ')
        attributes = []
        for i in range(len(splittedAttributes)):
            attributes.append(f"'%%{splittedAttributes[i]}%%'")

        page = request.args.get("page")
        numLimit = request.args.get("limit")
        if page is None:
            page = 1
        if numLimit is None:
            numLimit = 8
        actualPage = (int(page) - 1) * int(numLimit)
        numPages = 0

        searchPhrase = ""
        searchPhrase = generatePhrase(searchPhrase, "lower(d.state) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(d.congressional_district) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(population as VARCHAR(11))) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(mean_income as VARCHAR(11))) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(median_age as VARCHAR(11))) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(m.full_name) LIKE", attributes)
        
        query = f"SELECT d.*, m.full_name  FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND cast(d.congressional_district as INTEGER) = cast(m.district as INTEGER) WHERE {searchPhrase} ORDER BY d.state, d.congressional_district LIMIT {numLimit} OFFSET {str(actualPage)}"
        data = con.execute(query)
        pages = con.execute(f"SELECT COUNT(d.*) AS pages FROM (SELECT d.*, m.full_name  FROM application.districts AS d JOIN application.members AS m ON d.state = m.state AND cast(d.congressional_district as INTEGER) = cast(m.district as INTEGER) WHERE {searchPhrase}) AS d")
        for row in pages:
            numPages = max(numPages, ceil(int(row["pages"]) / int(numLimit)))
        districts = [dict(r) for r in data]

        searchPhrase = ""
        searchPhrase = generatePhrase(searchPhrase, "lower(full_name) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(2019 - CAST(LEFT(date_of_birth,4) AS int) AS VARCHAR(3))) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(seniority as VARCHAR(4))) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(party) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(state) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(title) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(CAST(district as VARCHAR(4))) LIKE", attributes)

        query = f"SELECT * FROM application.members WHERE {searchPhrase} ORDER BY application.members.full_name LIMIT {numLimit} OFFSET {actualPage}"
        data = con.execute(query)
        pages = con.execute(f"SELECT COUNT(m.*) AS pages FROM (SELECT * FROM application.members WHERE {searchPhrase}) AS m")
        for row in pages:
            numPages = max(numPages, ceil(int(row["pages"]) / int(numLimit)))
        representatives = [dict(r) for r in data]

        searchPhrase = ""
        searchPhrase = generatePhrase(searchPhrase, "lower(short_title) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(enacted) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(sponsor_party) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(bill_type) LIKE", attributes)
        searchPhrase = generatePhrase(searchPhrase, "lower(sponsor_name) LIKE", attributes)
        query = f"SELECT * FROM application.legislations WHERE {searchPhrase} order by application.legislations.short_title LIMIT {numLimit} OFFSET {str(actualPage)}"
        data = con.execute(query)
        pages = con.execute(f"SELECT COUNT(l.*) AS pages FROM (SELECT * FROM application.legislations WHERE {searchPhrase} order by application.legislations.short_title) AS l")
        for row in pages:
            numPages = max(numPages, ceil(int(row["pages"]) / int(numLimit)))
        legislations = [dict(r) for r in data]
        
        return jsonify({"districts": districts, "representatives": representatives, "legislations": legislations, "currentPage": page, "numPages": numPages})
    except SQLAlchemyError as ex:
        raise BadRequest("Please make sure the query parameters are passed in with search phrase")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=80)
