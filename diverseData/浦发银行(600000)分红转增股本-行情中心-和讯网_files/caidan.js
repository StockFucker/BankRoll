// JavaScript Document
//stadus������״̬ ��stadus="show" ���� stadus="hidden"
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
				//alert("�ر�����");
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
		//��ȡ <div id="menu">
		var divobj = document.getElementById("menu");
		if (divobj != null)
		{			
			//��ȡurl			
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
				
				//���� firfox �� IE:  http://www.css8.cn/blog/article.asp?id=16
				/*	�ڽṹ�ϣ��б�ṹ1���б�ṹ2��ͬ�����б�ṹ1���ӽڵ���лس����߿ո񣬻���˵���Ǹ�ʽ�������ˣ����б�ṹ2���Ǻϲ�Ϊһ�С�
					ԭ����IE�ǽ�һ��������ǩ��Ϊһ���ڵ㡣��FF���������ĵ�����⣬Ҳ��һ����ǩ�Ľ�������>������һ����ǩ����ʼ����<��֮������ݣ���ע���⣬�����κε����֡��ո񡢻س����Ʊ����Ҳ����һ���ڵ��ˡ��������ֽڵ�Ҳ�������Լ����ص����Ժ�ֵ����nodeName="#text"��
					Ҳ��ƽʱ�����ڹ���Web�ṹʱ�ر�ϲ����ʽ���ĵ�������Ҳ�ᳫ��ô��������һ��������ʽ���ṹ����ᷢ��FF�����ӽڵ㼯�ļ���ͳ����⣬����������⣬�ؼ����޷�Ԥ֪�ԡ��㲻֪���Ǹ���ǩ֮��ո���Щ��ǩ֮��û�пո�������DOM����ʱ�ͻ�����鷳�ˡ����˵���з����س���Ҳ�ǽڵ㣬�������𣬵���������ġ�
					Ҳ��FF����ΪֻҪ��֪��Ĭ��������ʽ��ʱ����ǩ֮�䶼��һ��Ī������Ľڵ㣬�����ܻ���û�������С�Ĵ�����鷳����ΪFF��childNodes���صĲ�����ʵ�Ľṹ�ڵ���
				*/
				if(dl.nodeType != 1) continue;	
				
				//Ϊ�˼��� firfox �� IE �� childNodes ���� children
				//children �÷�: var temp = dl.children;	temp.item[j].tagName;	
				var dd = dl.childNodes;
							
				for(var j=0;j<dd.length;j++)
				{
					//������� firfox �� IE
					if(dd[j].nodeType != 1) continue;
					//��ȡ <a>����
					var aObj = dd[j].childNodes;
					
					for(var m=0;m<aObj.length;m++)
					{
						//������� firfox �� IE
						if(aObj[m].nodeType != 1) continue;
						
						//�ж��Ƿ� �� <a> ����
						if (aObj[m].tagName.toLowerCase() == "a")
						{
						
						//alert(aObj[m].href.toLowerCase());
								//alert(url);
							//�Ƿ� <a>���� ���� url, �ҵ��ñ�ǣ�������Ϊ����ʾ��״̬
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
		
		//�趨״̬
		setElementDD();
		
		//�¼��� ��������� �趨״̬��չ�������رա�
		setElementDtStadus();
	}
	
	//���� չ�����ر�״̬
	divShow();