from unittest import main,TestCase
import sqlalchemy
from timeit import timeit
from backend_Census_getCensusApiForDistrict import getStateNumbers
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
    # def test_api_response(self):
    #     range_obj = range(0,len(apis))
    #     range_iterator = iter(range_obj)
    #     for api_uri in apis:
    #         assert type(API_response(api_uri, next(range_iterator)) is pandas.DataFrame)

    # test json from url is dictionary
    def test_json_from_url(self):
        url = "https://api.census.gov/data/2018/acs/acs1?get=NAME,group(B01001)&for=us:1"
        data = getJsonFromUrl(url)
        assert data is __dict__

    # check if we are loading in data for 50 states
    def test_states(self):
        states_dict = getStateNumbers()
        num_states = len(states_dict)
        assert num_states == 52

    # check if we are loading in data for 435 districts
    def test_districts(self):
        pass

    # test loading in data for 535 representatives
    def test_representatives(self):
        pass

    # test loading in data for 14 legislations
    def test_legislations(self):
        pass


if __name__ == "__main__":  # pragma: no cover
    main()
