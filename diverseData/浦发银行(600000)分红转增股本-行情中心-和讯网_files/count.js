/*---------------------------------------- 
 *  (c) 2008-08-12 By Zhaobo Modify
/*---------------------------------------*/
var inIframeFlag = false;
try{
	if(top.location!=self.location){
		inIframeFlag = true;//alert("i am count.js,in iframe");
	}
}catch(e){}
/*****************[logview]*****************/
//count news pv
function _urlFilterQueryStr(_ourplusCountUrl){
	_ourplusCountUrl = unescape(_ourplusCountUrl);
	if(_ourplusCountUrl.indexOf("pic.bbs.hexun.com")!=-1){
		return escape(_ourplusCountUrl);
	}
	if(_ourplusCountUrl.indexOf("news.hexun.vnet.cn")!=-1){
		return escape(_ourplusCountUrl);
	}
	if(_ourplusCountUrl.indexOf("nc.stock.hexun.com")!=-1){
		return escape(_ourplusCountUrl);
	}
	if(_ourplusCountUrl.indexOf("hk.stock.hexun.com")!=-1){
		return escape(_ourplusCountUrl);
	}
	if(_ourplusCountUrl.indexOf("msn.gold.hexun.com")!=-1){
		return escape(_ourplusCountUrl);
	}
	var _urlsplitflag = _ourplusCountUrl.indexOf("?");
	if(_urlsplitflag!=-1){
		_ourplusCountUrl = _ourplusCountUrl.substring(0,_urlsplitflag);
	}
	var _checkDot = "\\.";
	var _checkReg = new RegExp(_checkDot,"g");
	var _checkCount = _ourplusCountUrl.match(_checkReg);
	if(_checkCount.length>3){
		_countFlag = false;
	}
	return escape(_ourplusCountUrl);
}
function _urlFilter(_ourplusCountUrl){
	var _urlsplitflag = _ourplusCountUrl.lastIndexOf("/")+1; 
	var _urlFirstHalf = _ourplusCountUrl.substring(0,_urlsplitflag);
	var _urlSecontHalf = _ourplusCountUrl.substring(_urlsplitflag);
	if(_urlSecontHalf=="" || _urlSecontHalf.indexOf("scroll")!=-1 
	   || _urlSecontHalf.indexOf("index-")!=-1 || _urlSecontHalf.indexOf("#")!=-1){
		_ourplusCountUrl = _urlFirstHalf+"index.html";
		return _ourplusCountUrl;
	}
	var reg = /(\d+)(\_\d+)\.html/ig;
	if(reg.test(_urlSecontHalf)){
		_urlSecontHalf = _urlSecontHalf.replace(/(\d+)(\_\d+)\.html/ig,"$1")+".html"
		_ourplusCountUrl = _urlFirstHalf+_urlSecontHalf;
	}
	return _ourplusCountUrl;
}
var _countFlag = true;
var _ourplusCountPage = "http://log.tool.hexun.com/count.jsp";
try{var _ourplusPageurl = escape(top.location.href);}catch(e){var _ourplusPageurl = escape(location.href);}
_ourplusPageurl = _urlFilter(_urlFilterQueryStr(_ourplusPageurl));
var _ourplusCountUrl = _ourplusCountPage + "?pageurl=" + _ourplusPageurl + "&timemark=" + (new Date()).getTime();
try{
	if(_outplusFlag != 1 && _countFlag && !inIframeFlag){
		document.write("<script src='" + _ourplusCountUrl + "'></"+"script>");
	}
}catch(e){
	document.write("<script src='" + _ourplusCountUrl + "'></"+"script>");
}
var _outplusFlag = 1;

//single news status
var _newsUrlStatusPage = "http://logview.cms.hexun.com/status.jsp";
function _urlStatus(_ourplusCountUrl){
	if(_ourplusCountUrl.indexOf("status")==-1)return;
	var _urlSuffixHalf = _ourplusCountUrl.substring(_ourplusCountUrl.length-6);	
	if(_urlSuffixHalf=='status'){
		top.location=_newsUrlStatusPage+"?newsurl="+_ourplusCountUrl.substring(0,_ourplusCountUrl.length-7);
	}
}
try{var _ourplusPageurl = top.location.href;}catch(e){var _ourplusPageurl = location.href;}
_urlStatus(_ourplusPageurl);

/*****************[count]*****************/
//mis pv count

articleDate=new Date();
articleUrl=document.location.href;
articleS=articleUrl.indexOf(".html");
articleid="";
/** modify by renbw 20120305
if( articleS!=-1 ){  
	tempArr=articleUrl.split('/');
	tempStr=tempArr[tempArr.length-1];
	index=tempStr.indexOf(".html");
	articleid=tempStr.substr(0,index);
	if(parseInt(articleid)==articleid && eval("'"+parseInt(articleid)+"'.length")==articleid.length && !inIframeFlag){
		document.write("<img src='http://count.tool.hexun.com/count.aspx?siteid=1&id="+articleid+"&time="+articleDate.getTime()+"&url="+articleUrl+"' height=0>");
	}
	if(parseInt(articleid)!=articleid || eval("'"+parseInt(articleid)+"'.length")!=articleid.length && !inIframeFlag){
		var flag = articleid.indexOf("_");
		if(flag>0){
			articleid = articleid.substr(0,articleid.indexOf("_"));
		}else{
			articleid = articleid.substr(0,articleid.indexOf("-"));
		}
		document.write("<img src='http://count.tool.hexun.com/count.aspx?siteid=1&id="+articleid+"&time="+articleDate.getTime()+"&url="+articleUrl+"' height=0>");
	}
}
**/
