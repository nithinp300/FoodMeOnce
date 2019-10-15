import requests, json
import db_creds as creds
import API_creds
import XML2DataFrame
from bs4 import BeautifulSoup
from pandas.io.json import json_normalize
import re
import sqlite3
import numpy as np
import pandas as pd
import sqlalchemy
import xml.etree.ElementTree as et
from sqlalchemy.orm import sessionmaker
import psycopg2
URLS = ['https://api.propublica.org/congress/v1/116/house/members', 'https://api.propublica.org/congress/v1/bills/search.json?query=%22food+access%22']
# URL = 'https://api.propublica.org/congress/v1/114/bills/hr4498'
PARAMS = {'X-API-KEY': 'eqgLGZRNuOktoYkIpRdonPmtq4zIKokpsvT0EpN6'}
PARAMS_TEST = {'X-API-KEY': 'eqgLGZRNuOktoYkIpRdonPmtq4zIKokpsvT0EpN6', 'User-Agent': 'Mozilla/5.0'}

def pgadminconnect():
    # conn = psycopg2.connect(host="foodmeonce.csja89mbwp6s.us-west-1.rds.amazonaws.com", user="postgres", password="ShameOnYou!")
    # print(conn)
    db_uri = "postgres+psycopg2://postgres:ShameOnYou!@foodmeonce.csja89mbwp6s.us-west-1.rds.amazonaws.com:5432/foodmeonce"
    engine = sqlalchemy.create_engine(db_uri)
    con = engine.connect()
    return [con,engine]
    # return con

def db_session(engine):
    session = sessionmaker(bind=engine)
    s = session()
    return s


def extract_json(data_json, api_number):
    print('extract_json\n')
    if api_number==0:
        return json_normalize(data_json, 'members')
    else:
        df = json_normalize(data_json, 'bills')
        df_2 = df["cosponsors_by_party"].apply(pd.Series)
        df["cosponsors_by_party_R"] = df_2["R"]
        df["cosponsors_by_party_D"] = df_2["D"]
        print(df[["cosponsors_by_party_D", "cosponsors_by_party_R"]])
        df = df.drop("cosponsors_by_party", axis=1)
        # if df["cosponsors_by_party"].empty():
        #     print(df["cosponsors_by_party"])
        # df["cosponsors_by_party_R"] = df["cosponsors_by_party"]
        # print(df['cosponsors_by_party'])
        return df
    # return data_df


def API_one_response(api_uri, api_number):
    # url = 'https://api.propublica.org/congress/v1/116/house/members'
    param = {'X-API-KEY': API_creds.propublica()}
    res = requests.get(url = api_uri, headers = param)
    if res:
        try:
            res.json()
            print('\nSuccessful Connection . . . ')
            print('\nContent in JSON format.')
            # print(res.status_code)
            # print(res.headers)
            js = res.json()
            print("\nStatus: " + js['status'] + '\n')
            # print(js['results'])

            data_json = js['results']
            data_df = extract_json(data_json, api_number)
            # data_df = json_normalize(members_json, 'members')
            # max_lengths = max_column_lengths(data_df)
            return data_df

        except Exception as e:
            print('\nCritical failure!')
            print(e)
            print('\nRe-establishing connection . . . ')
            # js = 'spam'
            # print('Successful Connection . . . ')
            print(res.status_code)
            print(res.headers)
            # print(res.text)
            root = et.fromstring(res.text)
            data = []
            rows = root.findall('.//members')
            for row in rows:
                data.append({c.tag:c.text for c in list(row)})
            data_df = pd.DataFrame(data)
            return data_df

            # xmlData = XML2DataFrame.XML2DataFrame(res.text)
            # xml_df = xmlData.process_data()
            # return xml_df
    else:
        print('Connection Failed')
        print(res.status_code)

