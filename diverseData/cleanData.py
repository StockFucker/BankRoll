# -*- coding: utf-8 -*-

import pandas as pd
import math

banks = ["600000","002142","600036","601998","601169","601166","601009","000001","601398","601988","601818","601328","601939","601288","600015","600016"]

def clean_diverse_data():
    for bank in banks:

        #计算分红(万)
        file_name = "originData2/" + bank + ".csv"
        df = pd.read_csv(file_name)
        to_drop = range(0,len(df.axes[1]))
        to_drop.remove(0)
        to_drop.remove(5)
        df = df.drop(df.columns[to_drop],1)

        names = list(df.columns.values)
        df = df.rename(columns = {names[0]:'date',names[1]:'diverse'})
        df = df.replace({',': ''}, regex=True)
        df = df[df['diverse'] != '0.00']
        df['diverse'] = df['diverse'].astype(float)
        df['diverse'] = -df['diverse']
        df['date'] = pd.to_datetime(df['date'])
        df = df.set_index('date')
        
        #计算配股(万)
        file_name = "originData/" + bank + "_1.csv"
        df2 = pd.read_csv(file_name)
        #drop
        to_drop = range(0,len(df2.axes[1]))
        to_drop.remove(7)
        to_drop.remove(2)
        to_drop.remove(4)
        df2 = df2.drop(df2.columns[to_drop],1)
        #rename
        names = list(df2.columns.values)
        df2 = df2.rename(columns = {names[2]:'date',names[0]:'price',names[1]:'number'})

        if not math.isnan(df2.iloc[0]['price']):
            df2 = df2.replace({',': ''}, regex=True)
            df2 = df2.replace({'万': ''}, regex=True)
            df2[['price','number']] = df2[['price','number']].astype(float)
            df2['diverse'] = df2['price'] * df2['number']
            df2 = df2.drop(df2.columns[[0,1]],1)
            df2['date'] = pd.to_datetime(df2['date'])
            df2 = df2.set_index(['date'])
            df2 = df2[df2['diverse'] > 0]
            df = pd.concat([df,df2], axis=0)

        #计算增发
        file_name = "originData/" + bank + "_2.csv"
        df3 = pd.read_csv(file_name)
        #drop
        to_drop = range(0,len(df3.axes[1]))
        to_drop.remove(3)
        to_drop.remove(6)
        df3 = df3.drop(df3.columns[to_drop],1)
        #rename
        names = list(df3.columns.values)
        df3 = df3.rename(columns = {names[0]:'diverse',names[1]:'date'})

        if not df3.isnull().values.any():
            df3 = df3.replace({',': ''}, regex=True)
            df['diverse'] = df['diverse'].astype(float)
            df3['date'] = pd.to_datetime(df3['date'])
            df3 = df3.set_index(['date'])
            df = pd.concat([df,df3], axis=0)

        df = df.sort()
        print df
        df.to_csv(bank + ".csv")


clean_diverse_data()