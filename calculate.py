# -*- coding: utf-8 -*-
import pandas as pd
import math

banks = ["600000","002142","600036","601998","601169","601166","601009","000001","601398","601988","601818","601328","601939","601288","600015","600016"]

# bvps ---------------- 每日净资产
# 需要单元测试

def concat_bvps():
    bank_dfs = []
    for bank in banks:
        file_name = "reportData/" + bank + ".csv"
        bank_df = pd.read_csv(file_name, index_col = 0,parse_dates = True)
        bank_df = bank_df.drop(bank_df.columns[[1,2]],1)
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
        bvps_df[date] = bvps_df[bvps_date]
    bvps_df = bvps_df.T
    bvps_df = bvps_df[bvps_df.index > pd.Timestamp('2011-01-01')]
    bvps_df.sort_index(inplace=True)
    bvps_df.to_csv("bvps.csv",sep=',', encoding='utf-8')


# equity change ---------------- 每季度股东权益变化 = 股东权益变化（万） + 拨备 - 不良 (亿)
# 需要单元测试

def concat_equity_change():
    equity_change_dfs = []
    for bank in banks:

        bank_file_name = "bankData/" + bank + ".csv"
        bank_df = pd.read_csv(bank_file_name,sep=',', encoding='utf-8')

        report_file_name = "reportData/" + bank + ".csv"
        report_df = pd.read_csv(report_file_name,sep=',', encoding='utf-8')
        report_df = report_df.drop(report_df.columns[[0]],1)

        diverse_file_name = 'diverseData/' + bank + '.csv'
        diverse_df = pd.read_csv(diverse_file_name, sep=',', encoding='utf-8')
        diverse_df['date'] = pd.to_datetime(diverse_df['date'])

        df = pd.concat([bank_df,report_df], axis=1)
        df['date'] = pd.to_datetime(df['date'])
        df[['restore_ratio', 'bad_loan_ratio','total_loan','profit']] = df[['restore_ratio', 'bad_loan_ratio','total_loan','profit']].astype(float)
        
        equity_changes = []
       
        for index, row in df.iterrows():
            if index > len(df.index) - 5:
                break
            last_row = df.iloc[index + 4]

            profit = 0.0
            #净利润
            if index%4 == 3:
                profit = row['profit']
            else:
                last_year_profit = df.iloc[int(index/4) * 4 + 3]['profit']
                profit = row['profit'] + last_year_profit - last_row['profit']
            #股东权益变化
            # profit = row['equity'] - last_row['equity']
            # selected_diverse_df = diverse_df[diverse_df['date'] < row['date']]
            # selected_diverse_df = selected_diverse_df[diverse_df['date'] > last_row['date']]
            # diverses = list(selected_diverse_df['diverse'])
            # for diverse in diverses:
            #     profit -= diverse

            isBigBank = (bank in ['601328','601988','601288','601398','601939'])
            restore_should_increase = 0.0
            if last_row['restore_ratio'] < 2.5:
                restore_year = (index + 9) * 0.25 #若为2015年第三季度，要在0.25年内达标。要在restore_year年内达标。
                if isBigBank and restore_year > 3:
                    restore_year -= 3
                restore_should_increase = (2.5 - last_row['restore_ratio'])/restore_year 
            equity_change = profit/10000 + 0.0075 * row['total_loan'] * (row['restore_ratio'] - (restore_should_increase + last_row['restore_ratio']) - row['bad_loan_ratio'] + last_row['bad_loan_ratio'])
            equity_changes.append(equity_change) 
            if row['date'] == pd.Timestamp('2013-03-31') and bank == '601328':
                print (index + 9) * 0.25
                print row['total_loan']
                print row['restore_ratio'] 
                print row['bad_loan_ratio']
                print last_row['restore_ratio']
                print last_row['restore_ratio'] + restore_should_increase
                print last_row['bad_loan_ratio']
                print equity_change

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

#concat_equity_change()

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

    #print bvps_df
    bvps_df.to_csv("equityChange.csv",sep=',', encoding='utf-8')

#calculate_equity_change()
# equity average ---------------- 股东权益平均值 = 初始股东权益 - 分红 + 再融资 (万)
# 需要单元测试


