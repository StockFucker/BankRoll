// JScript �ļ�
// Create by aaron 2008-11-12
// ����ҳ��İ�
// һЩ��ɢ��ҳ��js����

//��ת���ڼ�ҳ
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
    alert("�������ҳ����������������");
    inputpageObj.value = "";
    return;
  }
}


//��ת���ڼ�ҳ
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
    alert("�������ҳ����������������");
    inputpageObj.value = "";
    return;
  }
}


//--------------------------------------------------------------------------------------------------------------

//��ȡ��ർ������ include\caidan.htm ���������ɴ��� stockcode	
function SetLeftMenu_stockcode()
{
	try 
	{		
		//���url ����stockid�� ���ڣ�������ؿؼ� ��ȡstockcode
		var code = getStockCode();
		if (code != null && code != "")
		{
			//ת�����֣���			
		}
		else
			//Ĭ�Ϲ�Ʊ����
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


//��ȡurlĳ������
function getParm(parm)
{
    parm = parm.toLowerCase();//Сд;
    var str = "";
	var src = document.location.href.toLowerCase();//Сд;		
	var I = -1;
	var sign = "&";
	
	//����ж������
	if (src.indexOf(sign) > -1)
	{
	    var ary = src.split(sign);
	    var i;
	    for(i=0; i<ary.length; i++)
	    {
	        //��ȡ����ָ������ֵ
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
	    //����ֻ��һ������
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




//��ȡ��ҵ����url��������class
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
	this.dataArray = null;//��Ʊ��������
	this.divName = "HYListPage";//�������ID
	
	this.GetData = function(data)
	{
		this.dataArray = data;
		this.LoadData();//�������г�
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