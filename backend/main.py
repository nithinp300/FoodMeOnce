from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "<h1>hello world!</h1>"

# model page apis
@app.route("/Districts")
def districts():
    return "districts"

@app.route("/Representatives")
def representatives():
    return "representatives"

@app.route("/Legislations")
def legislations():
    return "legislations"

# instance page apis
@app.route("/Districts/instance/<name>")
def district(name = ""):
    return "districts for " + name

@app.route("/Representatives/instance/<name>")
def representative(name = ""):
    return "representatives for " + name

@app.route("/Legislations/instance/<name>")
def legislation(name = ""):
    return "legislations for " + name

# for later use
@app.route("/Districts/sort")
def sortedDistricts():
    return "sorted Districts"

@app.route("/Representatives/sort")
def sortedRepresentatives():
    return "sorted Representatives"

@app.route("/Legislations/sort")
def sortedLegislations():
    return "sorted Legislations"

@app.route("/Districts/filter")
def filteredDistricts():
    return "filtered Districts"

@app.route("/Representatives/filter")
def filteredRepresentatives():
    return "filtered Representatives"

@app.route("/Legislations/filter")
def filteredLegislations():
    return "filtered Legislations"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
