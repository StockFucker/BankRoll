# -*- coding: utf-8 -*-
import tushare as ts
import pandas as pd
import math
from ggplot import *
import time

banks = ["600000","002142","600036","601998","601169","601166","601009","000001","601398","601988","601818","601328","601939","601288","600015","600016"]

def getData():
    #获取财务数据保存到本地，修改tushare源码使其仅包括金融类股票
    for year in range(2010,2011):
        for season in range(3,5):
            df = ts.get_report_data(year,season)
            filename = str(year) + '-' + str(season)
            df.to_csv(filename,sep=',', encoding='utf-8')

def getPrice():
    #获取价格数据保存到本地
    for bank in banks:
        df = ts.get_h_data(bank, start='2011-01-01', end='2015-12-31',autype=None)
        if df is not None:
            df.to_csv(bank,sep=',', encoding='utf-8')

def getIndex():
    #获取上证指数保存到本地
    df = ts.get_h_data('000001',start= '2011-01-01',end = '2015-12-31', index=True)
    df.to_csv('sh',sep=',', encoding='utf-8')

def fixROE(df,season):
    #修改新浪财经的roe数据
    ratio = season
    df['roe'] = df['roe'] / ratio * 4
    return df

def safe_cast(val, to_type, default=None):
    try:
        return to_type(val)
    except ValueError:
        return default

def concatData():
    last_df = pd.read_csv('priceData/sh',sep=',', encoding='utf-8',dtype={'code': str})
    last_df = last_df.drop(last_df.columns[[1,2,4,5,6]],1)

    for bank in banks:
        df = pd.read_csv("priceData/" + bank,sep=',', encoding='utf-8')
        df = df.drop(df.columns[[1,2,4,5,6]],1)
        df = df.rename(columns = {'close':bank})
        last_df = last_df.merge(df,left_on = 'date',right_on = 'date',how = 'left')

    last_df = last_df.iloc[::-1]
    last_df.to_csv('prices.csv',sep=',', encoding='utf-8')


def getPriceFrom(df,code,date):
    df = df[df['date'] == date]
    price = list(df[code])[0]
    return price

def trade():
    
    df = pd.read_csv('hold.csv',sep=',', encoding='utf-8',dtype={'code': str})
    price_df = pd.read_csv('fq_prices.csv',sep=',', encoding='utf-8')
    df = df.merge(price_df,left_on = 'date',right_on = 'date',how = 'left')
    df['date'] = pd.to_datetime(df['date'])

    current_hold_code = list(df['code'])[0]
    start_date = list(df['date'])[0]
    hold_amount = 1.0/getPriceFrom(df,current_hold_code,start_date)
    values = []

    index_values = []
    start_index = list(df['close'])[0]

    for index, row in df.iterrows():

        hold_price = getPriceFrom(df,current_hold_code,row['date'])

        hold_value = 0
        #算出净值
        index_values.append(row['close'] / start_index)

        if math.isnan(hold_price):
            hold_value = values[-1]
        else:
            hold_value = hold_price * hold_amount

        values.append(hold_value)

        #调仓
        code = row['code']
        if code == current_hold_code:
            continue

        current_hold_code = code
        price = getPriceFrom(df,code,row['date'])
        if math.isnan(price):
            continue
        hold_amount = hold_value * 0.998 / price

    df['my_value'] = values
    df['index_value'] = index_values

    print df 
    df = pd.melt(df,id_vars = ["date"],value_vars = ['my_value','index_value']) 
    plot = ggplot(df,aes(x = "date", y = "value",color = "variable")) + geom_line(),
    print plot


def calculate_report():
    report_dfs = []
    report_dates = []
    for year in range(2010,2016):
        for season in range(1,5):
            if (year == 2015 and season == 4) or (year == 2010 and (season == 1 or season == 2)):
                continue
            filename = "reportData/" + str(year) + '-' + str(season)
            df = pd.read_csv(filename,sep=',', encoding='utf-8',dtype={'code': str})
            #过滤银行股
            df = df[df['code'].isin(banks)]
            #修正roe
            df = fixROE(df,season)

            df.set_index(['code'], inplace = True)

            #报告日期生成
            fix_year = year
            if season == 4:
                fix_year = year + 1
            df['report_date'] = str(fix_year) + '-' + df['report_date']
            df['report_date'] = pd.to_datetime(df['report_date'])
            if season == 4:
                df['report_date'] = df['report_date'] - pd.Timedelta(days = 30)
            max_date = df['report_date'].max()
            df['inst'] = 0.0
            df['bonus'] = 0.0
            df['bvps_fix'] = df['bvps']
            report_dates.append(max_date)
            report_dfs.append(df)
    return (report_dfs,report_dates)

