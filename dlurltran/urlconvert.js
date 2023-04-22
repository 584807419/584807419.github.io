function urlconvert(){
  var oldurl=$("#oldurl").attr("value");
  oldurl=trimString(oldurl);
  if (oldurl=='')
  {
	  alert('请输入下载链接地址!');
	  return false;
  }
  if (oldurl.indexOf("thunder://")!=-1)
  {
      newurl=Thunderdecode(oldurl);
  }else if(oldurl.indexOf("Flashget://")!=-1){
      newurl=Flashgetdecode(oldurl);
  }else if(oldurl.indexOf("qqdl://")!=-1){
      newurl=qqdecode(oldurl);
  }else{
	   newurl=oldurl;
	   //alert('这个地址貌似不是迅雷,快车,旋风任何一种的下载地址!');
	   //return false;
  }
  thunderurl=ThunderEncode(newurl);
  flashgeturl=flashetencode(newurl);
  qqurl=qqencode(newurl);
  $("#oldurl").attr("value",oldurl);
  $("#newurl").attr("value",newurl);
  $("#thunderurl").attr("value",thunderurl);
  $("#flashgeturl").attr("value",flashgeturl);
  $("#qqurl").attr("value",qqurl);
  $("#down_newurl").html("&nbsp;&nbsp;&nbsp;<a target='_blank' href='"+newurl+"'>下载</a>");
  $("#down_thunderurl").html("&nbsp;&nbsp;&nbsp;<a href='javascript://' thunderHref='"+thunderurl+"' thunderPid='09122' thunderType='' thunderResTitle='' onClick='return OnDownloadClick_Simple(this,2,4)' oncontextmenu='ThunderNetwork_SetHref(this)' >启动迅雷直接下载</a>");
  $("#down_flashgeturl").html("&nbsp;&nbsp;&nbsp;<a href='javascript://' onclick='ConvertURL2FG(\""+flashgeturl+"\",\""+newurl+"\",1926)'></a>");
   
}

function ConvertURL2FG(url,fUrl,uid)
	{	
		try{
			FlashgetDown(url,uid);
		}catch(e){location.href = fUrl;}
}
function Flashget_SetHref(obj,uid){obj.href = obj.fg;}
 function   trimString(str)   
  {   
  var   re;   
  var   newstr;   
  re   =   new   RegExp("^(\\s)*");   
  re2   =   new   RegExp("(\\s)*$");   
  newstr   =   str.replace(re,"");   
  newstr   =   newstr.replace(re2,"");   
    
  return   newstr;   
}   
function qqencode(url){
   url='qqdl://'+encode64(url);
   return url;
}
function flashetencode(url){
   url='Flashget://'+encode64('[FLASHGET]'+url+'[FLASHGET]')+'&1926';
   return url;
}
 function ThunderEncode(t_url) {
	var thunderPrefix = "AA";
	var thunderPosix = "ZZ";
	var thunderTitle = "thunder://";
	var tem_t_url = t_url;
	var thunderUrl = thunderTitle + encode64(thunderPrefix + tem_t_url + thunderPosix);
	return thunderUrl;
}

function Thunderdecode(url) {
	 url=url.replace('thunder://','');
     thunderUrl=decode64(url);
	 thunderUrl=thunderUrl.substr(2,thunderUrl.length-4);
	 return thunderUrl;
}

function Flashgetdecode(url){
    url=url.replace('Flashget://','');
	if (url.indexOf('&')!=-1)
	{
		url=url.substr(0,url.indexOf('&'));	 
	}
	url=decode64(url);
	flashgeturl=url.replace('[FLASHGET]','');
	flashgeturl=flashgeturl.replace('[FLASHGET]','');
	 
	return flashgeturl;
}
function  qqdecode(url){
	url=url.replace('qqdl://','');
    qqurl=decode64(url);
    return qqurl;
}