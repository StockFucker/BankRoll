document.domain = "hexun.com";
var isChildSend=false;
var isTraceError=false;
try{
	typeof(top.isChildSend)
}catch(e){
	isTraceError=true;
}
if(!isTraceError){
	if(typeof(top.isChildSend)=="undefined" || !top.isChildSend){
		
	if(typeof(top.isChildSend)!="undefined"){
		top.isChildSend=true;
	}
		
	var TrackIsLoaded;if (typeof(TrackIsLoaded)=="undefined"){var calc_d=new Date();var calc_l=escape(document.location.href);var calc_r=escape(document.referrer);var isiframed='0';var sflag="1";function readCookie(name){var cookieValue="";var search=name+"=";if(document.cookie.length>0){offset=document.cookie.indexOf(search);if(offset!=-1){offset+=search.length;end=document.cookie.indexOf(";",offset);if(end==-1)end=document.cookie.length;cookieValue=unescape(document.cookie.substring(offset,end))}}return cookieValue;}if (calc_l.toLowerCase().indexOf("hexun.com")==-1){sflag="2";}else{if(readCookie('HexunTrack')==""){isiframed='2';sflag="2";}}if (sflag=="1"){if(window!=top.window){isiframed='1';try{if(readCookie('HexunTrack')==""){isiframed='2';sflag="2";}}catch(e){sflag="2";}}}if (sflag=="1"){if(typeof(_title_for_track_)=='undefined'){document.write("<iframe src='http://utrack.hexun.com/usertrack.aspx?site="+calc_l+"&time="+calc_d.getTime()+"&rsite="+calc_r+"' height=0 frameborder=0></iframe>");}else{document.write("<iframe src='http://utrack.hexun.com/usertrack.aspx?site="+calc_l+"&time="+calc_d.getTime()+"&rsite="+calc_r+"&title="+title+"' height=0 frameborder=0></iframe>");}}else{if(typeof(_title_for_track_)=='undefined'){document.write("<iframe src='http://utrack.hexun.com/ftrack.htm?calc_l="+calc_l+"&time="+calc_d.getTime()+"&calc_r="+calc_r+"&isiframed="+isiframed+"&sflag="+sflag+"' height=0 frameborder=0 width=0></iframe>");}else{document.write("<iframe src='http://utrack.hexun.com/ftrack.htm?calc_l="+calc_l+"&time="+calc_d.getTime()+"&calc_r="+calc_r+"&title="+escape(_title_for_track_)+"&isiframed="+isiframed+"&sflag="+sflag+"' height=0 frameborder=0></iframe>");}}TrackIsLoaded=true;}}
}