def calculate_diverse():
    diverse_dfs = []
    for bank in banks:
        file_name = "diverseData/" + bank + "_0.csv"
        diverse_df = pd.read_csv(file_name,sep=',', encoding='utf-8')
        diverse_df['code'] = bank
        diverse_dfs.append(diverse_df)
    df = pd.concat(diverse_dfs)
    df = df.drop(df.columns[[1,5,6,7]],1)
    names = list(df.columns.values)
    df = df.rename(columns = {names[0]:'date',names[1]:'bonus',names[2]:'accum',names[3]:'inst'})
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort(['date'])
    return df

def generate_df_from(from_date,to_date,report_df,diverse_df):
    diverse_df = diverse_df[(diverse_df['date'] >= from_date) & (diverse_df['date'] < to_date)]
    new_dfs = [report_df.copy()]
    new_dates = [from_date]
    df = report_df    
    
    for index, row in diverse_df.iterrows():
        code = row['code']
        df['inst'][code] = safe_cast(row['inst'],float,0.0)/10
        df['bonus'][code] = safe_cast(row['bonus'],float,0.0)/10
        new_dfs.append(df.copy())
        new_dates.append(row['date'])
    return new_dfs,new_dates

def mix_report_diverse(reports,diverse_df):
    report_dfs,report_dates = reports
    mixed_dfs = []
    mixed_dates = []
    date = report_dates[0]
    for i in range(0,len(report_dates)):
        next_date =  (pd.Timestamp('2016-01-01') if (i == len(report_dates) - 1) else report_dates[i + 1])
        report_df = report_dfs[i]
        new_dfs,new_dates = generate_df_from(date,next_date,report_df,diverse_df)
        mixed_dfs = mixed_dfs + new_dfs
        mixed_dates = mixed_dates + new_dates
        date = next_date  
    return mixed_dfs,mixed_dates 

def calculateData():
    
    #准备财报数据
    reports = calculate_report()

    #准备分红数据
    diverse_df = calculate_diverse()
    report_dfs,report_dates = mix_report_diverse(reports,diverse_df)

    #遍历每一天计算翻倍率
    df = pd.read_csv('prices.csv',sep=',', encoding='utf-8')
    df['date'] = pd.to_datetime(df['date'])

    codes = []
    current_date_index = 0
    report_dates.append(pd.Timestamp('2016-01-01'))

    for index, row in df.iterrows():

        #根据交易日获取最近的报告，分析出排名，选择持仓股
        current_report_date = report_dates[current_date_index + 1]

        report_df = report_dfs[current_date_index]
        if row['date'] >= current_report_date:
            current_date_index = current_date_index + 1

        ranks = []
        for code_index, report_row in report_df.iterrows():
            price = row[code_index]
            inst = report_row['inst']
            bonus = report_row['bonus']
            bvps = report_row['bvps']
            tax = (inst + bonus) * 0.1
            cost = inst - (inst - tax) * (bvps/price) * 0.9997
            report_row['bvps_fix'] = bvps - cost
            rank = math.log(price * 2 / report_row['bvps'],1 + report_row['roe']/100)
            ranks.append(rank)

        report_df['rank'] = ranks

        report_df = report_df.sort(['rank'])
        codes.append(list(report_df.index)[0])
        
        if row['date'] == pd.Timestamp('2011-11-16'):
            print report_df

    hold_df = pd.DataFrame(index=df.index)
    hold_df['date'] = df['date']
    hold_df['code'] = codes
    hold_df.to_csv('hold.csv',sep=',', encoding='utf-8')    

calculateData()

# def calculateTradeModel():
#     from_date = "2011-04-30"
# def trade(from_date,hold_codes):
#     print from_date
#     print hold_codes

# from_date,hold_codes = calculateTradeModel()
# trade(from_date,hold_codes)