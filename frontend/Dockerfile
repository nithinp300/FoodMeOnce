# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /frontend

ADD . /frontend
RUN apk add --no-cache bash
RUN npm install
# Install Chrome for Selenium
# RUN curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o /chrome.deb
# RUN dpkg -i /chrome.deb || apt-get install -yf
# RUN rm /chrome.deb

# Install chromedriver for Selenium
# RUN curl https://chromedriver.storage.googleapis.com/2.31/chromedriver_linux64.zip -o /usr/local/bin/chromedriver
# RUN chmod +x /usr/local/bin/chromedriver

RUN npm test

# start app
EXPOSE 3000

CMD bash
