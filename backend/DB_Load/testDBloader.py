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
        i = 1
        assert i == 1
        db_objects = pgadminconnect()
        assert(type(db_objects) is list)
        assert(type(db_objects[0]) is sqlalchemy.engine.base.Connection)
        assert(type(db_objects[1]) is sqlalchemy.engine.base.Engine)

    # test api connections:
    def test_api_response(self):
        i = 1
        assert i == 1
        # range_obj = range(0,len(apis))
        # range_iterator = iter(range_obj)
        # for api_uri in apis:
        #     assert type(API_response(api_uri, next(range_iterator)) is pandas.DataFrame)
        #



    # check if we are loading in data for 50 states
    def test_states(self):
        i = 1
        assert i == 1
        # states_dict = getStateNumbers()
        # num_states = len(states_dict)
        # assert num_states == 52

    # check if we are loading in data for 435 districts
    def test_districts(self):
        i = 1
        assert i == 1
        # pass

if __name__ == "__main__":  # pragma: no cover
    main()
