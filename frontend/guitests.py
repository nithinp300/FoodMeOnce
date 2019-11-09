import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options



#These require chromedriver to be installed
class GUI_tests(unittest.TestCase):

    def setUp(self):
        #Works for windows
        self.driver = webdriver.Chrome('./chromedriver')
        self.url = "http://localhost:3000"
        #Not Windows
        #self.driver = webdriver.Chrome('../node_modules/chromedriver/bin/chromedriver')

    def test_web_name(self):
        home_page_name = "Food Me Once"
        driver = self.driver
        driver.implicitly_wait(10)
        driver.get(self.url)
        self.assertIn(home_page_name, driver.title)

    def test_navbar(self):
        page_name = "Representatives"
        driver = self.driver
        driver.get(self.url)
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
        driver = self.driver
        driver.implicitly_wait(10)
        driver.get(self.url)
        driver.find_element_by_link_text('About Us').click()
        tempUrl = driver.current_url
        driver.find_element_by_link_text('FoodMeOnce GitLab Repository').click()
        assert driver.current_url == 'https://gitlab.com/shub95/foodmeonce/'
        while driver.current_url != tempUrl:
            driver.back()
        driver.find_element_by_link_text('FoodMeOnce API Documentation').click()
        assert driver.current_url == 'https://documenter.getpostman.com/view/7777503/SVtPXWHE?version=latest'
        driver.back()

    def test_rep_instances(self):
        driver = self.driver
        driver.get(self.url)
        driver.implicitly_wait(10)
        driver.find_element_by_link_text('Representatives').click()
        for page in range(0,5):
            url = driver.current_url
            for x in range(0,len(driver.find_elements_by_id('rep_inst'))):
                val = driver.find_elements_by_id('rep_inst')
                val[x].click()
                while driver.current_url != url:
                    driver.back()
            driver.find_element_by_link_text('Next').click()

    def test_leg_instances(self):
        driver = self.driver
        driver.get(self.url)
        driver.implicitly_wait(10)
        driver.find_element_by_link_text('Legislation').click()
        for page in range(0,3):
            for x in range(0,7):
                val = driver.find_elements_by_id('leg_inst')
                val[x].click()
                driver.back()
            driver.find_element_by_link_text('Next').click()

    def test_dist_instances(self):
        driver = self.driver
        driver.get(self.url)
        driver.implicitly_wait(10)
        driver.find_element_by_link_text('Districts').click()
        for page in range(0,2):
            url = driver.current_url
            for x in range(0,7):
                val = driver.find_elements_by_id('dist_inst')
                val[x].click()
                while url != driver.current_url:
                    driver.back()
            driver.find_element_by_link_text('Next').click()

    def test_back_rep_instances(self):
        driver = self.driver
        driver.get(self.url)
        driver.implicitly_wait(10)
        driver.find_element_by_link_text('Representatives').click()
        driver.find_element_by_id('rep_inst')
        driver.find_element_by_link_text('Last').click()
        for page in range(0,5):
            url = driver.current_url
            for x in range(0,len(driver.find_elements_by_id('rep_inst'))):
                val = driver.find_elements_by_id('rep_inst')
                val[x].click()
                while driver.current_url != url:
                    driver.back()
            driver.find_element_by_link_text('Prev').click()

    def test_back_leg_instances(self):
        driver = self.driver
        driver.get(self.url)
        driver.implicitly_wait(10)
        driver.find_element_by_link_text('Legislation').click()
        driver.find_element_by_id('leg_inst')
        driver.find_element_by_link_text('Last').click()
        for page in range(0,3):
            for x in range(0,len(driver.find_elements_by_id('leg_inst'))):
                val = driver.find_elements_by_id('leg_inst')
                val[x].click()
                driver.back()
            driver.find_element_by_link_text('Prev').click()

    def test_back_dist_instances(self):
        driver = self.driver
        driver.get(self.url)
        driver.implicitly_wait(10)
        driver.find_element_by_link_text('Districts').click()
        driver.find_element_by_id('dist_inst')
        driver.find_element_by_link_text('Last').click()
        for page in range(0,1):
            url = driver.current_url
            for x in range(0,len(driver.find_elements_by_id('dist_inst'))):
                val = driver.find_elements_by_id('dist_inst')
                val[x].click()
                while url != driver.current_url:
                    driver.back()
            driver.find_element_by_link_text('Prev').click()

    def test_connections(self):
        driver = self.driver
        driver.get(self.url)
        driver.implicitly_wait(10)
        driver.find_element_by_link_text('Legislation').click()
        driver.find_element_by_id('leg_inst').click()
        driver.find_element_by_link_text('Pat Roberts').click()
        print(driver.current_url)
        driver.find_element_by_link_text('Kansas')
        print(driver.current_url)

   



if __name__ == "__main__":
    unittest.main()
