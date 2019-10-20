from unittest import main, TestCase
from main import district, representative, legislation

class TestMain(TestCase):
    # test district instance data
    def test_district(self):
        district_data = district(1)
        district_id = "01"
        assert(district_data.district, district_id)

    # test representative instance data
    def test_representative(self):
        rep_data = representative(0)
        rep_first_name = "Ralph"
        rep_last_name = "Abraham"
        assert(rep_data.first_name, rep_first_name)
        assert(rep_data.last_name, rep_last_name)

    # test legislation instance data
    def test_legislation(self):
        legislation_data = legislation(0)
        legislation_title = "Healthy Food Access for All Americans Act"
        assert(legislation_data.title, legislation_title)

if __name__ == "__main__":
    main()