def concat_equity():
    bank_dfs = []
    for bank in banks:
        file_name = "reportData/" + bank + ".csv"
        bank_df = pd.read_csv(file_name, index_col = 0,parse_dates = True)
        bank_df = bank_df.drop(bank_df.columns[[0,1]],1)

        diverse_file_name = 'diverseData/' + bank + '.csv'
        diverse_df = pd.read_csv(diverse_file_name, index_col = 0,parse_dates = True)

        # if bank == '601166':
        #     print bank_df

        for diverse_date, row in diverse_df.iterrows():

            selected_band_df = bank_df[bank_df.index < diverse_date] #获取分红之前的报表数据
            selected_dates = []
            if len(selected_band_df.index) >= 4:
                selected_dates = list(selected_band_df.index)[:4]
            else:
                selected_dates = list(selected_band_df.index)

            for selected_date in selected_dates:
                date_interval = (diverse_date - selected_date) / pd.offsets.Day(1)
                selected_index = list(bank_df.index).index(selected_date)
                equity = bank_df.iloc[selected_index]['equity']
                bank_df.iloc[selected_index]['equity'] = equity + (1 - date_interval/365) * float(row['diverse'])

        bank_df = bank_df.rename(columns = {'equity':bank})
        bank_dfs.append(bank_df)

    bvps_df = pd.concat(bank_dfs, axis=1)
    return bvps_df

def calculate_average_equity():
    df = pd.read_csv('prices.csv',sep=',', encoding='utf-8')
    df['date'] = pd.to_datetime(df['date'])

    equity_df = concat_equity()
    equity_dates = list(equity_df.index)
    equity_dates.append(pd.Timestamp('2016-01-01'))
    
    equity_df = equity_df.T
    current_report_date_index = 3

    for index, row in df.iterrows():
        date = row['date']
        equity_date = equity_dates[current_report_date_index]
        next_equity_date = equity_dates[current_report_date_index + 5]
        if date >= next_equity_date: #如果相等，则采用原值
            current_report_date_index += 1
            continue
        #equity_df 里插入非财报日的预测数据

        equity_df[date] = equity_df[equity_date]

    equity_df = equity_df.T
    equity_df = equity_df[equity_df.index > pd.Timestamp('2011-01-01')]
    equity_df.sort_index(inplace=True)

    #print equity_df
    equity_df.to_csv("equityAverage.csv",sep=',', encoding='utf-8')


# hold ---------------- 计算持仓 (万)
# 需要单元测试

def calculate_hold():
    price_df = pd.read_csv('prices.csv',sep=',', encoding='utf-8',index_col = 1,parse_dates = True)
    price_df = price_df.drop(price_df.columns[[0,1]],1)
    equity_average_df = pd.read_csv('equityAverage.csv',sep=',', encoding='utf-8',index_col = 0,parse_dates = True)
    equity_change_df = pd.read_csv('equityChange.csv',sep=',', encoding='utf-8',index_col = 0,parse_dates = True)
    bvps_df = pd.read_csv('bvps.csv',sep=',', encoding='utf-8',index_col = 0,parse_dates = True)
    dates = selected_index = list(price_df.index)
    holds = []
    for date, price_row in price_df.iterrows():
        index = dates.index(date)
        equity_average_row = equity_average_df.iloc[index]
        equity_change_row = equity_change_df.iloc[index]
        bvps_row = bvps_df.iloc[index]
        df = pd.concat([price_row,equity_average_row,equity_change_row,bvps_row], axis=1)
        names = list(df.columns.values)
        df.columns = ['price','equity_average','equity_change','bvps']
        df['equity_change'] = df['equity_change'] * 10000

        ranks = []
        roes = []
        for bank,row in df.iterrows():
            roe = row['equity_change']/row['equity_average']
            rank = math.log(row['price'] * 2 / row['bvps'],1 + roe)
            ranks.append(rank)
            roes.append(roe)
        df['roe'] = roes
        df['rank'] = ranks
        df = df.sort(['rank'])

        if date == pd.Timestamp('2013-11-06'):
            print df

        holds.append(list(df.index)[0])

    hold_df = pd.DataFrame(index = price_df.index)
    hold_df['code'] = holds
    hold_df.index.name = 'date'
    hold_df.to_csv('result/hold.csv')

#calculate_average_equity()
#calculate_equity_change()
calculate_hold()