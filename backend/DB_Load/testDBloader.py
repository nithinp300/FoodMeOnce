from unittest import main,TestCase
from timeit import timeit
# from driver import pgadminconnect


class TestDBloader(TestCase):

    def test_connect(self):
        i = 1
        assert i == 1

if __name__ == "__main__":  # pragma: no cover
    main()