var move = false, _X, _Y;
var targetGourl = "";
var isIE = document.all ? true : false;

function StartDrag(e) {  //定义准备拖拽的函数 按下鼠标onMousedown   

    var parentwin = document.getElementById("alertFram");

    var d = document;

    var e = e ? e : event;

    if (isIE) {
        parentwin.setCapture(); //对当前对象的鼠标动作进行跟踪  

    } else {

        window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);

    }

    move = true;

    //获取鼠标相对内容层坐标  

    //_X = parentwin.offsetLeft - e.clientX;

    //_Y = parentwin.offsetTop - e.clientY;

    var mx = e.pageX || e.clientX + document.documentElement.scrollLeft;
    var my = e.pageY || e.clientY + document.documentElement.scrollTop;
    var ox = parentwin.offsetLeft + 103;
    var oy = parentwin.offsetTop + (isIE ? -40 : 75);
    //alert(e.pageY)
    //alert(e.clientY)
    d.onmousemove = function (e) {//定义拖拽函数 鼠标放上拖动onMousemove   
        var e = e ? e : event;

        if (move) {

            //var parentwin = document.getElementById("alertFram");

            //var x = e.clientX + _X;

            //var y = e.clientY + _Y;
            var mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
            var mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;

            //if (x <= 0)

            //    x = 0

            //if (y <= 0)

            //    y = 0



            //parentwin.style.left = (x) + "px";

            //parentwin.style.top = (y) + "px";
            parentwin.style.left = ox + mouseX - mx + "px";

            parentwin.style.top = oy + mouseY - my + "px";

            parentwin.style.cursor = "move";

        }

    }

    d.onmouseup = function () {//定义停止拖拽函数 松开鼠标onMouseup   

        //停止对当前对象的鼠标跟踪  

        if (isIE) { parentwin.releaseCapture(); }

        else { window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP); }
        d.onmousemove = null;
        move = false;

    }



}

//@mql_modify 2013-4-22 start-------
//g_myBodyInstance = (document.documentElement ? document.documentElement : window);

//window.onscroll = function () {
//    var parentwin = document.getElementById("alertFram");

//    if (parentwin != null) {
//        parentwin.style.top = (window.screen.height * 0.2 + g_myBodyInstance.scrollTop) + "px";
//    }
//};

//@mql_modify 2013-4-22 end-------

var popup_state = false;
function popupLogin() {
    popup('登录', 'http://reg.hexun.com/rest/loginbox.aspx?gourl=' + escape(window.location.href), escape(window.location.href), 516);
}

function popupReg() {
    popup('注册', 'http://reg.hexun.com/rest/regbox.aspx?gourl=' + escape(window.location.href), escape(window.location.href), 516);
}

function popup(topic, frameurl, gourl, height) {
    targetGourl = gourl;
    if (popup_state == false) {
        popup_state = true;
        popupW(topic, frameurl, 558, height);
    }
    return;
}

function changeHref() {
    var obj = document.getElementById('ifrmlink');
    var objT = document.getElementById('ifrmTitle');
    if (obj.innerHTML == "注册") {
        obj.href = "http://reg.hexun.com/rest/regbox.aspx?gourl=" + targetGourl;
        obj.innerHTML = "登录";
        objT.innerHTML = "注册";
    } else {
        obj.href = "http://reg.hexun.com/rest/loginbox.aspx?gourl=" + targetGourl;
        obj.innerHTML = "注册";
        objT.innerHTML = "登录";
    }
}

