# -*- coding: utf-8 -*-
import pandas as pd

banks = ["600000","002142","600036","601998","601169","601166","601009","000001","601398","601988","601818","601328","601939","601288","600015","600016"]

def clean_bank():
    for bank in banks:
        file_name = "originData/" + bank + ".csv"
        df = pd.read_csv(file_name,sep=',', encoding='utf-8')

        to_drop = range(0,len(df.axes[1]))
        to_drop.remove(0)
        to_drop.remove(3)
        to_drop.remove(5)
        to_drop.remove(7)
        to_drop.remove(8)
        df = df.drop(df.columns[to_drop],1)

        names = list(df.columns.values)
        df = df.rename(columns = {names[0]:'date',names[1]:'restore_cover_ratio',names[2]:'total_loan',names[3]:'bad_loan',names[4]:'bad_loan_ratio'})
        
        df = df[df['date'] > "2008-08-01"]

        # 填充空白数据
        for index, row in df.iterrows():
            if index == len(df.index) - 1:
                continue
            if row['restore_cover_ratio'] == '--' and row['bad_loan_ratio'] == '--' and row['total_loan'] == '--' and row['bad_loan'] == '--':
                for key in ['restore_cover_ratio','bad_loan_ratio','total_loan','bad_loan']:
                    row[key] = str((float(df.iloc[index + 1][key]) + float(df.iloc[index - 1][key]))/2)

        for index, row in df.iterrows():
            if index == len(df.index) - 1:
                continue
            elif row['restore_cover_ratio'] == '--':
                last_restore_cover_ratio = float(df.iloc[index + 1]['restore_cover_ratio'])
                last_bad_loan = float(df.iloc[index + 1]['bad_loan'])
                row['restore_cover_ratio'] = str(last_restore_cover_ratio * last_bad_loan / float(row['bad_loan']))
            if row['bad_loan_ratio'] == '--':
                row['bad_loan_ratio'] = str(float(row['bad_loan']) / float(row['total_loan']))
            if row['total_loan'] == '--':
                row['total_loan'] = str(float(row['bad_loan']) / float(row['bad_loan_ratio']))
            if row['bad_loan'] == '--':
                row['bad_loan'] = str(float(row['total_loan']) * float(row['bad_loan_ratio']))
        
        df = df[df['date'] > "2009-01-01"]
        df = df.set_index(['date'])

        df[['restore_cover_ratio', 'bad_loan','total_loan']] = df[['restore_cover_ratio', 'bad_loan','total_loan']].astype(float)
        df['restore_ratio'] = df['restore_cover_ratio'] * df['bad_loan'] / df['total_loan']
        df = df.drop(df.columns[[0,2]],1)
        
        print df
        to_file_name = bank + ".csv"
        df.to_csv(to_file_name,sep=',',encoding='utf-8')

clean_bank()