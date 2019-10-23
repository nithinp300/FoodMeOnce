from json import JSONDecodeError
from backend_Scrapper import getJsonFromUrl

def getStateNumbers():
    states = {}
    url = "https://api.census.gov/data/2018/acs/acs1?get=NAME,group(B01001)&for=state"
    data = getJsonFromUrl(url)
    for index in range(1, len(data)):
        states[data[index][0]] = data[index][len(data[index]) - 1]
    # states["arkansus"] = "01"
    return states

def getData(states, stateNumbers):
    for key in stateNumbers:
        url = "https://api.census.gov/data/2018/acs/acs1?get=NAME,B02001_001E,B02001_002E,B02001_003E,B02001_004E,B02001_005E,B02001_006E,B02001_007E&for=congressional+district:*&in=state:"+stateNumbers[key]
        resp = getJsonFromUrl(url)
        state = resp[1][len(resp[1]) - 2]
        congressional_district = resp[1][len(resp[1]) - 1]
        data = []
        for i in range(1, len(resp)):
            data.append(resp[i])
        states[state] = data
    
def generateSQL(states):
    print("INSERT INTO staging.race_per_district(state, congressional_district, race, percentage) VALUES")
    for stateKey in states:
        state = states[stateKey]
        for district in state:
            generateSQLInsert(district)

def generateUpdateSQL(states):
    for stateKey in states:
        state = states[stateKey]
        for district in state:
            generateSQLUpdate(district)
        
race_mappings = [
    "White", "African American", "American Indian", "Asian", "Native Hawaiian", "Others"
]
def generateSQLInsert(district):
    stateNum = district[len(district) - 2]
    districtNum = district[len(district) - 1]
    population = int(district[1])
    white = int(district[2]) / population * 100
    african = int(district[3]) / population * 100
    indian = int(district[4]) / population * 100
    asian = int(district[5]) / population * 100
    hawaiian = int(district[6]) / population * 100
    others = int(district[7]) / population * 100
    print(f"('{stateNum}', '{districtNum}', '{race_mappings[0]}', {white:.2f}),")
    print(f"('{stateNum}', '{districtNum}', '{race_mappings[1]}', {african:.2f}),")
    print(f"('{stateNum}', '{districtNum}', '{race_mappings[2]}', {indian:.2f}),")
    print(f"('{stateNum}', '{districtNum}', '{race_mappings[3]}', {asian:.2f}),")
    print(f"('{stateNum}', '{districtNum}', '{race_mappings[4]}', {hawaiian:.2f}),")
    print(f"('{stateNum}', '{districtNum}', '{race_mappings[5]}', {others:.2f}),")

def generateSQLUpdate(district):
    stateNum = district[len(district) - 2]
    districtNum = district[len(district) - 1]
    population = int(district[1])
    white = int(district[2]) / population * 100
    african = int(district[3]) / population * 100
    indian = int(district[4]) / population * 100
    asian = int(district[5]) / population * 100
    hawaiian = int(district[6]) / population * 100
    others = int(district[7]) / population * 100
    print(f"UPDATE application.districts SET white = {white:.2f} WHERE state_num='{stateNum}' and congressional_district='{districtNum}';")
    print(f"UPDATE application.districts SET aa = {african:.2f} WHERE state_num='{stateNum}' and congressional_district='{districtNum}';")
    print(f"UPDATE application.districts SET a_indian = {indian:.2f} WHERE state_num='{stateNum}' and congressional_district='{districtNum}';")
    print(f"UPDATE application.districts SET asian = {asian:.2f} WHERE state_num='{stateNum}' and congressional_district='{districtNum}';")
    print(f"UPDATE application.districts SET others = {others:.2f} WHERE state_num='{stateNum}' and congressional_district='{districtNum}';")
    print(f"UPDATE application.districts SET hawaiian = {hawaiian:.2f} WHERE state_num='{stateNum}' and congressional_district='{districtNum}';")    
    
if __name__ == "__main__":
    states = {}
    stateNumbers = getStateNumbers()
    getData(states, stateNumbers)
    generateUpdateSQL(states)
    
