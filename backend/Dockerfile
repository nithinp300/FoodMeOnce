FROM python:3

RUN apt-get update

RUN apt-get -y install libboost-all-dev
RUN apt-get -y install libgmp-dev
RUN apt-get -y install vim
RUN apt-get -y install nginx
RUN apt-get -y install software-properties-common
RUN add-apt-repository ppa:certbot/certbot

RUN apt-get update
RUN apt-get install python-certbot-nginx

RUN pip install --upgrade pip
RUN pip --version

RUN pip install flask
RUN pip install Flask-Restless
RUN pip install SQLAlchemy
RUN pip install gunicorn

RUN certbot --nginx 

CMD bash
