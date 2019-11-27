from unittest import main, TestCase
import sqlalchemy
import pandas
from timeit import timeit
from backend_Census_getCensusApiForDistrict import getStateNumbers
from backend_Census_getCensusApiForDistrict import getData
from backend_Scrapper import getJsonFromUrl
from driver import pgadminconnect, API_response
from api_uris import apis
from mapping import states_hash
from API_creds import propublica


class TestDBloader(TestCase):

    # test database connection and engine
    def test_pgadminconnect(self):
        db_objects = pgadminconnect()
        assert type(db_objects) is list
        assert type(db_objects[0]) is sqlalchemy.engine.base.Connection
        assert type(db_objects[1]) is sqlalchemy.engine.base.Engine

    # test api connections:
    def test_api_response(self):
        range_obj = range(0, len(apis))
        range_iterator = iter(range_obj)
        for api_uri in apis:
            assert type(API_response(api_uri, next(range_iterator)) is pandas.DataFrame)

    # test json from url is dictionary
    def test_json_from_url(self):
        url = (
            "https://api.census.gov/data/2018/acs/acs1?get=NAME,group(B01001)&for=us:1"
        )
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
        self.assertEquals(num_urls, 4)

    # test state abbreviation hashes
    def test_state_abbreviations(self):
        num_hashes = len(states_hash)
        assert num_hashes == 59

    # test api credentials
    def test_api_credentials(self):
        key = propublica()
        self.assertEquals(key, "eqgLGZRNuOktoYkIpRdonPmtq4zIKokpsvT0EpN6")

    # test api credentials type
    def test_api_credentials_type(self):
        key = propublica()
        assert type(key) is str

    # test state numbers
    def test_state_numbers(self):
        states_dict = getStateNumbers()
        assert type(states_dict) is dict

    # test get data
    def test_get_data(self):
        states = {}
        stateNumbers = getStateNumbers()
        getData(states, stateNumbers)
        assert type(states) is dict


if __name__ == "__main__":  # pragma: no cover
    main()
