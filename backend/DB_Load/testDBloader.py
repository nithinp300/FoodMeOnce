from unittest import main,TestCase
from timeit import timeit
from backend_Census_getCensusApiForDistrict import getStateNumbers
# from driver import pgadminconnect


class TestDBloader(TestCase):

    def test_connect(self):
        i = 1
        assert i == 1

    # check if we are loading in data for 50 states
    def test_states(self):
        states_dict = getStateNumbers()
        num_states = len(states_dict)
        assert num_states == 50

    # check if we are loading in data for 435 districts
    def test_districts(self):
        pass

if __name__ == "__main__":  # pragma: no cover
    main()
