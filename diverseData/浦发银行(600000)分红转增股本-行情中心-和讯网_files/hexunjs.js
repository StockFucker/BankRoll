// search
function ch_w(str)
{
  if(str=="新闻"|| str=="博客")
  {
	document.hexun_search.wf.value="2";
  }

}
function prepare_It()
{
if(document.getElementById('rdinfo').checked==true){
	document.hexun_search.sw.value=document.hexun_search.tempsw.value; 
	document.hexun_search.action = "http://news.search.hexun.com/forinfosearch.aspx";
}
if(document.getElementById('rdstock').checked==true||document.getElementById('rdfunds').checked==true){
	document.hexun_search.sw.value=document.hexun_search.tempsw.value;
	document.hexun_search.action = "http://search.hexun.com/forwikiSearch.aspx";
}
if(document.getElementById('blog').checked==true){
	document.hexun_search.sw.value=document.hexun_search.tempsw.value;
	document.hexun_search.action = "http://news.search.hexun.com/cgi-bin/search/blog_search.cgi";
}
}
function click_Search(){
    if(document.hexun_search.tempsw.value!=""){
	prepare_It();
    	document.hexun_search.submit();
    }else{
	alert("请输入检索关键词");
    }
}
function check_It(){
    if(document.hexun_search.tempsw.value!="")
    {
		prepare_It();

    }else{
		alert("请输入检索关键词");
		return false;
    }	
}
//财经要闻、时事要闻标签切换
function SwitchNewsTag(id,num,count)
{
	ClearTagClass(id,count);
	document.getElementById("tagname_" + id + num).className = "tagf";
	document.getElementById(id + num).style.display = "";
}
function ClearTagClass(id,count)
{
	for(i=1;i<=count;i++)
	{
		document.getElementById("tagname_" + id + i).className = "tagn";
		document.getElementById(id + i).style.display = "none";
	}
}
// 股吧搜索
function StockBar_Submit()
{
	var swValue = document.getElementById("search_word").value;		
	if(swValue == "" || swValue==null)
	{
		alert("请输入查询条件");
		return false;
	}		
	else
	{
		//var url = "http://bar.hexun.com/PostSearch.aspx?sw=" + swValue + "&radiobutton=1";		
		var url = "http://guba.hexun.com/search/ResultAll.aspx?sw=" + swValue + "&radiobutton=1";		
		window.open(url);
	}
}
//交友查询
function CheckSubmit()
{
	if( findfrm.zone.value == '')
	{
		alert("省份不能为空");
		return false;
	}
}
//工具下拉框
function OpenSelected(url)
{
	if(url != "" && url != null)
	{
		window.open(url);
	}
}
//财经百科搜索
function WikiSearchCheck()
{
	if(document.getElementById("wiki_search").value!="")
	{
		var url = "http://wiki.hexun.com/wikisearch.aspx?sw=" + document.getElementById("wiki_search").value;
		window.open(url);
	}
	else
	{
		alert("请输入检索关键字");
		return false;
	}
}

/*-------------------------------------------------------------------------------------------
**********************************************************************************************
**********************************************************************************************
**********************************************************************************************
**********************************************************************************************
-----------------------------------09-30--------------------------------------------------***/

var defaultMessage=new Array('股票/基金的代码或简称','股票代码或简称','新闻关键字','博文关键词或博主名字')
var radios_x=document.getElementsByName("whichDB")
function wrDefault(my_obj)
	{
		var messageObj=document.getElementById("textMessage")
		var change=false;
		for(var i=0; i<radios_x.length; i++)
			{
				if(messageObj.value==defaultMessage[i])
				{ change=true;break}
			}
		if(change==false && messageObj.value!="")
			{
				return;	
			}
		for(var i=0; i< radios_x.length; i++)
			{
				if(my_obj==radios_x[i])
				messageObj.value=defaultMessage[i]
			}
	}

function clearDefault(my_obj)
	{
		var ret=false;
		for(var i=0;i<defaultMessage.length;i++)
		{
			if(my_obj.value==defaultMessage[i])
				ret=true;
		}
		if(ret)
			my_obj.value=""
	}

function submitForm_x()
	{
		var submit_info=document.getElementById("textMessage").value
		var my_form=document.hexunsearch
		var myNum=0;
		for(var i=0; i< radios_x.length; i++)
			{
				if(radios_x[i].checked)
				myNum=i;
			}
		changeAction( myNum,submit_info,my_form);
		checkSubmit ( myNum,submit_info,my_form);
	}
function isNumber(str)
	{
		if(''==str){
			return false;
		}
		var reg= /\D/;
		return str.match(reg)==null;
	}		
function changeAction(myNum,submit_info,my_form)
	{
		if(myNum==0)
			{ 
				//my_form.action="http://data.stock.hexun.com/search/default.aspx";
				my_form.action="http://data.stock.hexun.com/search/default.aspx";
				document.getElementById("stockid").value=submit_info;
			}	
		if(myNum==1)
			{
				//my_form.action="http://guba.hexun.com/PostSearchNew.aspx?sw="+submit_info+"&radiobutton=1";
				//my_form.action="http://guba.hexun.com/search/ResultAll.aspx?sw="+submit_info+"&radiobutton=1";
				if(isNumber(submit_info)){
					my_form.action="http://t.hexun.com/g/"+submit_info+"_1.html";
				}else{
					my_form.action="http://t.hexun.com/k/topic.html?value="+submit_info;
				}
			}
		if(myNum==2)
			{
				my_form.action="http://news.search.hexun.com/infosearch.aspx?sw="+submit_info+"&wf=2";
				my_form.action="http://news.search.hexun.com/cgi-bin/search/info_search.cgi?key="+submit_info+"&f=0";
			}
		if(myNum==3)
			{
				my_form.action="http://news.search.hexun.com/cgi-bin/search/blog_search.cgi?key="+submit_info;
			}
	}
function checkSubmit(myNum,submit_info,my_form)
	{
		if(submit_info=="")
			{ alert('请填写查询信息');return false;}
		for(var i="0"; i< defaultMessage.length;i++)
			{
				if(submit_info==defaultMessage[i])
				{ alert('请填写查询信息');return false;}
			}
		if(myNum==0 || myNum==1 || myNum==3)
			{
				my_form.submit();
			}
		else
			{	
				window.open(my_form.action);
			}
	}
function BlogSearchCheck(type,num)
{
	if(document.getElementById(type).value!="")
	{
		document.getElementById("sw").value=document.getElementById(type).value; 
		if(num == 1)
		{
			document.hexunsearch.submit();
		}
		else
		{
			var url = "http://blog.search.hexun.com/forblogsearch.aspx?sw=" + document.getElementById(type).value + "&wf=2";
			window.open(url);
		}
	}
	else
	{
		alert("请输入博客关键字");
		return false;
	}	
}