def parse_element(element, parsed=None):
    if parsed is None:
        parsed = dict()
    for key in element.keys():
        if key not in parsed:
            parsed[key] = element.attrib.get(key)
        if element.text:
            parsed[element.tag] = element.text
        else:
            raise ValueError("duplicate attribute {0} at element {1}".format(key, element.getroottree().getpath(element)))
    for child in list(element):
        parse_element(child, parsed)
    return parsed


def API_two_response():
    url = 'https://api.propublica.org/congress/v1/bills/search.json?query=%22food+access%22'
    param = {'X-API-KEY': 'eqgLGZRNuOktoYkIpRdonPmtq4zIKokpsvT0EpN6'}
    res = requests.get(url = url, headers = param)
    res = requests.get(url=url, headers=param)
    if res:
        try:
            res.json()
            print('\nSuccessful Connection . . . ')
            print('\nContent in JSON format.')
            # print(res.status_code)
            # print(res.headers)
            js = res.json()
            print("\nStatus: " + js['status'] + '\n')
            print(js['results'])
            legislation_json = js['results']
            members_df = json_normalize(legislation_json, 'bills')
            # max_lengths = max_column_lengths(members_df)
            return members_df

        except Exception as e:
            print('\nCritical failure!')
            print(e)
            print('\nRe-establishing connection . . . ')
            # js = 'spam'
            # print('Successful Connection . . . ')
            print(res.status_code)
            print(res.headers)
            XMLdata = res['status']
            root = et.XML(XMLdata)
            print(root.getchildren())
            structure_data = [parse_element(child) for child in root.getchildren()]
            return pd.DataFrame(structure_data)
    else:
        print('Connection Failed')
        print(res.status_code)

def create_base_tables():
    c.execute('CREATE TABLE IF NOT EXISTS )')

def max_column_lengths(df):
    measurer = np.vectorize(len)
    result = measurer(df.values.astype(str)).max(axis=0)
    # print(result)
    return result

def connect_test():
    conn_string = "host="+ creds.PGHOST +" port="+ "5432" +" dbname="+ creds.PGDATABASE +" user=" + creds.PGUSER \
+" password="+ creds.PGPASSWORD
    conn = psycopg2.connect(conn_string)
    print(conn)
    cursor = conn.cursor()
    return conn

def load_data(schema, table, conn, data, engine):
    print("Loading data into " + str(schema) + '.' + str(table))
    try:
        sql_command = "select * from  {}.{};".format(str(schema), str(table))
        table_name = schema + '.' + table
        data.to_sql(table, engine, if_exists='append', schema=schema)
    except Exception as e:
        print(e)
    conn.close()
    # loaded_data = pd.read_sql(sql_command, conn)
    # print(engine.table_names())

def main():
    apis = ['https://api.propublica.org/congress/v1/116/house/members', 'https://api.propublica.org/congress/v1/bills/search.json?query=%22food+access%22','https://api.propublica.org/congress/v1/bills/search.json?query=%22food+security%22','https://api.propublica.org/congress/v1/bills/search.json?query=%22food+desert%22']
    table_names = ['congress_members', 'legislations']
    # api_counter = 0
    db_objects = pgadminconnect()
    for api_counter in range(0,len(apis)):
        df = API_one_response(apis[api_counter], api_counter)
        print(df.head(3))
        if api_counter == 0:
            load_data('staging', table_names[0], db_objects[0], df, db_objects[1])
        else:
            load_data('staging', table_names[1], db_objects[0], df, db_objects[1])
    # legislation_df = API_two_response()
    # print(members_df)
    # df = API_two_response()
    # print(df)
    # create_base_tables()
    # db_objects = pgadminconnect()
    # new_session = db_session(db_objects[1])
    # members_df = API_one_response()
    # members_df.to_sql('staging.congress_members', db_objects[0])
    # print(db_objects[1].table_names())
    # print(db_objects)
    # conn = connect_test()
    # members_df = members_df.drop(['index'], axis=1)
    # load_data('staging', 'congress_members', db_objects[0], members_df, db_objects[1])
    # print(new_session)
main()
