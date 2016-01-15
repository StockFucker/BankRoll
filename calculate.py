# -*- coding: utf-8 -*-
import pandas as pd

banks = ["600000","002142","600036","601998","601169","601166","601009","000001","601398","601988","601818","601328","601939","601288","600015","600016"]

def calculate_everyday_bvps():
    df = pd.read_csv('prices.csv',sep=',', encoding='utf-8')
    bank_dfs = []
    for bank in banks:
        file_name = "reportData/" + bank + ".csv"
        bank_df = pd.read_csv(file_name, index_col = 0,parse_dates = True)
        bank_df = bank_df.drop(bank_df.columns[[1]],1)
        print bank_df
        bank_df = bank_df.rename(columns = {'bpvs':bank})
        bank_dfs.append(bank_df)

    bvps_df = pd.concat(bank_dfs, axis=1)
    print bvps_df

calculate_everyday_bvps()