from unittest import main, TestCase
from main import district, representative, legislation

class TestMain(TestCase):
    # test district instance data
    def test_district(self):
        district_data = district("0")
        district_id = "35"
        assertEquals(district_data.congressional_district, district_id)

    # test representative instance data
    def test_representative(self):
        rep_data = representative("0")
        rep_first_name = "Dan"
        rep_last_name = "Crenshaw"
        assertEquals(rep_data.first_name, rep_first_name)
        assertEquals(rep_data.last_name, rep_last_name)

    # test legislation instance data
    def test_legislation(self):
        legislation_data = legislation("0")
        legislation_title = "Agriculture Improvement Act of 2018"
        assertEquals(legislation_data.short_title, legislation_title)

if __name__ == "__main__":
    main()
