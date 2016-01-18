// JavaScript Document
//stadus有两种状态 ：stadus="show" 或者 stadus="hidden"
	var _menu=document.getElementById("menu");
	var _elementDT=_menu.getElementsByTagName("dt");
	var _elementDD=_menu.getElementsByTagName("dd");
	
	function showElementDD(ele){
		for(var i=0;i<ele.parentNode.childNodes.length;i++){
			if(ele.parentNode.childNodes[i].nodeName=="DD"){
				ele.parentNode.childNodes[i].style.display="block";
				}
			}
		}
	function hiddenElementDD(ele){
		for(var i=0;i<ele.parentNode.childNodes.length;i++){
			if(ele.parentNode.childNodes[i].nodeName=="DD"){
				ele.parentNode.childNodes[i].style.display="none";
				}
			}
		}
	function setElementDD(){
		for(var i=0;i<_elementDT.length;i++){
		  if(_elementDT[i].getAttribute("stadus")=="show"){
		  	showElementDD(_elementDT[i]);
		  	_elementDT[i].className='dt_open';
		  	}
		  if(_elementDT[i].getAttribute("stadus")=="hidden"){
		  	hiddenElementDD(_elementDT[i]);
		  	_elementDT[i].className='dt_closed';
		  	}	
			}
		}
		setElementDD();
	function setElementDtStadus(){
		for(var i=0;i<_elementDT.length;i++){
			_elementDT[i].onclick=function check(){
			
				var f = 0;
				//alert("关闭所有");
				//closeAllDT(this);
				
				//alert(this.getAttribute("stadus"));
				//alert(this.getAttribute("id"));
				if(this.getAttribute("stadus")=="show"){
					hiddenElementDD(this);
					this.setAttribute("stadus","hidden");
					this.className='dt_closed'
				}
				else
				{
						showElementDD(this);
						this.setAttribute("stadus","show");
						//alert(this.getAttribute("stadus"));
						//alert(this.getAttribute("id"));
						this.className='dt_open'
						f = 1;
				}
				
				closeAllDT(this,f);
			}
		}
	}
		//setElementDtStadus()
		
	function closeAllDT(ele,flag)
	{
		var index = -1;
		for(var i=0;i<_elementDT.length;i++)
		{
			hiddenElementDD(_elementDT[i]);
			_elementDT[i].className="dt_closed"
			_elementDT[i].setAttribute("stadus","hidden");
		}
		
		if (flag==0)
		{
			hiddenElementDD(ele);
			ele.setAttribute("stadus","hidden");
			ele.className='dt_closed'
		}
		else
		{
			showElementDD(ele);
			ele.setAttribute("stadus","show");
			ele.className = "dt_open";
		}
	}
		
		
		//------------------------------------------------------------------------------------------------------------------------------------
	function divShow()
	{
		//获取 <div id="menu">
		var divobj = document.getElementById("menu");
		if (divobj != null)
		{			
			//获取url			
			//var url = window.location.href.substring(0, window.location.href.indexOf(".aspx") + 5).toLowerCase();	
			var beginLen = window.location.href.indexOf("/2009")+1;
			var endLen = window.location.href.indexOf(".shtml") + 6; 
			var url = window.location.href.substring(beginLen,endLen).toLowerCase();	
			//alert(beginLen);
			//alert(endLen);
			if (beginLen==0) url = window.location.href;
			//alert(url);
			
			var count = divobj.childNodes.length;
			//alert(count);
			for(var i=0;i<count;i++)
			{
				//var dl = divobj.childNodes(i).tagName;
				var dl = divobj.childNodes[i];
				
				//兼容 firfox 和 IE:  http://www.css8.cn/blog/article.asp?id=16
				/*	在结构上，列表结构1和列表结构2不同的是列表结构1的子节点间有回车或者空格，换句说就是格式化代码了，而列表结构2则是合并为一行。
					原来，IE是将一个完整标签作为一个节点。而FF除了上述的的情况外，也把一个标签的结束符“>”到下一个标签的起始符“<”之间的内容（除注释外，包括任何的文字、空格、回车、制表符）也算是一个节点了。而且这种节点也有它们自己独特的属性和值－－nodeName="#text"。
					也许，平时我们在构建Web结构时特别喜欢格式化文档，而且也提倡这么做。但是一旦这样格式化结构，你会发现FF对于子节点集的计算就出问题，对于这个问题，关键是无法预知性。你不知道那个标签之间空格，哪些标签之间没有空格。于是在DOM遍历时就会产生麻烦了。如果说换行符、回车键也是节点，你相信吗，但是它是真的。
					也许，FF会认为只要你知道默认缩进格式化时，标签之间都有一个莫名其妙的节点，但是总会给用户带来不小的错觉和麻烦，因为FF的childNodes返回的不是真实的结构节点数
				*/
				if(dl.nodeType != 1) continue;	
				
				//为了兼容 firfox 和 IE 用 childNodes 代替 children
				//children 用法: var temp = dl.children;	temp.item[j].tagName;	
				var dd = dl.childNodes;
							
				for(var j=0;j<dd.length;j++)
				{
					//处理兼容 firfox 和 IE
					if(dd[j].nodeType != 1) continue;
					//获取 <a>对象
					var aObj = dd[j].childNodes;
					
					for(var m=0;m<aObj.length;m++)
					{
						//处理兼容 firfox 和 IE
						if(aObj[m].nodeType != 1) continue;
						
						//判断是否 是 <a> 链接
						if (aObj[m].tagName.toLowerCase() == "a")
						{
						
						//alert(aObj[m].href.toLowerCase());
								//alert(url);
							//是否 <a>链接 等于 url, 找到该标记，并设置为“显示”状态
							//if(aObj[m].href.toLowerCase().indexOf(url) > -1)
							
							//url = "2008/zcfz.aspx";
							if(aObj[m].href.toLowerCase().indexOf(url) > -1)
							{
								//alert(aObj[m].href.toLowerCase());
								var temp = aObj[m].id.replace("a_leftmenu_dt", "");
								var emdtid = temp.substring(0, temp.indexOf("_"));
								var elmdt = document.getElementById("leftmenu_dt" + emdtid);
								if (elmdt != null)
								{
									//alert(elmdt.id);									
									//alert(aObj[m].href.toLowerCase());
									elmdt.setAttribute("stadus","show");									
								}								
							}
						}
					}
				}	
			}
		}
		
		//设定状态
		setElementDD();
		
		//事件： 点击后重新 设定状态“展开”“关闭”
		setElementDtStadus();
	}
	
	//调用 展开、关闭状态
	divShow();