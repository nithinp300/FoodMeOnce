#!/usr/bin/env python3
"""FoodMeOnce
Name: Shubhendra Trivedi
UTEID: sst565"""
# -------------
# driver.py
# -------------

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring
# pylint: disable = too-many-lines


import requests, json
import db_creds as creds
import API_creds
from pandas.io.json import json_normalize
import numpy as np
import pandas as pd
import sqlalchemy
import xml.etree.ElementTree as et
from sqlalchemy.orm import sessionmaker
import psycopg2

def pgadminconnect():
    # conn = psycopg2.connect(host="foodmeonce.csja89mbwp6s.us-west-1.rds.amazonaws.com", user="postgres", password="ShameOnYou!")
    # print(conn)
    db_name = creds.PGDATABASE
    db_pwd = creds.PGPASSWORD
    db_user = creds.PGUSER
    db_host = creds.PGHOST
    db_port = creds.PGPORT
    db_uri = "postgres+psycopg2://"+ str(db_user) + ":" + str(db_pwd) + '@' + str(db_host) + ':' + str(db_port) + '/' + str(db_name)
    engine = sqlalchemy.create_engine(db_uri)
    con = engine.connect()
    print(con)
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
        return df


def API_one_response(api_uri, api_number):
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

def max_column_lengths(df):
    measurer = np.vectorize(len)
    result = measurer(df.values.astype(str)).max(axis=0)
    return result

def load_data(schema, table, conn, data, engine):
    print("Loading data into " + str(schema) + '.' + str(table))
    try:
        sql_command = "select * from  {}.{};".format(str(schema), str(table))
        table_name = schema + '.' + table
        data.to_sql(table, engine, if_exists='append', schema=schema)
    except Exception as e:
        print(e)
    conn.close()


if __name__ == "__main__":
    apis = ['https://api.propublica.org/congress/v1/116/house/members', 'https://api.propublica.org/congress/v1/bills/search.json?query=%22food+access%22','https://api.propublica.org/congress/v1/bills/search.json?query=%22food+security%22','https://api.propublica.org/congress/v1/bills/search.json?query=%22food+desert%22']
    table_names = ['congress_members', 'legislations']
    # api_counter = 0
    db_objects = pgadminconnect()
    for api_counter in range(0,len(apis)):
        df = API_one_response(apis[api_counter], api_counter)
        print(df.head(3))
        # if api_counter == 0:
        #     load_data('staging', table_names[0], db_objects[0], df, db_objects[1])
        # else:
        #     load_data('staging', table_names[1], db_objects[0], df, db_objects[1])
