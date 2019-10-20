import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class GUI_tests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome('./chromedriver')

    def test_web_name(self):
        home_page_name = "Food Me Once"
        
        driver = self.driver
        driver.get("https://foodmeonce.me/")
        self.assertIn(home_page_name, driver.title)

    def test_navbar(self):
        page_name = "Representatives"
        driver = self.driver
        driver.get("https://foodmeonce.me/")
        driver.find_element_by_link_text('Districts').click()
        title = driver.find_element_by_class_name('ml-1')
        assert title.text == "Districts"
        driver.find_element_by_link_text('Representatives').click()
        title = driver.find_element_by_class_name('ml-1')
        assert title.text == "Representatives"
        driver.find_element_by_link_text('Legislation').click()
        title = driver.find_element_by_class_name('ml-1')
        assert title.text == "Legislations"


if __name__ == "__main__":
    unittest.main()
