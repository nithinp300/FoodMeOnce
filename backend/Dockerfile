FROM python:3

RUN apt-get update

RUN apt-get -y install libboost-all-dev
RUN apt-get -y install libgmp-dev
RUN apt-get -y install vim

RUN pip install --upgrade pip
RUN pip --version

RUN pip install flask
RUN pip install sqlalchemy
RUN pip install psycopg2
RUN pip install flask_cors
RUN pip install flask_api
RUN pip install werkzeug
RUN pip install freeze

CMD bash
