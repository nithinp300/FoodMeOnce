from json import JSONDecodeError
from backend_Scrapper import getJsonFromUrl


class District:
    def __init__(self, state, district):
        self.state = state
        self.district = district

    def __str__(self):
        result = "congressional district = " + self.district
        result += "\n    " + "population : " + self.population
        result += "\n    " + "median age : " + self.medianAge
        result += "\n    " + "gender ratio : " + self.genderRatio
        result += "\n    " + "mean income : " + self.meanIncome
        result += "\n    " + "poverty rate : " + self.povertyRate
        result += "\n    " + "number of households : " + self.numHouseholds
        result += "\n    " + "wiki page : " + self.wikiPage
        return result

    def generateDBInsert(self):
        print("('", end="")
        print(self.state, end="', '")
        print(self.district, end="', '")
        print(self.population, end="', '")
        print(self.medianAge, end="', '")
        print("%.2f" % float(self.genderRatio), end="', '")
        print(self.meanIncome, end="', '")
        print("%.2f" % float(self.povertyRate), end="', '")
        print(self.numHouseholds, end="', '")
        print(self.wikiPage, end="'),\n")

    def __lt__(self, rhs):
        return int(self.district) < int(rhs.district)

    def setPopulation(self, population):
        self.population = population

    def setGenderRatio(self, malePopulation):
        self.genderRatio = str(
            (int(self.population) - int(malePopulation)) / int(malePopulation)
        )

    def setMedianAge(self, medianAge):
        self.medianAge = medianAge

    def setMeanIncome(self, meanIncome):
        total = 0
        for index in range(len(meanIncome)):
            total += int(meanIncome[index])
        avg = total // len(meanIncome)
        self.meanIncome = str(avg)

    def setPovertyRate(self, povertyPopulation):
        self.povertyRate = str(int(povertyPopulation) / int(self.population) * 100)

    def setNumHouseholds(self, numHouseholds):
        self.numHouseholds = numHouseholds

    def generateNumHouseholdsColumn(self, num):
        return (
            "UPDATE staging.district SET num_households = "
            + self.numHouseholds
            + " WHERE id = "
            + str(num)
            + ";"
        )

    def setWikiPage(self, state, district):
        if district == "01":
            district = "1st"
        elif district == "02":
            district = "2nd"
        elif district == "03":
            district = "3rd"
        elif district == "21":
            district = "21st"
        elif district == "22":
            district = "22nd"
        elif district == "23":
            district = "23rd"
        elif district == "31":
            district = "31st"
        elif district == "32":
            district = "32nd"
        elif district == "33":
            district = "33rd"
        elif district == "41":
            district = "41st"
        elif district == "42":
            district = "42nd"
        elif district == "43":
            district = "43rd"
        elif district == "51":
            district = "51st"
        elif district == "52":
            district = "52nd"
        elif district == "53":
            district = "53rd"
        elif district[0] == "0":
            district = district[1]
        if len(district) <= 2:
            district += "th"
        self.wikiPage = (
            "https://en.wikipedia.org/wiki/"
            + state
            + "%27s_"
            + district
            + "_congressional_district"
        )


class State:
    def __init__(self, state, name):
        self.state = state
        self.name = name
        self.districts = []

    def getDistricts(self):
        return self.districts

    def __str__(self):
        result = "state of " + self.name + "(" + self.state + "):\n"
        for index in range(len(self.districts)):
            result += "  " + str(self.districts[index]) + "\n"
        return result

    def __lt__(self, rhs):
        return int(self.state) < int(rhs.state)


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
        url = (
            "https://api.census.gov/data/2018/acs/acs1?get=NAME,B01001_001E,B01001_002E,B01002_001E,B19081_001E,B19081_002E,B19081_003E,B19081_004E,B19081_005E,B17001_002E,B25002_002E&for=congressional+district:*&in=state:"
            + stateNumbers[key]
        )
        resp = getJsonFromUrl(url)
        state = State(resp[1][len(resp[1]) - 2], key)
        districts = state.getDistricts()
        for cd in range(1, len(resp)):
            population = resp[cd][1]
            malePopulation = resp[cd][2]
            medianAge = resp[cd][3]
            meanIncome = [
                resp[cd][4],
                resp[cd][5],
                resp[cd][6],
                resp[cd][7],
                resp[cd][8],
            ]
            povertyPopulation = resp[cd][9]
            numHouseholds = resp[cd][10]
            congressionalDistrict = resp[cd][len(resp[cd]) - 1]
            district = District(key, congressionalDistrict)
            district.setPopulation(population)
            district.setGenderRatio(malePopulation)
            district.setMedianAge(medianAge)
            district.setMeanIncome(meanIncome)
            district.setPovertyRate(povertyPopulation)
            district.setNumHouseholds(numHouseholds)
            district.setWikiPage(key, congressionalDistrict)
            districts.append(district)
        states[key] = state


if __name__ == "__main__":
    states = {}
    stateNumbers = getStateNumbers()
    getData(states, stateNumbers)
    stateList = []
    for key in states:
        state = states[key]
        state.districts.sort()
        stateList.append(state)
    stateList.sort()
    # for index in range(len(stateList)):
    #     print(stateList[index])
    num = 1
    for state in range(len(stateList)):
        districts = stateList[state].getDistricts()
        for i in range(len(districts)):
            # districts[i].generateDBInsert()
            print(districts[i].generateNumHouseholdsColumn(num))
            num += 1
