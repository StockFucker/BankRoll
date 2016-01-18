//ÅÐ¶Ïä¯ÀÀÆ÷
//ÅÐ¶Ïä¯ÀÀÆ÷
ff5 = navigator.appName == 'Netscape' ? true : false;//mozilla firefox   
ns4 = document.layers ? true : false;//Netscape   
ie4 = document.all ? true : false;//Microsoft   Internet   Explorer   

// static class
Common = new function(){
// private static fields 	

// public static method 
	this.$ = function(name)
	{
		return document.getElementById(name);
	}
	this._ = function(tagName)
	{
		return document.createElement(tagName);
	}
	this.Resize = function()
	{
		if(parent.document.getElementById("ifrName") != undefined){
			parent.document.getElementById("ifrName").style.height = document.body.scrollHeight + "px"; 
		}
	}
	this.GetDate = function(obj)
	{
		var date = new Date();
		var ss = date.getMonth()+1;
		var aa = ss;
		if(ss < 10 ) aa = "0" + ss; 
		var se = date.getDate();
		var sae = se;
		if(se < 10 ) sae = "0" + se;
		var tradedate = date.getFullYear()+ "-"  + aa + "-" + sae;
		Common.$(obj).value = tradedate;
	}
	this.Time = function()
	{
		var time = new Date();
		var h = time.getHours();
		var m = time.getMinutes();		
		var s = Math.floor(time.getSeconds()/10)*10; 
		var arg = (h<10 ? "0" + h : h) + "" + (m<10 ? "0" + m : m) + "" + (s<10 ? "0" + s : s);
		return arg;
	}
	this.IsDate = function(str)
	{
		var re = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
		return re.test(str);
	}
	this.IsNumber = function(str)
	{
		var re = new RegExp(/^\d{1,}$/);
		return re.test(str);
	}
	this.IsDecimal = function(str)
	{
		var re = new RegExp(/^\d{1,}(.\d{1,}){0,1}$/);
		return re.test(str);
	}
	this.IsCode = function(str)
	{
		var re = new RegExp(/^\d{6}$/);
		return re.test(str);
	}
	this.IsCodeMarket = function(str)
	{
		var re = new RegExp(/^(\d{6}_\d{1}){1}(\|\d{6}_\d{1}){0,}$/);//
		return re.test(str);
	}
	this.IsHKCode = function(str)
	{
		var re = new RegExp(/^(\d{5}){1}(\|\d{5}){0,}$/);//90007|90001|90020|90006
		return re.test(str);
	}
	this.MarketString = function(str)
	{
		if(str == "1")
		{
			return "SH";
		}
		else
		{
			return "SZ";
		}
		return "SH";
	}
	this.AppendDataArray = function(id,url)
	{
		var obj = Common.$(id);
		if(obj){obj.parentNode.removeChild(obj);}
		var newscript = Common._("script");
		newscript.type = "text/javascript";
		newscript.src = url;
		newscript.id = id;
		//document.body.appendChild(newscript);
		document.getElementsByTagName('head')[0].appendChild(newscript); 
	}
	this.GetColor = function(value,fiducial)
	{
		if(value == undefined){
			return "--";
		}
		
		if(Number(value) == Number(fiducial)){
			return value;
		}
		else if(Number(value) > Number(fiducial)){
			return "<span class=\"red\">" + value + "</span>";
		}
		else if(Number(value) < Number(fiducial)){
			return "<span class=\"green\">" + value + "</span>";
		}
		return value;
	}
	this.GetColor2DEC = function(value,fiducial)
	{
		if(value == undefined){
			return "--";
		}
		
		if(Number(value) == Number(fiducial)){
			return value.toFixed(2);
		}
		else if(Number(value) > Number(fiducial)){
			return "<span class=\"red\">" + value.toFixed(2) + "</span>";
		}
		else if(Number(value) < Number(fiducial)){
			return "<span class=\"green\">" + value.toFixed(2) + "</span>";
		}
		return value;
	}
	this.GetColor3DEC = function(value,fiducial)
	{
		if(value == undefined){
			return "--";
		}
		
		if(Number(value) == Number(fiducial)){
			return value.toFixed(3);
		}
		else if(Number(value) > Number(fiducial)){
			return "<span class=\"red\">" + value.toFixed(3) + "</span>";
		}
		else if(Number(value) < Number(fiducial)){
			return "<span class=\"green\">" + value.toFixed(3) + "</span>";
		}
		return value;
	}
	this.GetColor4DEC = function(value,fiducial)
	{
		if(value == undefined){
			return "--";
		}
		
		if(Number(value) == Number(fiducial)){
			return value.toFixed(4);
		}
		else if(Number(value) > Number(fiducial)){
			return "<span class=\"red\">" + value.toFixed(4) + "</span>";
		}
		else if(Number(value) < Number(fiducial)){
			return "<span class=\"green\">" + value.toFixed(4) + "</span>";
		}
		return value;
	}
	this.GetColorClass = function(value,fiducial)
	{
		if(Number(value) == Number(fiducial)){
			return "";
		}
		else if(Number(value) > Number(fiducial)){
			return " class=\"red\"";
		}
		else if(Number(value) < Number(fiducial)){
			return " class=\"green\"";
		}
		return value;
	}
}
