
document.domain="hexun.com";
var popup_setInterval;

var hexunMember_loginSetup_signUpGoURL;

hexunMember_loginSetup_signUpGoURL="";

if(hexunMember_loginSetup_referrer.length<2)
{
hexunMember_loginSetup_referrer="http://stockdata.stock.hexun.com/2009_fhzzgb_600000.shtml";
}

function hexunMember_gotoURL(backurl)
{
    window.parent.location.href=backurl;
}

function hexunMember_hexunUserLogin()
{
    if(hexunMember_loginSetup_islogined_isDisplay==true)
    {
        var hexunMember_loginSetup_Put_HTML="";
        hexunMember_loginSetup_Put_HTML="<div id='hexunMember_nologinSetup_div_display_nologin'>";
hexunMember_loginSetup_Put_HTML+="<span id='hexunMember_nologinSetup_span_display_noLoginDisplayMsg'>"+hexunMember_loginSetup_noLoginDisplayMsg+"</span>";
hexunMember_loginSetup_Put_HTML+="<span id='hexunMember_nologinSetup_span_display_loginBTN'>";
hexunMember_loginSetup_Put_HTML+="<a style=cursor:pointer onclick=javascript:popupLogin();>µÇÂ¼</a>";
hexunMember_loginSetup_Put_HTML+="</span>";
hexunMember_loginSetup_Put_HTML+="<span id='hexunMember_nologinSetup_span_display_flag'>"+hexunMember_loginSetup_noLoginDisplayFlag+"</span>";
hexunMember_loginSetup_Put_HTML+="<span id='hexunMember_nologinSetup_span_display_userREG'>";
hexunMember_loginSetup_Put_HTML+="<a style=cursor:pointer onclick=javascript:popupReg();>×¢²á</a>";
hexunMember_loginSetup_Put_HTML+="</span>";
hexunMember_loginSetup_Put_HTML+="</div>"

        
        
        //Èç¹ûÒÑµÇÂ½
        
        
        //Èç¹ûÎ´µÇÂ½
        
         if(hexunMember_loginSetup_MastLogin!=0)
        {
            popup('µÇÂ¼','http://reg.hexun.com/OtherInterFace/IFR_userLoginDialog_01.aspx?gourl=http%3a%2f%2fstockdata.stock.hexun.com%2f2009_fhzzgb_600000.shtml','180');;
            return;
        }
        else
        {
        document.getElementById("hexunMember_liveDisplay").innerHTML=hexunMember_loginSetup_Put_HTML;
        return;
        
        }
        
    }
}


if(hexunMember_loginSetup_MastLogin!=0)
{

    
    popup_setInterval=setInterval('hexunMember_hexunUserLogin()',hexunMember_loginSetup_MastLogin*1000);
    //clearInterval(popup_setInterval);
    
}
hexunMember_hexunUserLogin();