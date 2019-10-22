from unittest import main,TestCase
import sqlalchemy
from timeit import timeit
from backend_Census_getCensusApiForDistrict import getStateNumbers, getData
from driver import pgadminconnect, API_response
from backend_Scrapper import getJsonFromUrl
import pandas
from api_uris import apis
from mapping import states_hash

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

    # test json from url is list
    def test_json_from_url(self):
        url = "https://api.census.gov/data/2018/acs/acs1?get=NAME,group(B01001)&for=us:1"
        data = getJsonFromUrl(url)
        assert type(data) is list

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

    # test api urls
    def test_api_urls(self):
        num_urls = len(apis)
        assert num_urls == 5

    # test state abbreviation hashes
    def test(self):
        num_hashes = len(states_hash)
        print("hhh",num_hashes)
        assert num_hashes == 59

if __name__ == "__main__":  # pragma: no cover
    main()
