
// method
function strIndexReplace(_str,_index,_replace){
    if(_str.indexOf(_index)>-1){
        return _str.substring(0,_str.indexOf(_index))+_replace+_str.substring(_str.indexOf(_index)+_index.length);
    }else{
        return _str;
    }
}
// menu
// hexun Calendar
var temp_date=new Date();
var data_array=new Array('日','一','二','三','四','五','六');
var temp_str=temp_date.getFullYear()+'年'+(temp_date.getMonth()+1)+'月'+temp_date.getDate()+'日 星期'+data_array[temp_date.getDay()];
try
{
    document.getElementById('hexunCalendar').innerHTML='<a href="http://calendar.hexun.com/" target="_blank">'+temp_str+'</a>';
}
catch (exc)
{
}
delete temp_date,temp_str,data_array;



var channel=
    [
        {	name:'千股宝典',id:'nc',url:'nc.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/nc_stock_logo.gif'},
        {	name:'财经日历',id:'calendar',url:'calendar.hexun.com',logo:'http://img.hexun.com/2010/sylogo/nc_stock_logo.gif'},
        {	name:'税务',id:'tax',url:'tax.hexun.com/csdt/',logo:'http://img.hexun.com/2010/sylogo/tax_logo.gif'},
        {	name:'用户中心',id:'vip',url:'vip.hexun.com',logo:'http://img.hexun.com/2010/sylogo/vip_logo.gif'},
        {	name:'即时新闻',id:'roll',url:'roll.hexun.com',logo:'http://img.hexun.com/2010/sylogo/roll_logo.gif'},
        {	name:'图片',id:'pic',url:'pic.hexun.com',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'},
        {	name:'商旅',id:'travel',url:'travel.hexun.com',logo:'http://img.hexun.com/travel/2013/img/sl_logo.gif'},
        {	name:'和讯部委',id:'gov',url:'gov.hexun.com',logo:'http://img.hexun.com/2010/sylogo/gov_logo.gif'},
        {	name:'创投',id:'pe',url:'pe.hexun.com',logo:'http://img.hexun.com/2010/sylogo/ct_logo.gif'},
        {	name:'人物',id:'renwu',url:'renwu.hexun.com',logo:'http://img.hexun.com/2010/sylogo/rw_logo.gif'},
        {	name:'投资学院',id:'vip',url:'pxpt.hexun.com',logo:'http://img.hexun.com/2010/sylogo/tz_logo.gif'},
        {	name:'现货',id:'xianhuo',url:'xianhuo.hexun.com',logo:'http://img.hexun.com/2010/sylogo/xh_logo.gif'},
        {	name:'奢侈品',id:'lux',url:'lux.hexun.com',logo:'http://img.hexun.com/2010/sylogo/lux_logo.gif',

            children:
                [
                    {	name:'奢侈品',id:'lux',url:'lux.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'高尔夫',id:'golf',url:'golf.hexun.com',logo:'http://img.hexun.com/images2008/logo04.gif'},
        {	name:'焦点',id:'topic',url:'topic.news.hexun.com',logo:'http://img.hexun.com/images2008/logo03.gif'},
        {	name:'生活',id:'life',url:'life.news.hexun.com',logo:'http://img.hexun.com/images2008/logo10.gif'},
        {	name:'网站地图',id:'life',url:'news.hexun.com/sitemap/',logo:'http://img.hexun.com/2011/sitemap/img/logo_clh.gif'},
        {	name:'时事要闻',id:'sspd',url:'news.hexun.com/events/',logo:'http://img.hexun.com/2010/sylogo/sspd_logo.gif'},
        {	name:'新兴市场',id:'xxsc',url:'news.hexun.com/qqxxsc/',logo:'http://img.hexun.com/2012/xxsclogo/xxsc_logo.jpg'},
        {	name:'收藏',id:'shoucang',url:'shoucang.hexun.com/',logo:'http://img.hexun.com/2010/sylogo/sc_logo.gif'},
        {	name:'读书',id:'book',url:'book.hexun.com',logo:'http://img.hexun.com/2010/sylogo/book_logo.gif',
            children:
                [
                    {	name:'读书',id:'book',url:'book.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'读书',id:'book',url:'data.book.hexun.com',logo:'http://img.hexun.com/2010/sylogo/book_logo.gif'},
        {	name:'邮箱',id:'mail',url:'mail.hexun.com',logo:'http://img.hexun.com/2010/sylogo/mail_logo.gif'},
        {	name:'关于我们',id:'mail',url:'corp.hexun.com',logo:'http://img.hexun.com/2010/sylogo/corp_logo.gif',
            children:
                [
                    {	name:'合作伙伴',id:'partner',url:'corp.hexun.com/partner/',logo:'http://img.hexun.com/2013/logo/partner.jpg'}
                ]
        },
        {	name:'宏观数据',id:'mac',url:'mac.hexun.com',logo:'http://img.hexun.com/2010/sylogo/mac_logo.gif'},
        {	name:'封面秀',id:'media',url:'media.hexun.com',logo:'http://img.hexun.com/2010/sylogo/media_logo.gif'},
        {	name:'策略海',id:'a',url:'a.hexun.com',logo:'http://img.hexun.com/2010/sylogo/clh_logo.gif'},
        {	name:'河南站',id:'henan',url:'henan.hexun.com',logo:'http://img.hexun.com/2010/sylogo/hnz_logo.gif'},
        {	name:'福建站',id:'fujian',url:'fujian.hexun.com',logo:'http://img.hexun.com/2010/sylogo/fj_logo.gif'},
        {	name:'四川站',id:'sichuan',url:'sichuan.hexun.com',logo:'http://img.hexun.com/2010/sylogo/scz_logo.gif'},
        {	name:'山东站',id:'shandong',url:'shandong.hexun.com',logo:'http://img.hexun.com/2010/sylogo/sdz_logo.gif'},
        {	name:'湖南站',id:'hunan',url:'hunan.hexun.com',logo:'http://img.hexun.com/2010/sylogo/hunz_logo.gif'},
		{	name:'湖北站',id:'hubei',url:'hubei.hexun.com',logo:'http://img.hexun.com/2014/zk/201411/hubeilog.gif'},
        {	name:'科技',id:'tech',url:'tech.hexun.com',logo:'http://img.hexun.com/2010/sylogo/tech_logo.gif'},
        {	name:'江苏站',id:'jiangsu',url:'jiangsu.hexun.com',logo:'http://img.hexun.com/2010/sylogo/js_logo.gif',
            children:
                [
                    {	name:'科技',id:'tech',url:'tech.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'行情中心',id:'quote',url:'quote.hexun.com',logo:'http://img.hexun.com/2010/sylogo/quote_logo.gif'},
        {	name:'机构底牌',id:'quote',url:'r.hexun.com',logo:'http://img.hexun.com/2010/sylogo/r_logo.gif'},
        {	name:'公益',id:'gongyi',url:'gongyi.hexun.com',logo:'http://img.hexun.com/2010/sylogo/gongyi_logo.gif'},
        {	name:'精英生活',id:'jingying',url:'life.hexun.com',logo:'http://img.hexun.com/2010/sylogo/life_logo.gif'},
        {	name:'世博',id:'quote',url:'expo2010.hexun.com',logo:'http://img.hexun.com/2010/sylogo/expo_logo.gif'},
        {	name:'信托',id:'trust',url:'trust.hexun.com',logo:'http://img.hexun.com/2010/sylogo/trust_logo.gif'},
        {	name:'法律法规',id:'law',url:'law.hexun.com',logo:'http://img.hexun.com/2010/sylogo/law_logo.gif'},
        {	name:'测试',id:'ceshi',url:'ceshi.hexun.com',logo:'http://img.hexun.com/2010/sylogo/ceshi_logo.gif'},
        {
            name:'债券',id:'bond',url:'bond.hexun.com',logo:'http://img.hexun.com/2010/sylogo/bond_logo.gif',
            children:
                [
                    {	name:'债券',id:'bond',url:'bond.money.hexun.com',logo:'http://img.hexun.com/2010/sylogo/bond_logo.gif'}
                ]
        },
        {	name:'股指期货',id:'stockfutures',url:'qizhi.hexun.com',logo:'http://img.hexun.com/2010/sylogo/qizhi_logo.gif'},
        {	name:'期货',id:'futures',url:'futures.hexun.com',logo:'http://img.hexun.com/2010/sylogo/futures_logo.gif',
            children:
                [
                    {	name:'国际期货',id:'futures',url:'futures.hexun.com/globalfutures',logo:'http://img.hexun.com/2010/sylogo/globalfutures_logo.jpg'}
                ]
        },
        {	name:'分红',id:'dividend',url:'stockdata.stock.hexun.com/gsfh',logo:'http://img.hexun.com/2010/sylogo/fenhong_logo.gif'},
        {	name:'国债期货',id:'gzqh',url:'gzqh.hexun.com',logo:'http://img.hexun.com/2010/sylogo/futures_gzqh.gif'},
        {	name:'期货行情',id:'quote_futures',url:'quote.futures.hexun.com',logo:'http://img.hexun.com/2010/sylogo/futures_logo.gif'},
        {	name:'外汇经纪商',id:'forexBroker',url:'forex.hexun.com/broker',logo:'http://img.hexun.com/2010/sylogo/broker_logo.jpg'},
        {	name:'外汇',id:'forex315',url:'315.forex.hexun.com',logo:'http://img.hexun.com/2010/sylogo/forex_logo.gif'},
        {	name:'外汇',id:'forex',url:'forex.hexun.com',logo:'http://img.hexun.com/2010/sylogo/forex_logo.gif'},
        {	name:'外汇行情',id:'quote_forex',url:'quote.forex.hexun.com',logo:'http://img.hexun.com/2010/sylogo/forex_logo.gif'},
        {	name:'黄金',id:'gold',url:'gold.hexun.com',logo:'http://img.hexun.com/2010/sylogo/gold_logo.gif',
            children:
                [
                    {	name:'黄金T+D',id:'gold',url:'gold.hexun.com/2010/cmbc',logo:'http://img.hexun.com/2010/sylogo/gold_td_logo.gif'},
                    {	name:'黄金',id:'gold',url:'gold.hexun.com/2011/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'},
                    {	name:'白银',id:'gold',url:'gold.hexun.com/silver-test',logo:'http://img.hexun.com/2010/sylogo/silver_logo.gif'},
                    {	name:'白银',id:'gold',url:'gold.hexun.com/silver',logo:'http://img.hexun.com/2010/sylogo/silver_logo.gif'}
                ]
        },
        {	name:'保险',id:'insurance',url:'insurance.hexun.com',logo:'http://img.hexun.com/2010/sylogo/insurance_logo.gif'},
        {	name:'保险',id:'insurance',url:'insurance.money.hexun.com',logo:'http://img.hexun.com/2010/sylogo/insurance_logo.gif'},//old domain
        {	name:'理财',id:'data',url:'data.money.hexun.com',logo:'http://img.hexun.com/2010/sylogo/money_logo.gif'},//old domain
        {
            name:'银行',id:'bank',url:'bank.hexun.com',logo:'http://img.hexun.com/2010/sylogo/bank_logo.gif',
            children:
                [
                    {	name:'信用卡',id:'bank',url:'bank.hexun.com/card',logo:'http://img.hexun.com/2010/sylogo/credit_logo.gif'},
                    {	name:'银行',id:'bank',url:'bank.money.hexun.com'},
                    {	name:'银行',id:'bank',url:'data.bank.hexun.com'}
                ]
        },
        {	name:'图吧',id:'tuba',url:'tuba.hexun.com',logo:'http://img.hexun.com/images2008/logo10.gif'},
        {	name:'养老金',id:'pension',url:'pension.hexun.com',logo:'http://img.hexun.com/2010/sylogo/ylj_logo.gif'},
        {
            name:'基金',id:'funds',url:'funds.hexun.com',logo:'http://img.hexun.com/2010/sylogo/funds_logo.gif',
            children:
                [
                    {	name:'基金',id:'funds',url:'funds.money.hexun.com'},
                    {   name:'基金关注度',id:'focus_funds',url:'focus.funds.hexun.com',logo:'http://img.hexun.com/fundsgzd/img/jjgzd.gif'},
                    {	name:'私募基金',id:'funds',url:'funds.hexun.com/smjj',logo:'http://img.hexun.com/2010/sylogo/private_logo.gif'}
                ]
        },
        {
            name:'理财',id:'money',url:'money.hexun.com',logo:'http://img.hexun.com/2010/sylogo/money_logo.gif',
            children:
                [
                    {	name:'理财',id:'money',url:'money.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'软件服务',id:'financeService',url:'lc.hexun.com',logo:'http://img.hexun.com/2010/sylogo/lc_logo.gif'},
        {	name:'健康',id:'health',url:'health.hexun.com',logo:'http://img.hexun.com/images2008/logo16.gif'},
        {	name:'商学院',id:'bschool',url:'bschool.hexun.com',logo:'http://img.hexun.com/2010/sylogo/bschool_logo.gif',
            children:
                [
                    {	name:'商学院',id:'bschool',url:'bschool.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'和讯视频',id:'tv',url:'tv.hexun.com',logo:'http://img.hexun.com/2010/sylogo/tv_logo.gif'},
        {	name:'沙龙',id:'salon',url:'salon.hexun.com',logo:'http://img.hexun.com/2010/sylogo/salon_logo.gif'},
        {
            name:'财经博客',id:'fblog',url:'fblog.hexun.com',logo:'http://img.hexun.com/images2008/logo35.gif',
            children:
                [
                    {	name:'汽车博客群',id:'fblog',url:'fblog.hexun.com/autocar',logo:'http://img.hexun.com/images2008/blog_qc_logo.gif'},
                    {	name:'股票博客群',id:'fblog',url:'fblog.hexun.com/gupiao',logo:'http://img.hexun.com/images2008/blog_gp_logo.gif'},
                    {	name:'投资博客群',id:'fblog',url:'fblog.hexun.com/touzi',logo:'http://img.hexun.com/images2008/blog_tz_logo.gif'},
                    {	name:'读书博客群',id:'fblog',url:'fblog.hexun.com/shu',logo:'http://img.hexun.com/images2008/blog_ds_logo.gif'},
                    {	name:'房产博客群',id:'fblog',url:'fblog.hexun.com/fang',logo:'http://img.hexun.com/images2008/blog_fc_logo.gif'},
                    {	name:'IT博客群',id:'fblog',url:'fblog.hexun.com/itit',logo:'http://img.hexun.com/images2008/blog_it_logo.gif'}
                ]
        },
        {
            name:'股票',id:'stock',url:'stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/stock_logo.gif',
            children:
                [	{	name:'315',id:'stock',url:'315.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/stock_logo.gif'},
                    {	name:'港股',id:'stock',url:'stock.hexun.com/hkstock',logo:'http://img.hexun.com/2010/sylogo/hk_stock_logo.gif'},
                    {	name:'港股',id:'stock',url:'hk.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/hk_stock_logo.gif'},
                    {	name:'港股',id:'stock',url:'hkquote.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/hk_stock_logo.gif'},
                    {	name:'创业板',id:'stock',url:'quote.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/cybcn_logo.gif'},
                    {	name:'创业板',id:'stock',url:'stock.hexun.com/cybcn',logo:'http://img.hexun.com/2010/sylogo/cybcn_logo.gif'},
                    {	name:'美股',id:'stock',url:'stock.hexun.com/usstock',logo:'http://img.hexun.com/2010/sylogo/usstock_logo.gif'},
                    { name:'新股',id:'stock',url:'stock.hexun.com/newstock',logo:'http://img.hexun.com/2010/sylogo/newstock_logo.gif'},
                    { name:'新三板',id:'stock',url:'stock.hexun.com/sanban-list',logo:'http://img.hexun.com/2010/sylogo/sanban_logo.gif'},
                    { name:'新三板',id:'stock',url:'stock.hexun.com/sanban',logo:'http://img.hexun.com/2010/sylogo/sanban_logo.gif'},
                    { name:'股票',id:'stock',url:'datainfo.hexun.com'},
                    { name:'数据',id:'data',url:'datainfo.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/datainfo_stock_logo.gif'},
                    { name:'资金流向',id:'vol_stock',url:'vol.stock.hexun.com',logo:'http://img.hexun.com/2010/logo/vol_stock_logo.gif'},
                    { name:'百度财经',id:'stock',url:'wizard.stock.hexun.com',logo:'http://img.hexun.com/images2008/logo_lcfw.gif'},
                    { name:'大宗交易',id:'dzjy_stock',url:'stockdata.stock.hexun.com/dzjy',logo:'http://img.hexun.com/2010/sylogo/dzjy_logo.gif'},
                    { name:'融资融券',id:'rzrq_stock',url:'stockdata.stock.hexun.com/rzrq',logo:'http://img.hexun.com/2010/sylogo/rzrq_logo.gif'},
                    { name:'机构持仓',id:'jgcc_stock',url:'stockdata.stock.hexun.com/jgcc',logo:'http://img.hexun.com/2010/sylogo/jgcc.gif'},
                    { name:'龙虎榜',id:'lhb_stock',url:'stockdata.stock.hexun.com/lhb',logo:'http://img.hexun.com/2010/sylogo/lhb_logo.gif'},
                    { name:'主力控盘',id:'zlkp_stock',url:'stockdata.stock.hexun.com/zlkp',logo:'http://img.hexun.com/2010/sylogo/zlkp_logo.gif'},
                    { name:'公司资料',id:'gszl_stock',url:'stockdata.stock.hexun.com/gszl',logo:'http://img.hexun.com/2010/sylogo/gszl_logo.gif'},
                    { name:'高管增减持',id:'ggzjc_stock',url:'stockdata.stock.hexun.com/ggzjc',logo:'http://img.hexun.com/2010/sylogo/ggzjc_logo.gif'},
					{ name:'美股行情', id: 'stock_us', url: 'stockdata.stock.hexun.com/us', logo: 'http://img.hexun.com/2014/zk/stockdata_stockus_logo.jpg' },
                    { name:'全球股指',id:'global_stock',url:'stockdata.stock.hexun.com/qqgz',logo:'http://img.hexun.com/2010/sylogo/global_stock.gif'},
                    { name:'个股资料',id:'stockdata_stock',url:'stockdata.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/stockdata_stock_logo.gif'},
                    { name:'个股资料',id:'focus_stock',url:'focus.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/stockdata_stock_logo.gif'},
                    { name:'券商',id:'qs_stock',url:'stock.hexun.com/quanshang',logo:'http://img.hexun.com/2010/sylogo/qs_logo.gif'},
                    { name:'券商',id:'qs_stock',url:'data.quanshang.hexun.com',logo:'http://img.hexun.com/2010/sylogo/qs_logo.gif'},
                    {	name:'研报',id:'yanbao_stock',url:'yanbao.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/yanbao_logo.gif'},
                    { name:'千股宝典',id:'qgwp',url:'qgwp.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/nc_stock_logo.gif'}
                ]
        },
        {
            name:'IT',id:'it',url:'it.hexun.com',logo:'http://img.hexun.com/images2008/logo15.gif',
            children:
                [
                    {	name:'IT',id:'it',url:'it.news.hexun.com'}
                ]
        },
        {
            name:'房产',id:'house',url:'house.hexun.com',logo:'http://img.hexun.com/2010/sylogo/house_logo.gif',

            children:
                [
                    { name:'房产',id:'house',url:'house.news.hexun.com'},
                    { name:'华东房产',id:'huadong',url:'huadong.house.hexun.com',logo:'http://img.hexun.com/images2008/logo_hdhouse.gif'},

                    { name:'房产',id:'house',url:'house.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {
            name:'评论',id:'opinion',url:'opinion.hexun.com',logo:'http://img.hexun.com/2010/sylogo/opinion_logo.gif',
            children:
                [
                    {	name:'评论',id:'opinion',url:'opinion.news.hexun.com'},
                    {	name:'专栏',id:'opinion',url:'opinion.hexun.com/zhuanlan',logo:'http://img.hexun.com/2010/sylogo/zl_logo.gif'}
                ]
        },
        {
            name:'汽车',id:'auto',url:'auto.hexun.com',logo:'http://img.hexun.com/2010/sylogo/auto_logo.gif',
            children:
                [
                    {	name:'汽车',id:'auto',url:'auto.news.hexun.com'},
                    {	name:'汽车',id:'auto',url:'auto.hexun.com/2011/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'新闻',id:'news',url:'news.hexun.com',logo:'http://img.hexun.com/2010/sylogo/news_logo.gif',
            children:
                [
                    {	name:'新闻',id:'news',url:'news.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        { name:'金融营销',id:'market',url:'market.hexun.com',logo:'http://img.hexun.com/2010/sylogo/market_logo.gif'},
        { name:'视频课堂',id:'room',url:'room.hexun.com',logo:'http://img.hexun.com/2010/sylogo/room_logo.gif'},
        { name:'财经公司',id:'gongsi',url:'gongsi.hexun.com',logo:'http://img.hexun.com/2010/sylogo/gongsi_logo.gif'},
        { name:'财经舆情',id:'yuqing',url:'yuqing.hexun.com',logo:'http://img.hexun.com/2010/sylogo/yuqing_logo.gif'},
        { name:'互联网金融',id:'iof',url:'iof.hexun.com',logo:'http://img.hexun.com/2010/cphead/iof_logo.gif'},
		{ name:'财富速递',id:'cfsd',url:'cfsd.hexun.com',logo:''},
		{ name:'产业链',id:'industry',url:'industry.hexun.com',logo:'http://img.hexun.com/2010/sylogo/industry_logo.gif'},
		{ name:'p2p',id:'p2p',url:'p2p.hexun.com',logo:'http://img.hexun.com/2014/zk/20141106/p2p.gif'}
    ]

var temp_str=''+document.location;
//temp_str='http://corp.hexun.com/partner/';


var temp_obj=document.getElementById('subChannelLogo');
for(var i=0;i<channel.length;i++)
{
    var N_channel=channel[i]
    if(N_channel.children)
    {
        var finded=false
        finded=matchChild(N_channel,N_channel.children)
        if(finded) break
    }
    if(temp_str.indexOf(N_channel.url)>-1)
    {
        try{
            temp_obj.href='http://'+N_channel.url;
            temp_obj.getElementsByTagName('img')[0].src=N_channel.logo;
            temp_obj.getElementsByTagName('img')[0].alt=N_channel.name;
        }catch(exxxx){}
        appendCheck(N_channel);
        break;
    }

}

function matchChild(N_channel,children)
{
    for(var i=0;i<children.length;i++)
    {
        if(temp_str.indexOf(children[i].url)>-1)
        {//20110201对图片频道图片链接地址及alt单独处理添加if..else判断
            if(temp_str.substring(temp_str.length-4,temp_str.length)=="/pic"||temp_str.substring(temp_str.length-5,temp_str.length)=="/pic/"){
                temp_obj.href='http://pic.hexun.com';
                temp_obj.getElementsByTagName('img')[0].alt="图片";
            }else{
                temp_obj.href='http://'+children[i].url;
                temp_obj.getElementsByTagName('img')[0].alt=children[i].name;
            }
            var myLogo=(children[i].logo)?children[i].logo:N_channel.logo;
            temp_obj.getElementsByTagName('img')[0].src=myLogo;
            appendCheck(children[i])
            return true;
        }
    }
}

function appendCheck(channel_x)
{
    try
    {
        temp_obj=document.getElementById('hexunUserSuggest');
        temp_obj.href+='?id='+channel_x.id;
        if(document.getElementById('hexunUserContact')){
            document.getElementById('hexunUserContact').href=temp_obj.href;
        }
        if(channel_x.id=="cfsd"){
            temp_obj.firstChild.data=channel_x.name+'恭候您的意见';
        }if(channel_x.id=="calendar"){
        temp_obj.firstChild.data=channel_x.name+'产品恭候您的意见';
    }else{
        temp_obj.firstChild.data=channel_x.name+'频道恭候您的意见';
    }
    }
    catch (exc)
    {}
}
//科技频道单独处理101108
function techLoge(){
    var sId=document.getElementById("sLogo");
    if(sId!=null){
        if(temp_str.indexOf("digi.hexun.com/ehome")>=0){
            sId.src="http://img.hexun.com/2010/sylogo/kj_jd.gif";
        }
        if(temp_str.indexOf("digi.hexun.com/mobile")>=0){
            sId.src="http://img.hexun.com/2010/sylogo/kj_sj.gif";
        }
        if(temp_str.indexOf("digi.hexun.com/pc")>=0){
            sId.src="http://img.hexun.com/2010/sylogo/kj_zj.gif";
        }
    }
}
//高清组图正文页logo,alt,url匹配110117
if( typeof(_hx_hd_pic_logo)!="undefined" && _hx_hd_pic_logo!=null){
    var _hx_hd_Nid=document.getElementById("subChannelLogo");
    var _hx_hd_id=document.getElementById("subChannelLogo").getElementsByTagName("img")[0];
    if(_hx_hd_pic_logo=="news" &&temp_str.indexOf("news.hexun.com")>=0 ){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="图片";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("money.hexun.com")>=0 && _hx_hd_pic_logo=="money"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="图片";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("gold.hexun.com")>=0 && _hx_hd_pic_logo=="gold"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="图片";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("auto.hexun.com")>=0 && _hx_hd_pic_logo=="auto"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="图片";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("book.hexun.com")>=0 && _hx_hd_pic_logo=="book"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="图片";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("bschool.hexun.com")>=0 && _hx_hd_pic_logo=="bschool"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="图片";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("tech.hexun.com")>=0 && _hx_hd_pic_logo=="tech"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="图片";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("house.hexun.com")>=0 && _hx_hd_pic_logo=="house"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="图片";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("lux.hexun.com")>=0 && _hx_hd_pic_logo=="lux"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="图片";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("pic.bbs.hexun.com")>=0 && _hx_hd_pic_logo=="bbs"){
        _hx_hd_id.src="http://img.tool.hexun.com/sqhead/img/lt_logo.jpg";
        _hx_hd_id.alt="图片";
        _hx_hd_Nid.href="http://pic.bbs.hexun.com";
    }
}
