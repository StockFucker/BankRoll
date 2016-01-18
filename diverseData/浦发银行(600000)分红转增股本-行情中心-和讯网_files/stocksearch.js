
var Suggest = 
{
	url: "http://data.stock.hexun.com/include/ajax_search.aspx?key=",
	obj: document.getElementById("ajaxinput"),
	ajaxobj: document.getElementById("ajaxdiv"),
	element: null,
	scan: false,
	time: 100,
	thread: -1,
	line: null,
	init: function () 
	{
	},
	
	getElement:	function () 
	{
		if (this.element != null) 
		{
			document.body.removeChild(this.element);
			this.element = null;
		}
		
		this.element = document.createElement("script");
		this.element.type = "text/javascript";
		this.element.language = "javascript";
		document.body.appendChild(this.element);
		
		return this.element;
	},

	check: function () 
	{
		if (Suggest.scan == true) 
		{
			if (Suggest.obj.valueOld != Suggest.obj.value && "" != Suggest.obj.value) 
			{
				Suggest.obj.valueOld = Suggest.obj.value;
				Suggest.getData();
			}
			else if (Suggest.obj.value == "" || Suggest.obj.value == "代码/名称/拼音") 
			{
				Suggest.obj.valueOld = Suggest.obj.value;
				Suggest.clean();
			}
			
			Suggest.thread = window.setTimeout(Suggest.check, Suggest.time);
		}
	},

	getData: function ()
	{
		this.getElement();
		
		if (this.obj.value != null) 
		{
			this.element.src = this.url + this.obj.value;
		}
	},

	focusObj: function () 
	{
		if (this.obj.value == '代码/名称/拼音') 
		{
			this.obj.style.color = "#000000";
			this.obj.value = '';
		}
		
		if (this.obj.value != "" && this.obj.value != "代码/名称/拼音") 
		{
			Suggest.getData();
		}
		
		Suggest.scan = true;
		Suggest.check();
	},

	blurObj: function () 
	{
		if (this.obj.value == '')
		{
			this.obj.value = '代码/名称/拼音';
			this.obj.style.color = "#999999";
		}
		
		Suggest.scan = false;
		Suggest.clean();
	},

	keyDown: function (evt) 
	{
		if (this.obj.value != "") 
		{
			switch (evt.keyCode) 
			{
				case 38: //up
					
					this.scan = false;
					
					if (this.line == null || this.line.rowIndex == 1) 
					{
						Suggest.setLine(this.obj.suggestBody.rows[this.obj.suggestBody.rows.length - 1]);
					}
					else 
					{
						Suggest.setLine(this.obj.suggestBody.rows[this.line.rowIndex - 1]);
					}
					
					return false;
					break;
				
				case 40: //down
					this.scan = false;
					
					if (this.line == null || this.line.rowIndex == this.obj.suggestBody.rows.length - 1) 
					{
						Suggest.setLine(this.obj.suggestBody.rows[1]);
					}
					else 
					{
						Suggest.setLine(this.obj.suggestBody.rows[this.line.rowIndex + 1]);
					}
					
					return false;
					break;
				
				case 13: //Enter
					
					Suggest.obj.value = Suggest.obj.value.replace('(旧)', '');
					
					Suggest.blurObj();
					
					//document.stockSearchForm.submit();
					
					break;
				
				default:
					Suggest.setLine(null);
					this.scan = true;
					Suggest.check();
					break;
			}
		}
		//return true;
	},

	setLine: function (line) 
	{
		if (line != null) 
		{
			if (this.line != null) 
			{
				Suggest.discolorLine(this.line);
			}
			
			this.line = line;
			Suggest.colorLine(line);
			this.obj.value = line.cells[1].innerHTML;
		}
		else 
		{
			this.line = null;
		}
	},

	colorLine: 	function (line) 
	{
		line.className = "selected";
	},

	discolorLine:  function (line) 
	{
		line.className = "";
	},

	clean: function () 
	{
		this.ajaxobj.innerHTML = "";
	}
};

var everydata = new Array();


