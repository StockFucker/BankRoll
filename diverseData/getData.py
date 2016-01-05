# -*- coding: utf-8 -*-


from bs4 import BeautifulSoup
import requests 
import sys
import os
import string
import urllib2
import csv
import pandas as pd
reload(sys) 
sys.setdefaultencoding("utf8")

banks = ["600000","002142","600036","601998","601169","601166","601009","000001","601398","601988","601818","601328","601939","601288","600015","600016"]
html_page_base = "http://quotes.money.163.com/f10/fhpg_"
outfile = "data.csv"

def generateUrls():
    for bank in banks:
        url = html_page_base + bank + ".html"
        fetch_data_url(bank,url)

def extract_text(node):
    return node.get_text()

def fetch_data_url(code,url):
    r = requests.get(url)
    soup = BeautifulSoup(r.text,"lxml")
    tables = soup.find_all("table",class_ = "table_bg001 border_box limit_sale")
    for index in range(0,4):
        file_name = code + "_" + str(index) + ".csv"
        with open(file_name, 'wb') as fp:
            csv_writer = csv.writer(fp,delimiter=',')
            table = tables[index]
            #添加表头
            head = table.thead.extract()
            head_trs = head.find_all('tr')
            head_tr = head_trs[0]
            head_ths = head_tr.find_all('th')
            #处理多列表头 
            if len(head_trs) > 1:
                sub_head_tr = head_trs[1]
                sub_head_ths = sub_head_tr.find_all('th')
                head_ths = head_ths[:2] + sub_head_ths + head_ths[3:]

            heads = map(extract_text,head_ths)
            csv_writer.writerow(heads)
            #添加表内容
            trs = table.find_all('tr')
            for tr in trs:
                tds = tr.find_all('td')
                texts = map(extract_text,tds)
                csv_writer.writerow(texts)

def read_data():
    df = pd.read_csv('000001_0.csv')
    print df

generateUrls()