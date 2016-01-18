
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
var data_array=new Array('��','һ','��','��','��','��','��');
var temp_str=temp_date.getFullYear()+'��'+(temp_date.getMonth()+1)+'��'+temp_date.getDate()+'�� ����'+data_array[temp_date.getDay()];
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
        {	name:'ǧ�ɱ���',id:'nc',url:'nc.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/nc_stock_logo.gif'},
        {	name:'�ƾ�����',id:'calendar',url:'calendar.hexun.com',logo:'http://img.hexun.com/2010/sylogo/nc_stock_logo.gif'},
        {	name:'˰��',id:'tax',url:'tax.hexun.com/csdt/',logo:'http://img.hexun.com/2010/sylogo/tax_logo.gif'},
        {	name:'�û�����',id:'vip',url:'vip.hexun.com',logo:'http://img.hexun.com/2010/sylogo/vip_logo.gif'},
        {	name:'��ʱ����',id:'roll',url:'roll.hexun.com',logo:'http://img.hexun.com/2010/sylogo/roll_logo.gif'},
        {	name:'ͼƬ',id:'pic',url:'pic.hexun.com',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'},
        {	name:'����',id:'travel',url:'travel.hexun.com',logo:'http://img.hexun.com/travel/2013/img/sl_logo.gif'},
        {	name:'��Ѷ��ί',id:'gov',url:'gov.hexun.com',logo:'http://img.hexun.com/2010/sylogo/gov_logo.gif'},
        {	name:'��Ͷ',id:'pe',url:'pe.hexun.com',logo:'http://img.hexun.com/2010/sylogo/ct_logo.gif'},
        {	name:'����',id:'renwu',url:'renwu.hexun.com',logo:'http://img.hexun.com/2010/sylogo/rw_logo.gif'},
        {	name:'Ͷ��ѧԺ',id:'vip',url:'pxpt.hexun.com',logo:'http://img.hexun.com/2010/sylogo/tz_logo.gif'},
        {	name:'�ֻ�',id:'xianhuo',url:'xianhuo.hexun.com',logo:'http://img.hexun.com/2010/sylogo/xh_logo.gif'},
        {	name:'�ݳ�Ʒ',id:'lux',url:'lux.hexun.com',logo:'http://img.hexun.com/2010/sylogo/lux_logo.gif',

            children:
                [
                    {	name:'�ݳ�Ʒ',id:'lux',url:'lux.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'�߶���',id:'golf',url:'golf.hexun.com',logo:'http://img.hexun.com/images2008/logo04.gif'},
        {	name:'����',id:'topic',url:'topic.news.hexun.com',logo:'http://img.hexun.com/images2008/logo03.gif'},
        {	name:'����',id:'life',url:'life.news.hexun.com',logo:'http://img.hexun.com/images2008/logo10.gif'},
        {	name:'��վ��ͼ',id:'life',url:'news.hexun.com/sitemap/',logo:'http://img.hexun.com/2011/sitemap/img/logo_clh.gif'},
        {	name:'ʱ��Ҫ��',id:'sspd',url:'news.hexun.com/events/',logo:'http://img.hexun.com/2010/sylogo/sspd_logo.gif'},
        {	name:'�����г�',id:'xxsc',url:'news.hexun.com/qqxxsc/',logo:'http://img.hexun.com/2012/xxsclogo/xxsc_logo.jpg'},
        {	name:'�ղ�',id:'shoucang',url:'shoucang.hexun.com/',logo:'http://img.hexun.com/2010/sylogo/sc_logo.gif'},
        {	name:'����',id:'book',url:'book.hexun.com',logo:'http://img.hexun.com/2010/sylogo/book_logo.gif',
            children:
                [
                    {	name:'����',id:'book',url:'book.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'����',id:'book',url:'data.book.hexun.com',logo:'http://img.hexun.com/2010/sylogo/book_logo.gif'},
        {	name:'����',id:'mail',url:'mail.hexun.com',logo:'http://img.hexun.com/2010/sylogo/mail_logo.gif'},
        {	name:'��������',id:'mail',url:'corp.hexun.com',logo:'http://img.hexun.com/2010/sylogo/corp_logo.gif',
            children:
                [
                    {	name:'�������',id:'partner',url:'corp.hexun.com/partner/',logo:'http://img.hexun.com/2013/logo/partner.jpg'}
                ]
        },
        {	name:'�������',id:'mac',url:'mac.hexun.com',logo:'http://img.hexun.com/2010/sylogo/mac_logo.gif'},
        {	name:'������',id:'media',url:'media.hexun.com',logo:'http://img.hexun.com/2010/sylogo/media_logo.gif'},
        {	name:'���Ժ�',id:'a',url:'a.hexun.com',logo:'http://img.hexun.com/2010/sylogo/clh_logo.gif'},
        {	name:'����վ',id:'henan',url:'henan.hexun.com',logo:'http://img.hexun.com/2010/sylogo/hnz_logo.gif'},
        {	name:'����վ',id:'fujian',url:'fujian.hexun.com',logo:'http://img.hexun.com/2010/sylogo/fj_logo.gif'},
        {	name:'�Ĵ�վ',id:'sichuan',url:'sichuan.hexun.com',logo:'http://img.hexun.com/2010/sylogo/scz_logo.gif'},
        {	name:'ɽ��վ',id:'shandong',url:'shandong.hexun.com',logo:'http://img.hexun.com/2010/sylogo/sdz_logo.gif'},
        {	name:'����վ',id:'hunan',url:'hunan.hexun.com',logo:'http://img.hexun.com/2010/sylogo/hunz_logo.gif'},
		{	name:'����վ',id:'hubei',url:'hubei.hexun.com',logo:'http://img.hexun.com/2014/zk/201411/hubeilog.gif'},
        {	name:'�Ƽ�',id:'tech',url:'tech.hexun.com',logo:'http://img.hexun.com/2010/sylogo/tech_logo.gif'},
        {	name:'����վ',id:'jiangsu',url:'jiangsu.hexun.com',logo:'http://img.hexun.com/2010/sylogo/js_logo.gif',
            children:
                [
                    {	name:'�Ƽ�',id:'tech',url:'tech.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'��������',id:'quote',url:'quote.hexun.com',logo:'http://img.hexun.com/2010/sylogo/quote_logo.gif'},
        {	name:'��������',id:'quote',url:'r.hexun.com',logo:'http://img.hexun.com/2010/sylogo/r_logo.gif'},
        {	name:'����',id:'gongyi',url:'gongyi.hexun.com',logo:'http://img.hexun.com/2010/sylogo/gongyi_logo.gif'},
        {	name:'��Ӣ����',id:'jingying',url:'life.hexun.com',logo:'http://img.hexun.com/2010/sylogo/life_logo.gif'},
        {	name:'����',id:'quote',url:'expo2010.hexun.com',logo:'http://img.hexun.com/2010/sylogo/expo_logo.gif'},
        {	name:'����',id:'trust',url:'trust.hexun.com',logo:'http://img.hexun.com/2010/sylogo/trust_logo.gif'},
        {	name:'���ɷ���',id:'law',url:'law.hexun.com',logo:'http://img.hexun.com/2010/sylogo/law_logo.gif'},
        {	name:'����',id:'ceshi',url:'ceshi.hexun.com',logo:'http://img.hexun.com/2010/sylogo/ceshi_logo.gif'},
        {
            name:'ծȯ',id:'bond',url:'bond.hexun.com',logo:'http://img.hexun.com/2010/sylogo/bond_logo.gif',
            children:
                [
                    {	name:'ծȯ',id:'bond',url:'bond.money.hexun.com',logo:'http://img.hexun.com/2010/sylogo/bond_logo.gif'}
                ]
        },
        {	name:'��ָ�ڻ�',id:'stockfutures',url:'qizhi.hexun.com',logo:'http://img.hexun.com/2010/sylogo/qizhi_logo.gif'},
        {	name:'�ڻ�',id:'futures',url:'futures.hexun.com',logo:'http://img.hexun.com/2010/sylogo/futures_logo.gif',
            children:
                [
                    {	name:'�����ڻ�',id:'futures',url:'futures.hexun.com/globalfutures',logo:'http://img.hexun.com/2010/sylogo/globalfutures_logo.jpg'}
                ]
        },
        {	name:'�ֺ�',id:'dividend',url:'stockdata.stock.hexun.com/gsfh',logo:'http://img.hexun.com/2010/sylogo/fenhong_logo.gif'},
        {	name:'��ծ�ڻ�',id:'gzqh',url:'gzqh.hexun.com',logo:'http://img.hexun.com/2010/sylogo/futures_gzqh.gif'},
        {	name:'�ڻ�����',id:'quote_futures',url:'quote.futures.hexun.com',logo:'http://img.hexun.com/2010/sylogo/futures_logo.gif'},
        {	name:'��㾭����',id:'forexBroker',url:'forex.hexun.com/broker',logo:'http://img.hexun.com/2010/sylogo/broker_logo.jpg'},
        {	name:'���',id:'forex315',url:'315.forex.hexun.com',logo:'http://img.hexun.com/2010/sylogo/forex_logo.gif'},
        {	name:'���',id:'forex',url:'forex.hexun.com',logo:'http://img.hexun.com/2010/sylogo/forex_logo.gif'},
        {	name:'�������',id:'quote_forex',url:'quote.forex.hexun.com',logo:'http://img.hexun.com/2010/sylogo/forex_logo.gif'},
        {	name:'�ƽ�',id:'gold',url:'gold.hexun.com',logo:'http://img.hexun.com/2010/sylogo/gold_logo.gif',
            children:
                [
                    {	name:'�ƽ�T+D',id:'gold',url:'gold.hexun.com/2010/cmbc',logo:'http://img.hexun.com/2010/sylogo/gold_td_logo.gif'},
                    {	name:'�ƽ�',id:'gold',url:'gold.hexun.com/2011/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'},
                    {	name:'����',id:'gold',url:'gold.hexun.com/silver-test',logo:'http://img.hexun.com/2010/sylogo/silver_logo.gif'},
                    {	name:'����',id:'gold',url:'gold.hexun.com/silver',logo:'http://img.hexun.com/2010/sylogo/silver_logo.gif'}
                ]
        },
        {	name:'����',id:'insurance',url:'insurance.hexun.com',logo:'http://img.hexun.com/2010/sylogo/insurance_logo.gif'},
        {	name:'����',id:'insurance',url:'insurance.money.hexun.com',logo:'http://img.hexun.com/2010/sylogo/insurance_logo.gif'},//old domain
        {	name:'���',id:'data',url:'data.money.hexun.com',logo:'http://img.hexun.com/2010/sylogo/money_logo.gif'},//old domain
        {
            name:'����',id:'bank',url:'bank.hexun.com',logo:'http://img.hexun.com/2010/sylogo/bank_logo.gif',
            children:
                [
                    {	name:'���ÿ�',id:'bank',url:'bank.hexun.com/card',logo:'http://img.hexun.com/2010/sylogo/credit_logo.gif'},
                    {	name:'����',id:'bank',url:'bank.money.hexun.com'},
                    {	name:'����',id:'bank',url:'data.bank.hexun.com'}
                ]
        },
        {	name:'ͼ��',id:'tuba',url:'tuba.hexun.com',logo:'http://img.hexun.com/images2008/logo10.gif'},
        {	name:'���Ͻ�',id:'pension',url:'pension.hexun.com',logo:'http://img.hexun.com/2010/sylogo/ylj_logo.gif'},
        {
            name:'����',id:'funds',url:'funds.hexun.com',logo:'http://img.hexun.com/2010/sylogo/funds_logo.gif',
            children:
                [
                    {	name:'����',id:'funds',url:'funds.money.hexun.com'},
                    {   name:'�����ע��',id:'focus_funds',url:'focus.funds.hexun.com',logo:'http://img.hexun.com/fundsgzd/img/jjgzd.gif'},
                    {	name:'˽ļ����',id:'funds',url:'funds.hexun.com/smjj',logo:'http://img.hexun.com/2010/sylogo/private_logo.gif'}
                ]
        },
        {
            name:'���',id:'money',url:'money.hexun.com',logo:'http://img.hexun.com/2010/sylogo/money_logo.gif',
            children:
                [
                    {	name:'���',id:'money',url:'money.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'�������',id:'financeService',url:'lc.hexun.com',logo:'http://img.hexun.com/2010/sylogo/lc_logo.gif'},
        {	name:'����',id:'health',url:'health.hexun.com',logo:'http://img.hexun.com/images2008/logo16.gif'},
        {	name:'��ѧԺ',id:'bschool',url:'bschool.hexun.com',logo:'http://img.hexun.com/2010/sylogo/bschool_logo.gif',
            children:
                [
                    {	name:'��ѧԺ',id:'bschool',url:'bschool.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'��Ѷ��Ƶ',id:'tv',url:'tv.hexun.com',logo:'http://img.hexun.com/2010/sylogo/tv_logo.gif'},
        {	name:'ɳ��',id:'salon',url:'salon.hexun.com',logo:'http://img.hexun.com/2010/sylogo/salon_logo.gif'},
        {
            name:'�ƾ�����',id:'fblog',url:'fblog.hexun.com',logo:'http://img.hexun.com/images2008/logo35.gif',
            children:
                [
                    {	name:'��������Ⱥ',id:'fblog',url:'fblog.hexun.com/autocar',logo:'http://img.hexun.com/images2008/blog_qc_logo.gif'},
                    {	name:'��Ʊ����Ⱥ',id:'fblog',url:'fblog.hexun.com/gupiao',logo:'http://img.hexun.com/images2008/blog_gp_logo.gif'},
                    {	name:'Ͷ�ʲ���Ⱥ',id:'fblog',url:'fblog.hexun.com/touzi',logo:'http://img.hexun.com/images2008/blog_tz_logo.gif'},
                    {	name:'���鲩��Ⱥ',id:'fblog',url:'fblog.hexun.com/shu',logo:'http://img.hexun.com/images2008/blog_ds_logo.gif'},
                    {	name:'��������Ⱥ',id:'fblog',url:'fblog.hexun.com/fang',logo:'http://img.hexun.com/images2008/blog_fc_logo.gif'},
                    {	name:'IT����Ⱥ',id:'fblog',url:'fblog.hexun.com/itit',logo:'http://img.hexun.com/images2008/blog_it_logo.gif'}
                ]
        },
        {
            name:'��Ʊ',id:'stock',url:'stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/stock_logo.gif',
            children:
                [	{	name:'315',id:'stock',url:'315.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/stock_logo.gif'},
                    {	name:'�۹�',id:'stock',url:'stock.hexun.com/hkstock',logo:'http://img.hexun.com/2010/sylogo/hk_stock_logo.gif'},
                    {	name:'�۹�',id:'stock',url:'hk.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/hk_stock_logo.gif'},
                    {	name:'�۹�',id:'stock',url:'hkquote.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/hk_stock_logo.gif'},
                    {	name:'��ҵ��',id:'stock',url:'quote.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/cybcn_logo.gif'},
                    {	name:'��ҵ��',id:'stock',url:'stock.hexun.com/cybcn',logo:'http://img.hexun.com/2010/sylogo/cybcn_logo.gif'},
                    {	name:'����',id:'stock',url:'stock.hexun.com/usstock',logo:'http://img.hexun.com/2010/sylogo/usstock_logo.gif'},
                    { name:'�¹�',id:'stock',url:'stock.hexun.com/newstock',logo:'http://img.hexun.com/2010/sylogo/newstock_logo.gif'},
                    { name:'������',id:'stock',url:'stock.hexun.com/sanban-list',logo:'http://img.hexun.com/2010/sylogo/sanban_logo.gif'},
                    { name:'������',id:'stock',url:'stock.hexun.com/sanban',logo:'http://img.hexun.com/2010/sylogo/sanban_logo.gif'},
                    { name:'��Ʊ',id:'stock',url:'datainfo.hexun.com'},
                    { name:'����',id:'data',url:'datainfo.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/datainfo_stock_logo.gif'},
                    { name:'�ʽ�����',id:'vol_stock',url:'vol.stock.hexun.com',logo:'http://img.hexun.com/2010/logo/vol_stock_logo.gif'},
                    { name:'�ٶȲƾ�',id:'stock',url:'wizard.stock.hexun.com',logo:'http://img.hexun.com/images2008/logo_lcfw.gif'},
                    { name:'���ڽ���',id:'dzjy_stock',url:'stockdata.stock.hexun.com/dzjy',logo:'http://img.hexun.com/2010/sylogo/dzjy_logo.gif'},
                    { name:'������ȯ',id:'rzrq_stock',url:'stockdata.stock.hexun.com/rzrq',logo:'http://img.hexun.com/2010/sylogo/rzrq_logo.gif'},
                    { name:'�����ֲ�',id:'jgcc_stock',url:'stockdata.stock.hexun.com/jgcc',logo:'http://img.hexun.com/2010/sylogo/jgcc.gif'},
                    { name:'������',id:'lhb_stock',url:'stockdata.stock.hexun.com/lhb',logo:'http://img.hexun.com/2010/sylogo/lhb_logo.gif'},
                    { name:'��������',id:'zlkp_stock',url:'stockdata.stock.hexun.com/zlkp',logo:'http://img.hexun.com/2010/sylogo/zlkp_logo.gif'},
                    { name:'��˾����',id:'gszl_stock',url:'stockdata.stock.hexun.com/gszl',logo:'http://img.hexun.com/2010/sylogo/gszl_logo.gif'},
                    { name:'�߹�������',id:'ggzjc_stock',url:'stockdata.stock.hexun.com/ggzjc',logo:'http://img.hexun.com/2010/sylogo/ggzjc_logo.gif'},
					{ name:'��������', id: 'stock_us', url: 'stockdata.stock.hexun.com/us', logo: 'http://img.hexun.com/2014/zk/stockdata_stockus_logo.jpg' },
                    { name:'ȫ���ָ',id:'global_stock',url:'stockdata.stock.hexun.com/qqgz',logo:'http://img.hexun.com/2010/sylogo/global_stock.gif'},
                    { name:'��������',id:'stockdata_stock',url:'stockdata.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/stockdata_stock_logo.gif'},
                    { name:'��������',id:'focus_stock',url:'focus.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/stockdata_stock_logo.gif'},
                    { name:'ȯ��',id:'qs_stock',url:'stock.hexun.com/quanshang',logo:'http://img.hexun.com/2010/sylogo/qs_logo.gif'},
                    { name:'ȯ��',id:'qs_stock',url:'data.quanshang.hexun.com',logo:'http://img.hexun.com/2010/sylogo/qs_logo.gif'},
                    {	name:'�б�',id:'yanbao_stock',url:'yanbao.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/yanbao_logo.gif'},
                    { name:'ǧ�ɱ���',id:'qgwp',url:'qgwp.stock.hexun.com',logo:'http://img.hexun.com/2010/sylogo/nc_stock_logo.gif'}
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
            name:'����',id:'house',url:'house.hexun.com',logo:'http://img.hexun.com/2010/sylogo/house_logo.gif',

            children:
                [
                    { name:'����',id:'house',url:'house.news.hexun.com'},
                    { name:'��������',id:'huadong',url:'huadong.house.hexun.com',logo:'http://img.hexun.com/images2008/logo_hdhouse.gif'},

                    { name:'����',id:'house',url:'house.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {
            name:'����',id:'opinion',url:'opinion.hexun.com',logo:'http://img.hexun.com/2010/sylogo/opinion_logo.gif',
            children:
                [
                    {	name:'����',id:'opinion',url:'opinion.news.hexun.com'},
                    {	name:'ר��',id:'opinion',url:'opinion.hexun.com/zhuanlan',logo:'http://img.hexun.com/2010/sylogo/zl_logo.gif'}
                ]
        },
        {
            name:'����',id:'auto',url:'auto.hexun.com',logo:'http://img.hexun.com/2010/sylogo/auto_logo.gif',
            children:
                [
                    {	name:'����',id:'auto',url:'auto.news.hexun.com'},
                    {	name:'����',id:'auto',url:'auto.hexun.com/2011/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        {	name:'����',id:'news',url:'news.hexun.com',logo:'http://img.hexun.com/2010/sylogo/news_logo.gif',
            children:
                [
                    {	name:'����',id:'news',url:'news.hexun.com/pic',logo:'http://img.hexun.com/2010/sylogo/img_logo.gif'}
                ]
        },
        { name:'����Ӫ��',id:'market',url:'market.hexun.com',logo:'http://img.hexun.com/2010/sylogo/market_logo.gif'},
        { name:'��Ƶ����',id:'room',url:'room.hexun.com',logo:'http://img.hexun.com/2010/sylogo/room_logo.gif'},
        { name:'�ƾ���˾',id:'gongsi',url:'gongsi.hexun.com',logo:'http://img.hexun.com/2010/sylogo/gongsi_logo.gif'},
        { name:'�ƾ�����',id:'yuqing',url:'yuqing.hexun.com',logo:'http://img.hexun.com/2010/sylogo/yuqing_logo.gif'},
        { name:'����������',id:'iof',url:'iof.hexun.com',logo:'http://img.hexun.com/2010/cphead/iof_logo.gif'},
		{ name:'�Ƹ��ٵ�',id:'cfsd',url:'cfsd.hexun.com',logo:''},
		{ name:'��ҵ��',id:'industry',url:'industry.hexun.com',logo:'http://img.hexun.com/2010/sylogo/industry_logo.gif'},
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
        {//20110201��ͼƬƵ��ͼƬ���ӵ�ַ��alt�����������if..else�ж�
            if(temp_str.substring(temp_str.length-4,temp_str.length)=="/pic"||temp_str.substring(temp_str.length-5,temp_str.length)=="/pic/"){
                temp_obj.href='http://pic.hexun.com';
                temp_obj.getElementsByTagName('img')[0].alt="ͼƬ";
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
            temp_obj.firstChild.data=channel_x.name+'�����������';
        }if(channel_x.id=="calendar"){
        temp_obj.firstChild.data=channel_x.name+'��Ʒ�����������';
    }else{
        temp_obj.firstChild.data=channel_x.name+'Ƶ�������������';
    }
    }
    catch (exc)
    {}
}
//�Ƽ�Ƶ����������101108
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
//������ͼ����ҳlogo,alt,urlƥ��110117
if( typeof(_hx_hd_pic_logo)!="undefined" && _hx_hd_pic_logo!=null){
    var _hx_hd_Nid=document.getElementById("subChannelLogo");
    var _hx_hd_id=document.getElementById("subChannelLogo").getElementsByTagName("img")[0];
    if(_hx_hd_pic_logo=="news" &&temp_str.indexOf("news.hexun.com")>=0 ){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="ͼƬ";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("money.hexun.com")>=0 && _hx_hd_pic_logo=="money"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="ͼƬ";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("gold.hexun.com")>=0 && _hx_hd_pic_logo=="gold"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="ͼƬ";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("auto.hexun.com")>=0 && _hx_hd_pic_logo=="auto"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="ͼƬ";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("book.hexun.com")>=0 && _hx_hd_pic_logo=="book"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="ͼƬ";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("bschool.hexun.com")>=0 && _hx_hd_pic_logo=="bschool"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="ͼƬ";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("tech.hexun.com")>=0 && _hx_hd_pic_logo=="tech"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="ͼƬ";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("house.hexun.com")>=0 && _hx_hd_pic_logo=="house"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="ͼƬ";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("lux.hexun.com")>=0 && _hx_hd_pic_logo=="lux"){
        _hx_hd_id.src="http://img.hexun.com/2010/sylogo/img_logo.gif";
        _hx_hd_id.alt="ͼƬ";
        _hx_hd_Nid.href="http://pic.hexun.com";
    }
    if(temp_str.indexOf("pic.bbs.hexun.com")>=0 && _hx_hd_pic_logo=="bbs"){
        _hx_hd_id.src="http://img.tool.hexun.com/sqhead/img/lt_logo.jpg";
        _hx_hd_id.alt="ͼƬ";
        _hx_hd_Nid.href="http://pic.bbs.hexun.com";
    }
}
