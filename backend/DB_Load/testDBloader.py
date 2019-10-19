from unittest import main,TestCase
import sqlalchemy
from timeit import timeit
# from backend_Census_getCensusApiForDistrict import getStateNumbers
from driver import pgadminconnect


class TestDBloader(TestCase):

    # test database connection and engine
    def test_connect(self):
        db_objects = pgadminconnect()
        assert(type(db_objects) is list)
        assert(type(db_objects[0]) is sqlalchemy.engine.base.Connection)
        assert(type(db_objects[1]) is sqlalchemy.engine.base.Engine)

    # check if we are loading in data for 50 states
    # def test_states(self):
    #     states_dict = getStateNumbers()
    #     num_states = len(states_dict)
    #     assert num_states == 50
    #
    # # check if we are loading in data for 435 districts
    # def test_districts(self):
    #     pass

if __name__ == "__main__":  # pragma: no cover
    main()
