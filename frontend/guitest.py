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

    def test_about(self):
        page_name = "Representatives"
        driver = self.driver
        driver.get("https://foodmeonce.me/")
        driver.find_element_by_link_text('About Us').click()
        driver.find_element_by_link_text('FoodMeOnce GitLab Repository').click()
        assert driver.current_url == 'https://gitlab.com/shub95/foodmeonce/'
        driver.back()
        driver.find_element_by_link_text('FoodMeOnce API Documentation').click()
        assert driver.current_url == 'https://documenter.getpostman.com/view/7777503/SVtPXWHE?version=latest'
        driver.back()


if __name__ == "__main__":
    unittest.main()
