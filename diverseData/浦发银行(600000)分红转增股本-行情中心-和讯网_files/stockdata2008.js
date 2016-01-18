// JScript 文件
// Create by aaron 2008-11-12
// 个股页面改版
// 一些零散的页面js代码

//跳转到第几页
function goPage(maxpagecount,url) {
  var inputpageObj = document.getElementById("textfield");
  var inputpage = document.getElementById("textfield").value;
  inputpage = parseInt(inputpage);
  maxpagecount = parseInt(maxpagecount);
  
  if ((inputpage>0)&&(inputpage<=maxpagecount)) {
    var turl = "";
    var sign = "?";
    if ( url.indexOf(sign) >-1 )
		turl = url + "&page=" + inputpage.toString();
	else
		turl = url + "?page=" + inputpage.toString();
    window.location = turl;    
  } else {
    alert("您输入的页数错误，请重新输入");
    inputpageObj.value = "";
    return;
  }
}


//跳转到第几页
function goPageNew(maxpagecount,url,param) {
  var inputpageObj = document.getElementById("textfield");
  var inputpage = document.getElementById("textfield").value;
  inputpage = parseInt(inputpage);
  maxpagecount = parseInt(maxpagecount);
  
  if ((inputpage>0)&&(inputpage<=maxpagecount)) {
    var turl = "";
    var sign = "&";
    if ( url.indexOf(sign) >-1 )
			turl = url + "&page=" + inputpage.toString() + param;
		else
			turl = url + "?page=" + inputpage.toString() + param;
    window.location = turl;    
  } else {
    alert("您输入的页数错误，请重新输入");
    inputpageObj.value = "";
    return;
  }
}


//--------------------------------------------------------------------------------------------------------------

//获取左侧导航链接 include\caidan.htm 参数：个股代码 stockcode	
function SetLeftMenu_stockcode()
{
	try 
	{		
		//如果url 参数stockid不 存在，则从隐藏控件 获取stockcode
		var code = getStockCode();
		if (code != null && code != "")
		{
			//转换数字？？			
		}
		else
			//默认股票代码
			code = "000001";		
		
		//	
		//if (code == "000001")	
		//	return;
			
		var aObj = document.getElementsByName("A_leftmenuHref");	
		for(var i=0; i<aObj.length; i++)
		{
			aObj[i].href += "?stockid=" + code;
		}
	}
	catch(e){}	
}

		
function getStockCode_old()
{
	return getParm("stockid=");
}

function getStockCode()
{
	//return getParm("stockid=");
	return document.getElementById("inc_leftmenuHidden").value;
}


//获取url某个参数
function getParm(parm)
{
    parm = parm.toLowerCase();//小写;
    var str = "";
	var src = document.location.href.toLowerCase();//小写;		
	var I = -1;
	var sign = "&";
	
	//如果有多个参数
	if (src.indexOf(sign) > -1)
	{
	    var ary = src.split(sign);
	    var i;
	    for(i=0; i<ary.length; i++)
	    {
	        //获取包含指定参数值
	        I = ary[i].indexOf(parm);	        
	        if (I > -1)
	        {
	            //alert(ary[i].substr(I + parm.length, ary[i].length - I));	        
	            I = I + parm.length;   //parm=value
	            str = ary[i].substr(I, ary[i].length - I);
	            break;
	        }
	    }
	}
	else
	{
	    //处理只有一个参数
	    if (src.indexOf(parm) > -1)
	        I = src.indexOf(parm);
    	    
	    if (I > -1)
	    {
	        I = I + parm.length;
		    str = src.substr(I, src.length - I);						
	    }
	}
	return str;
}




//获取行业新闻url数据请求class
//dataArr = "http://ggzx.stock.hexun.com/more.jsp?t=2&amp;s=2&amp;k=8730";HYListPage.GetData(dataArr);
HYRequest = new function(){
	this.scriptid ="HYRequest";
	this.url = "http://stockdata.stock.hexun.com/2008/DefaultDataOutput.aspx?ColumnId=9001";
	this.stockcode = "000001";

	this.CreateLink = function()
	{
		var request = this.url + "&";
		request += "&stockid=" + this.stockcode;
		return request;
	}	
	this.Request = function()
	{
		Common.AppendDataArray(this.scriptid,this.CreateLink());
	}
	this.SetStockCode = function(st)
	{
		this.stockcode = st;
		this.Request();
	}
}

//
HYListPage = new function(){
	this.dataArray = null;//股票数据数组
	this.divName = "HYListPage";//输出容器ID
	
	this.GetData = function(data)
	{
		this.dataArray = data;
		this.LoadData();//加载主市场
	}

	this.LoadData = function() {
		if (this.dataArray.length >0)
		{
			//
			var aObj = document.getElementsByName("hyurl");	
			for(var i=0; i<aObj.length; i++)
			{
				aObj[i].href += this.dataArray;
			}
		}
	}
}


function writecookie(cookieName,currentStock){
	//deleteSubCookie("hxck_webdev1_general", cookieName);
	var stockList = getSubCookie("hxck_webdev1_general", cookieName);
	
	if(stockList==""||stockList==null){
		addSubCookie("hxck_webdev1_general",cookieName,currentStock);//
	}
	else if(stockList.split('|').length>0){
		var stockCount=stockList.split('|').length;
		if(stockList.indexOf(currentStock)<0)	{
			if(stockCount<10)
			{
				stockList=currentStock + "|" + stockList;
				updateSubCookie("hxck_webdev1_general",cookieName,stockList);
			}
			else
			{
				stockList=stockList.substring(0,stockList.lastIndexOf("|"));
				stockList=currentStock + "|" + stockList;
				updateSubCookie("hxck_webdev1_general",cookieName,stockList);
			}
		}else{
			var positionIndex = stockList.indexOf(currentStock) ;
			if(positionIndex != 0){
				var replaceString = stockList.substring(positionIndex-1,positionIndex+8);
				stockList = stockList.replace(replaceString,"");
				stockList = currentStock + "|" + stockList;
				updateSubCookie("hxck_webdev1_general",cookieName,stockList);
			}
		}
	}
}



function gubaExpress(code)
{
	var url="http://guba.hexun.com/AddArticleByCode.aspx?code="+code;
	window.open(url,"","menubarbar=no,toolbar=no");
}

//--------------------------------------------------------------------------------------------------------------