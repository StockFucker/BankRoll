# -*- coding: utf-8 -*-
import pandas as pd

banks = ["600000","002142","600036","601998","601169","601166","601009","000001","601398","601988","601818","601328","601939","601288","600015","600016"]

def clean_report_data():
    for bank in banks:
        file_name = "originData/" + bank + ".csv"
        df = pd.read_csv(file_name)
        df = df.T
        to_drop = range(0,len(df.axes[1]))
        to_drop.remove(1)
        to_drop.remove(9)
        to_drop.remove(17)
        df = df.drop(df.columns[to_drop],1)
        df = df.drop(df.index[[0,len(df.axes[0])-1]],0)
        df = df[df.index > "2009-01-01"]
        names = list(df.columns.values)
        df = df.rename(columns = {names[0]:'bpvs',names[1]:'profit',names[2]:'equity'})
        df[['equity','profit', 'bpvs']] = df[['equity', 'profit','bpvs']].astype(float)
        df.index.names = ['date']
        to_file_name = bank + ".csv"
        print df
        df.to_csv(to_file_name,sep=',',encoding='utf-8')


clean_report_data()