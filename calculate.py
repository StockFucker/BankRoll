# -*- coding: utf-8 -*-
import pandas as pd

banks = ["600000","002142","600036","601998","601169","601166","601009","000001","601398","601988","601818","601328","601939","601288","600015","600016"]


# bvps ---------------- 每日净资产

def concat_bvps():
    bank_dfs = []
    for bank in banks:
        file_name = "reportData/" + bank + ".csv"
        bank_df = pd.read_csv(file_name, index_col = 0,parse_dates = True)
        bank_df = bank_df.drop(bank_df.columns[[1]],1)
        bank_df = bank_df.rename(columns = {'bpvs':bank})
        bank_dfs.append(bank_df)
    bvps_df = pd.concat(bank_dfs, axis=1)
    return bvps_df

def calculate_everyday_bvps():

    df = pd.read_csv('prices.csv',sep=',', encoding='utf-8')
    df['date'] = pd.to_datetime(df['date'])

    bvps_df = concat_bvps()
    bvps_dates = list(bvps_df.index)
    bvps_dates.append(pd.Timestamp('2016-01-01'))
    bvps_df = bvps_df.T
    current_bvps_date_index = 7
    for index, row in df.iterrows():
        date = row['date']
        bvps_date = bvps_dates[current_bvps_date_index]
        next_bvps_date = bvps_dates[current_bvps_date_index + 1]
        if date >= next_bvps_date: #如果相等，则采用原值
            current_bvps_date_index += 1
            continue
        #在bvps_df 里插入非财报日的预测数据
        date_interval = (date - bvps_date) / pd.offsets.Day(1)
        last_date = bvps_dates[current_bvps_date_index - 4]
        bvps_df[date] = (bvps_df[bvps_date] - bvps_df[last_date]) / 365 * date_interval + bvps_df[bvps_date]
    bvps_df = bvps_df.T
    bvps_df = bvps_df[bvps_df.index > pd.Timestamp('2011-01-01')]
    bvps_df.sort_index(inplace=True)
    bvps_df.to_csv("bvps.csv",sep=',', encoding='utf-8')

# equity change ---------------- 每季度股东权益变化 = 股东权益变化 + 拨备 - 不良

def concat_equity_change():
    equity_change_dfs = []
    for bank in banks:
        bank_file_name = "bankData/" + bank + ".csv"
        report_file_name = "reportData/" + bank + ".csv"
        bank_df = pd.read_csv(bank_file_name,sep=',', encoding='utf-8')
        report_df = pd.read_csv(report_file_name,sep=',', encoding='utf-8')
        df = pd.concat([bank_df,report_df], axis=1)
        df[['restore_ratio', 'bad_loan_ratio','total_loan','equity']] = df[['restore_ratio', 'bad_loan_ratio','total_loan','equity']].astype(float)
        equity_changes = []
        for index, row in df.iterrows():
            if index > len(df.index) - 5:
                break

            last_row = df.iloc[index + 4]
            restore_should_increase = 0.0
            if last_row['restore_ratio'] < 2.5:
                restore_year = (index + 1) * 0.25 #若为2015年第三季度，要在0.25年内达标。要在restore_year年内达标。
                restore_should_increase = (2.5 - last_row['restore_ratio'])/restore_year 
            equity_change = row['equity'] - last_row['equity'] + 0.75 * last_row['total_loan'] * (row['restore_ratio'] - (restore_should_increase + last_row['restore_ratio']) - row['bad_loan_ratio'] + last_row['bad_loan_ratio'])
            equity_changes.append(equity_change)

        equity_change_df = pd.DataFrame(equity_changes)
        names = list(equity_change_df.columns.values)
        equity_change_df = equity_change_df.rename(columns = {names[0]:bank})
        dates = list(bank_df['date'])[:len(equity_change_df)]
        equity_change_df['date'] = dates
        equity_change_df['date'] = pd.to_datetime(equity_change_df['date'])
        equity_change_df = equity_change_df.set_index(['date'])
        equity_change_dfs.append(equity_change_df)
    df = pd.concat(equity_change_dfs, axis=1)
    return df

def calculate_equity_change():

    df = pd.read_csv('prices.csv',sep=',', encoding='utf-8')
    df['date'] = pd.to_datetime(df['date'])

    bvps_df = concat_equity_change()
    bvps_dates = list(bvps_df.index)
    bvps_dates.append(pd.Timestamp('2016-01-01'))
    bvps_df = bvps_df.T
    current_bvps_date_index = 3
    for index, row in df.iterrows():
        date = row['date']
        bvps_date = bvps_dates[current_bvps_date_index]
        next_bvps_date = bvps_dates[current_bvps_date_index + 1]
        if date >= next_bvps_date: #如果相等，则采用原值
            current_bvps_date_index += 1
            continue
        #在bvps_df 里插入非财报日的预测数据
        bvps_df[date] = bvps_df[bvps_date]

    bvps_df = bvps_df.T
    bvps_df = bvps_df[bvps_df.index > pd.Timestamp('2011-01-01')]
    bvps_df.sort_index(inplace=True)

    print bvps_df
    bvps_df.to_csv("equityChange.csv",sep=',', encoding='utf-8')


# equity change ---------------- 总股本 =  equity/bvps
def calculate_total():
    for bank in banks:
        print bank
        report_file_name = "reportData/" + bank + ".csv"
        report_df = pd.read_csv(report_file_name,sep=',', encoding='utf-8')
        report_df['total'] = report_df['equity']/report_df['bpvs']
        print report_df
        break

calculate_total()