//带有宽度的调用
function popupW(topic, frameurl, Pwidth, height) {
    var showTxt = "注册";
    var showTitle = "登录";
    var linkUrl = "http://reg.hexun.com/rest/regbox.aspx?gourl=" + targetGourl;
    if (topic == "注册") {
        showTitle = "注册";
        showTxt = "登录";
        linkUrl = "http://reg.hexun.com/rest/loginbox.aspx?gourl=" + targetGourl;
    }
    var eSrc;
    try {
        eSrc = (window.parent.document.all) ? window.event.srcElement : arguments[1];
    } catch (e) { }

    var shield = window.parent.document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "0px";
    shield.style.top = "0px";
    shield.style.width = ((window.parent.document.documentElement.clientWidth > window.parent.document.documentElement.scrollWidth) ? window.parent.document.documentElement.clientWidth : window.parent.document.documentElement.scrollWidth) + "px"; ;
    shield.style.height = ((window.parent.document.documentElement.clientHeight > window.parent.document.documentElement.scrollHeight) ? window.parent.document.documentElement.clientHeight : window.parent.document.documentElement.scrollHeight) + "px";
    shield.style.background = "#333";
    shield.style.textAlign = "center";
    shield.style.zIndex = "10000";
    shield.style.filter = "alpha(opacity=20)";
    shield.style.opacity = 0;
    var alertFram = window.parent.document.createElement("DIV");
    var isIE = (document.all) ? true : false;
    var isIE6 = isIE && ([/MSIE (\d+)\.0/i.exec(navigator.userAgent)][0][1] == 6);
    alertFram.id = "alertFram";
    //@mql_modify 2013-4-22 start----------
    // alertFram.style.position = "absolute";
    alertFram.style.position = "fixed";
    //@mql_modify 2013-4-22 end;-----------
    alertFram.style.left = "40%";
    alertFram.style.top = "20%";
    alertFram.style.marginLeft = "-103px";
    //alertFram.style.marginTop = -75 + window.parent.document.documentElement.scrollTop + "px";
    alertFram.style.width = Pwidth + "px";
    // alertFram.style.height ="600px";
    alertFram.style.background = "";
    alertFram.style.textAlign = "center";
    //alertFram.style.lineHeight = "150px";
    alertFram.style.zIndex = "10001";

    strHtml = "<dl><dd><div class='login_right'><a style='cursor:pointer;' onclick='closePop()' title='关闭此对话框' class='close'></a></div></dd>";
    strHtml += "<dt><iframe id=\"ifrReg\" name=\"ifrReg\" style=\"position:relative\" src='" + frameurl + "' scrolling='no' width='100%' frameborder='0' height='" + height + "px'></iframe></dt></dl>";


    alertFram.innerHTML = strHtml;

    window.parent.document.body.appendChild(alertFram);
    window.parent.document.body.appendChild(shield);
    //@mql_modify 2013-4-22 start-------
    (function (win, doc) {
        var isIE6 = !!document.all && doc.documentMode == undefined,
            div = doc.getElementById("alertFram"),
            html = doc.getElementsByTagName('html')[0],
            divTop = 0;
        if (isIE6 && doc.body.currentStyle.backgroundAttachment !== 'fixed') {//IE下防抖动
            html.style.backgroundImage = 'url(about:blank)';
            html.style.backgroundAttachment = 'fixed';
            div.style.position = "absolute";
            divTop = parseFloat(div.currentStyle.top) || 200;
            win.onscroll = fixedHandle;
        };
        function fixedHandle() {
            div.style.top = doc.documentElement.scrollTop + divTop + 'px';
        }
    })(window, document)
    //@mql_modify 2013-4-22 end-------

    this.setOpacity = function (obj, opacity) {
        if (opacity >= 1) opacity = opacity / 100;
        try { obj.style.opacity = opacity; } catch (e) { }
        try {
            if (obj.filters.length > 0 && obj.filters("alpha")) {
                obj.filters("alpha").opacity = opacity * 100;
            } else {
                obj.style.filter = "alpha(opacity=\"" + (opacity * 100) + "\")";
            }
        } catch (e) { }
    }
    var c = 0;
    this.doAlpha = function () {
        if (++c > 20) { clearInterval(ad); return 0; }
        setOpacity(shield, c);
    }
    var ad = setInterval("doAlpha()", 1);
    this.doOk = function () {
        alertFram.style.display = "none";
        shield.style.display = "none";
        try {
            eSrc.focus();
        } catch (e) { }
    }
    try {
        eSrc.blur();
    } catch (e) { }
}
function popupHTML(topic, frameurl, height) {
    popupWHTML(topic, frameurl, 240, height)
}
function popupWHTML(topic, popHtm, width, height) {
    var eSrc;
    try {
        eSrc = (window.parent.document.all) ? window.event.srcElement : arguments[1];
    } catch (e) { }
    var shield = window.parent.document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "0px";
    shield.style.top = "0px";
    shield.style.width = "100%";
    shield.style.height = ((window.parent.document.documentElement.clientHeight > window.parent.document.documentElement.scrollHeight) ? window.parent.document.documentElement.clientHeight : window.parent.document.documentElement.scrollHeight) + "px";
    shield.style.background = "#333";
    shield.style.textAlign = "center";
    shield.style.zIndex = "10000";
    shield.style.filter = "alpha(opacity=0)";
    shield.style.opacity = 0;
    var alertFram = window.parent.document.createElement("DIV");
    alertFram.id = "alertFram";
    alertFram.style.position = "absolute";
    alertFram.style.left = "50%";
    alertFram.style.top = "20%";
    alertFram.style.marginLeft = "-225px";
    alertFram.style.marginTop = -75 + window.parent.document.documentElement.scrollTop + "px";
    alertFram.style.width = width + "px";
    // alertFram.style.height ="600px";
    alertFram.style.background = "";
    alertFram.style.textAlign = "center";
    //alertFram.style.lineHeight = "150px";
    alertFram.style.zIndex = "10001";

    strHtml = "<dl><dd><h3>" + topic + "</h3><a style='cursor:hand;' onclick='closePop1()' title='关闭此对话框' class='close'>关闭</a></dd>";
    //debugger;
    //popHtm = HTMLEncode(popHtm);
    strHtml += "<dt><table width=100% height=" + height + "px><tr><td valign=top align=left>" + popHtm + "</td></tr></table></dt></dl>";


    alertFram.innerHTML = strHtml;
    window.parent.document.body.appendChild(alertFram);
    window.parent.document.body.appendChild(shield);
    this.setOpacity = function (obj, opacity) {
        if (opacity >= 1) opacity = opacity / 100;
        try { obj.style.opacity = opacity; } catch (e) { }
        try {
            if (obj.filters.length > 0 && obj.filters("alpha")) {
                obj.filters("alpha").opacity = opacity * 100;
            } else {
                obj.style.filter = "alpha(opacity=\"" + (opacity * 100) + "\")";
            }
        } catch (e) { }
    }
    var c = 0;
    this.doAlpha = function () {
        if (++c > 20) { clearInterval(ad); return 0; }
        setOpacity(shield, c);
    }
    var ad = setInterval("doAlpha()", 1);
    this.doOk = function () {
        alertFram.style.display = "none";
        shield.style.display = "none";
        try {
            eSrc.focus();
        } catch (e) { }
    }
    try {
        eSrc.blur();
    } catch (e) { }
}
function closePopHtml() {
    try {
        window.parent.document.body.removeChild(window.parent.document.getElementById("shield"));
        window.parent.document.body.removeChild(window.parent.document.getElementById("alertFram"));
    } catch (e) { }
}

function closePop() {
    try {
        parent.document.body.removeChild(parent.document.getElementById("shield"));
        parent.document.body.removeChild(parent.document.getElementById("alertFram"));
        popup_state = false;
    } catch (e) { }
}
