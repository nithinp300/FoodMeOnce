from unittest import main,TestCase
from timeit import timeit
from driver import pgadminconnect


class TestDBloader(TestCase):

    def test_connect(self):
        db_obj = pgadminconnect()
        assert db_obj[0]
        assert db_obj[1]

if __name__ == "__main__":  # pragma: no cover
    main()