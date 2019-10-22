from unittest import main,TestCase
import sqlalchemy
from timeit import timeit
from backend_Census_getCensusApiForDistrict import getStateNumbers, getData
from driver import pgadminconnect, API_response
from backend_Scrapper import getJsonFromUrl
import pandas
from api_uris import apis


class TestDBloader(TestCase):

    # test database connection and engine
    def test_pgadminconnect(self):
        db_objects = pgadminconnect()
        assert(type(db_objects) is list)
        assert(type(db_objects[0]) is sqlalchemy.engine.base.Connection)
        assert(type(db_objects[1]) is sqlalchemy.engine.base.Engine)

    # test api connections:
    def test_api_response(self):
        range_obj = range(0,len(apis))
        range_iterator = iter(range_obj)
        for api_uri in apis:
            assert type(API_response(api_uri, next(range_iterator)) is pandas.DataFrame)

    # test json from url is dictionary
    def test_json_from_url(self):
        url = "https://api.census.gov/data/2018/acs/acs1?get=NAME,group(B01001)&for=us:1"
        data = getJsonFromUrl(url)
        print(type(data) is list)

    # check if we are loading in data for 50 states
    def test_states(self):
        states_dict = getStateNumbers()
        num_states = len(states_dict)
        assert num_states == 52

    # check if we are loading in data for all districts
    def test_districts(self):
        states = {}
        stateNumbers = getStateNumbers()
        getData(states, stateNumbers)
        numDistricts = 0
        for key in states:
            state = states[key]
            numDistricts += len(state.districts)
        assert numDistricts == 437

    # test loading in data for all representatives
    def test_representatives(self):
        url = apis[0]
        db_objects = pgadminconnect()
        df = API_response(url, 0)
        numReps = len(df)
        assert numReps == 444

    # test loading in data for all senators
    def test_senators(self):
        url = apis[4]
        db_objects = pgadminconnect()
        df = API_response(url, 4)
        numSenators = len(df)
        assert numSenators == 100

    # test loading in food access legislation
    def test_legislation(self):
        db_objects = pgadminconnect()
        numLegislations = 0
        for api_counter in range(1, 4):
            df = API_response(apis[api_counter], api_counter)
            numLegislations += len(df)
        assert numLegislations == 0

if __name__ == "__main__":  # pragma: no cover
    main()