// 显示数据
function showCnt(data) 
{
	Suggest.clean();
	
	if (data.length > 0) 
	{
		var result = new String();
		
		result += '<table width="220" border="0" cellspacing="0" cellpadding="0" class="ajaxtable">';
	
		result += '<tr style="background:#F4F4F4"><td width="35%">搜索选项</td><td width="20%">代码</td><td width="*" align="left">名称</td></tr>';

		// 股票代码模糊查询
		if(IsNumber(Suggest.obj.value))
		{	
			for (var i in data) 
			{
				var tempArray = data[i].split("-");
				
				result += '<tr onmouseover="Suggest.colorLine(this)" onmouseout="Suggest.discolorLine(this)" onmousedown="Suggest.setLine(this)">';
				result += '<td>' + tempArray[0] + '</td>';
				result += '<td>' + tempArray[0] + '</td>';
				result += '<td>' + tempArray[3] + '</td>';
				result += '</tr>';
			}
		}
		// s开头的模糊查询
		else if(IsSings(Suggest.obj.value))
		{
			for (var i in data) 
			{
				var tempArray = data[i].split("-");

				result += '<tr onmouseover="Suggest.colorLine(this)" onmouseout="Suggest.discolorLine(this)" onmousedown="Suggest.setLine(this)">';
				
				result += '<td>' + tempArray[1] + '</td>';
				
				result += '<td>' + tempArray[0] + '</td>';
				result += '<td>' + tempArray[3] + '</td>';
				result += '</tr>';
			}
		}
		// 全部是拼音的查询
		else if(!IsSings(Suggest.obj.value) && IsPinYin(Suggest.obj.value))
		{
			for (var i in data) 
			{
				var tempArray = data[i].split("-");
				
				result += '<tr onmouseover="Suggest.colorLine(this)" onmouseout="Suggest.discolorLine(this)" onmousedown="Suggest.setLine(this)">';
				
				result += '<td>' + tempArray[2] + '</td>';
					
				result += '<td>' + tempArray[0] + '</td>';
				result += '<td>' + tempArray[3] + '</td>';
				result += '</tr>';
			}
		}
		else
		{
			for (var i in data) 
			{
				var tempArray = data[i].split("-");
						
				result += '<tr onmouseover="Suggest.colorLine(this)" onmouseout="Suggest.discolorLine(this)" onmousedown="Suggest.setLine(this)">';
				
				result += '<td>' + tempArray[2] + '</td>';
				
				result += '<td>' + tempArray[0] + '</td>';
				result += '<td>' + tempArray[3] + '</td>';
				result += '</tr>';
			}
		}
		
		result += '</table>';
		
		Suggest.ajaxobj.innerHTML = result;
				
		Suggest.obj.suggestBody = Suggest.ajaxobj.childNodes[0];
	}
	everydata = new Array();
}

// 数字检查
function IsNumber(numCode)
{
	var pattern = /^\d+$/;
	
	var reg = new RegExp(pattern);
	
	if(!reg.test(numCode))
	{
		return false;
	}
	
	return true;
}

// 检查全是拼音
function IsPinYin(numCode)
{
	var pattern = /^[a-zA-z]/;
	
	var reg = new RegExp(pattern);
	
	if(!reg.test(numCode))
	{
		return false;
	}
	
	return true;
}

// 判断第一个是否是字母s
function IsSings(numCode)
{
	var pattern = /[sS]/;
	
	var reg = new RegExp(pattern);
	
	if(!reg.test(numCode))
	{
		return false;
	}
	
	return true;
}

 // 点击图片按钮
function StockSearch_Submit()
{
	if(document.sb_form.msn_stockid.value.length == 0 || document.sb_form.msn_stockid.value == '代码/名称/拼音')
	{
		alert("请输入查询条件");
		return false;
	}
	
	var msnStockid = document.sb_form.msn_stockid.value;
	
	var pos = msnStockid.indexOf("(");
	
	if(pos != -1)
	{
		document.sb_form.msn_stockid.value = msnStockid.substring(0, pos);
	}
	
	window.document.sb_form.submit();
}


 // 点击图片按钮
function StockDataSearch_Submit()
{
	if(document.getElementById("ajaxinput").value.length == 0 || document.getElementById("ajaxinput").value.value == '代码/名称/拼音')
	{
		alert("请输入查询条件");
		return false;
	}
	
	if(document.getElementById("stockbar") && document.getElementById("stockbar").checked)
	{
		document.getElementById("formSearch").action = "http://guba.hexun.com/search/ResultAll.aspx";
		
		document.sb_form.sw.value = document.getElementById("ajaxinput").value;
	}
	else 
	{
		document.getElementById("formSearch").action = "http://data.stock.hexun.com/search/default.aspx";
		
		document.getElementById("sw").value = "";
	}
	
	document.getElementById("formSearch").submit();
	
}


 // 点击图片按钮
function StockDataSearch2009_Submit()
{
	if(document.getElementById("ajaxinput").value.length == 0 || document.getElementById("ajaxinput").value.value == '代码/名称/拼音')
	{
		alert("请输入查询条件");
		return false;
	}
	
	if(document.getElementById("stockbar") && document.getElementById("stockbar").checked)
	{
		document.getElementById("formSearch").action = "http://guba.hexun.com/search/ResultAll.aspx";
		
		document.sb_form.sw.value = document.getElementById("ajaxinput").value;
	}
	else if(document.getElementById("stockquote") && document.getElementById("stockquote").checked)  
	{
		document.getElementById("formSearch").action = "http://data.stock.hexun.com/search/default.aspx";
		
		document.getElementById("typeqgwp").value = "a";
		
		document.getElementById("sw").value = "";
	}
	else
	{
		document.getElementById("typeqgwp").value = "";
		
		document.getElementById("sw").value = "";
	
		document.getElementById("formSearch").action = "http://data.stock.hexun.com/search/default.aspx";
	}
	
	document.getElementById("formSearch").submit();
	
}




// 自动提交股票查询
function Auto_Submit()
{				
	if(document.sb_form.msn_stockid.value.length==0)
	{
		alert("请输入查询条件");
		
		return false;
	}
}

// 判断FireFox浏览器类型
function IsFireFox()
{
	var sAgent = window.navigator.userAgent.toLowerCase();
	
	if (sAgent.indexOf("firefox") != -1)
	{
		return true;
	}
	
	return false;
}