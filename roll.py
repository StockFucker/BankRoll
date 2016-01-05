# -*- coding: utf-8 -*-
import tushare as ts
import pandas as pd
import math
from ggplot import *
import datetime

banks = ["600000","002142","600036","601998","601169","601166","601009","000001","601398","601988","601818","601328","601939","601288","600015","600016"]

def getData():
    #获取财务数据保存到本地，修改tushare源码使其仅包括金融类股票
    for year in range(2012,2013):
        for season in range(3,5):
            df = ts.get_report_data(year,season)
            filename = str(year) + '-' + str(season)
            df.to_csv(filename,sep=',', encoding='utf-8')

def getPrice():
    #获取价格数据保存到本地
    for bank in banks:
        df = ts.get_hist_data(bank)
        if df is not None:
            df.to_csv(bank,sep=',', encoding='utf-8')

def getIndex():
    #获取上证指数保存到本地
    df = ts.get_hist_data('sh')
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
    last_df = pd.read_csv('sh',sep=',', encoding='utf-8',dtype={'code': str})
    last_df = last_df.drop(last_df.columns[[1,2,4,5,6,7,8,9,10,11,12,13]],1)

    for bank in banks:
        df = pd.read_csv(bank,sep=',', encoding='utf-8')
        df = df.drop(df.columns[[1,2,4,5,6,7,8,9,10,11,12,13,14]],1)
        df = df.rename(columns = {'close':bank})
        last_df = last_df.merge(df,left_on = 'date',right_on = 'date',how = 'left')

    last_df = last_df.iloc[::-1]
    last_df.to_csv('prices.csv',sep=',', encoding='utf-8')


def calculate_report():
    report_dfs = []
    report_dates = []
    for year in range(2012,2016):
        for season in range(1,5):
            if (year == 2015 and season == 4) or (year == 2012 and (season == 1 or season == 2)):
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
        inst_tax = safe_cast(row['inst'], float, 0.0)/100.0
        bonus_tax = safe_cast(row['bonus'], float, 0.0)/100.0
        df['bvps'][code] = df['bvps'][code] - inst_tax - bonus_tax
        new_dfs.append(df.copy())
        new_dates.append(row['date'])
    return new_dfs,new_dates

def mix_report_diverse(reports,diverse_df):
    report_dfs,report_dates = reports
    mixed_dfs = []
    mixed_dates = []
    date = report_dates[0]
    for i in range(0,len(report_dates)):
        next_date =  (datetime.date.today() if (i == len(report_dates) - 1) else report_dates[i + 1])
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
    for index, row in df.iterrows():
        #根据交易日获取最近的报告，分析出排名，选择持仓股
        current_report_date = report_dates[current_date_index]

        report_df = pd.DataFrame([])
        if current_date_index == len(report_dates) - 1:
            report_df = report_dfs[-1]
        else:
            if row['date'] >= current_report_date:
                current_date_index = current_date_index + 1
            report_df = report_dfs[current_date_index]
        ranks = []
        for code_index, report_row in report_df.iterrows():
            code = code_index
            price = row[code]
            rank = math.log(price * 2 / report_row['bvps'],1 + report_row['roe']/100)
            rank = 1/(1 + report_row['roe'])
            ranks.append(rank)
        report_df['rank'] = ranks
        report_df = report_df.sort(['rank'])
        codes.append(list(report_df.index)[0])
    df['code'] = codes
    df.to_csv('hold.csv',sep=',', encoding='utf-8')    


def getPriceFrom(df,code,date):
    df = df[df['date'] == date]
    price = list(df[code])[0]
    return price

def trade():
    
    df = pd.read_csv('hold.csv',sep=',', encoding='utf-8',dtype={'code': str})
    df['date'] = pd.to_datetime(df['date'])

    current_hold_code = list(df['code'])[0]
    start_date = list(df['date'])[0]
    hold_amount = 1.0/getPriceFrom(df,current_hold_code,start_date)
    values = []

    index_values = []
    start_index = list(df['close'])[0]

    bank1_values = []
    bank1_start = list(df['600015'])[0]

    bank2_values = []
    bank2_start = list(df['601818'])[0]

    bank3_values = []
    bank3_start = list(df['601166'])[0]

    bank4_values = []
    bank4_start = list(df['601288'])[0]

    for index, row in df.iterrows():

        hold_price = getPriceFrom(df,current_hold_code,row['date'])

        #算出净值
        values.append(hold_price * hold_amount)
        index_values.append(row['close'] / start_index)
        bank1_values.append(row['600015'] / bank1_start)
        bank2_values.append(row['601818'] / bank2_start)
        bank3_values.append(row['601166'] / bank3_start)
        bank4_values.append(row['601288'] / bank4_start)
        #调仓
        code = row['code']
        if code == current_hold_code:
            continue

        price = getPriceFrom(df,code,row['date'])
        hold_amount = hold_price * hold_amount * 0.998 / price
        current_hold_code = code
    df['my_value'] = values
    df['index_value'] = index_values
    df['600015'] = bank1_values
    df['601818'] = bank2_values
    df['601166'] = bank3_values
    df['601288'] = bank4_values

    print df 
    df = pd.melt(df,id_vars = ["date"],value_vars = ['my_value','index_value','600015','601818','601166','601288']) 
    plot = ggplot(df,aes(x = "date", y = "value",color = "variable")) + geom_line(),
    print plot

trade()

# def calculateTradeModel():
#     from_date = "2011-04-30"

# def trade(from_date,hold_codes):
#     print from_date
#     print hold_codes

# from_date,hold_codes = calculateTradeModel()
# trade(from_date,hold_codes)