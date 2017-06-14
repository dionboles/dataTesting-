// AJAX Network  - functions for communication to the server using AJAX

// UTF functions are based on work by: tobias@justdreams.de
var decode2qUTF = function decode_utf8(utftext) {
	var plaintext = "";
	var i=0;
	var c=c1=c2=0;
	while(i<utftext.length)	{
		c = utftext.charCodeAt(i);
		if (c<128) {
			plaintext += String.fromCharCode(c);
			i++;
		} else if((c>191) && (c<224)) {
			c2 = utftext.charCodeAt(i+1);
			plaintext += String.fromCharCode(((c&31)<<6) | (c2&63));
			i+=2;
		} else {
			c2 = utftext.charCodeAt(i+1);
			c3 = utftext.charCodeAt(i+2);
			plaintext += String.fromCharCode(((c&15)<<12) | ((c2&63)<<6) | (c3&63));
			i+=3;
			}
	}
	return plaintext;
}
var encodeUTF = function encode_utf8(rohtext) {
	rohtext = rohtext.replace(/\r\n/g,"\n");
	var utftext = "";
	for(var n=0; n<rohtext.length; n++)	{
		var c=rohtext.charCodeAt(n);
		if (c<128)
			utftext += String.fromCharCode(c);
		else if((c>127) && (c<2048)) {
			utftext += String.fromCharCode((c>>6)|192);
			utftext += String.fromCharCode((c&63)|128);
		} else {
			utftext += String.fromCharCode((c>>12)|224);
			utftext += String.fromCharCode(((c>>6)&63)|128);
			utftext += String.fromCharCode((c&63)|128);
		}
	}
	return utftext;
}

var setonce = false;
function isrepeatcustomer()
{
	var temp;
	var cookies = document.cookie.split('; ');
	for(var i=0;i < cookies.length;i++)
	{
		temp = cookies[i].split('=');
		if(trimString(temp[0]) == "LastInteractionDate" && temp[1].indexOf('$') > 0 )
		{
			var cookievalue = temp[1].split('$');
			var lastchat = cookievalue[0].split('$');
			var lastvoip = cookievalue[1].split('$');
			return (lastchat > lastvoip ? lastchat : lastvoip);
		}
	}
	return 0;
}

function setcookie(namevalue, expires, path, domain) 
{
	var thecookiestring = namevalue +
		((expires) ? ";expires=" + expires : "" ) + 
		((path) ? ";path=" + path : "" ) + 
		((domain) ? ";domain=" + domain : "" );
	
	document.cookie = thecookiestring;
}

function sessionstarted()
{
	sessioncookie("StartTime");
}

function sessionended()
{
	sessioncookie("EndTime");
}

function sessioncookie(cookiename)
{
	//alert(cookiename);
	
	var thexpires = new Date();
	thexpires.setTime(thexpires.getTime() + (1000 * (24 * 60 * 60)));
	
	var now2 = new Date();
	var temp;
	var cookies = document.cookie.split('; ');
	var cookievalue;
	var lastvoip = 0;
	var lastchat = 0;
	var cookiestring;
	
	for(var i=0;i < cookies.length;i++)
	{
		temp = cookies[i].split('=');
		if(temp[0] == cookiename && temp[1].indexOf("$") != -1)
		{
			cookieSet = true;
			cookievalue = temp[1].split('$');
			lastchat = cookievalue[0];
			lastvoip = cookievalue[1];
			break;
		}
	}
	
	var domainname = fnGetDomainName();
	
	if (outputNetworkLayer.requestvoip == 1)
		setcookie(cookiename + "=" + lastchat + "$" +  now2.getTime(),thexpires.toUTCString(),'/',domainname);
	else
		setcookie(cookiename + "=" + now2.getTime() + "$" +  lastvoip,thexpires.toUTCString(),'/',domainname);		
	
}

function sessionstartedwithagent()
{
	if(setonce == false)
	{
		//alert("LastInteractionDate");
		
		setonce = true;

		var thexpires = new Date(2038,0,1);
		var now2 = new Date();
		var temp;
		var cookies = document.cookie.split('; ');
		var cookievalue;
		var lastvoip = 0;
		var lastchat = 0;
		var cookiestring;
		
		for(var i=0;i < cookies.length;i++)
		{
			temp = cookies[i].split('=');
			if(temp[0] == "LastInteractionDate" && temp[1].indexOf("$") != -1)
			{
				cookieSet = true;
				cookievalue = temp[1].split('$');
				lastchat = cookievalue[0];
				lastvoip = cookievalue[1];
				break;
			}
		}
		
		var domainname = fnGetDomainName();
		
		if (outputNetworkLayer.requestvoip == 1)
			setcookie("LastInteractionDate=" + lastchat + "$" +  now2.getTime(),thexpires.toUTCString(),'/',domainname);
		else
			setcookie("LastInteractionDate=" + now2.getTime() + "$" +  lastvoip,thexpires.toUTCString(),'/',domainname)		
	}
}

function fnGetDomainName()
{
	var domainname = window.location.hostname;
	var ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	var isipaddress = domainname.match(ipPattern);
	
	if(isipaddress == null)
	{
		var periodlocation = domainname.indexOf(".");
		if(periodlocation!= -1)
			domainname = domainname.substring(periodlocation); 
	}
	return domainname;
}

function fnGetHTML(strString, UserAgent)
{
    
	var objSpn = document.createElement("SPAN");
	objSpn.innerHTML = strString;
	if (ie || ie7 || ie8 || opera)
	{
		strString = objSpn.innerText;
	}
	else
	{
		document.body.appendChild(objSpn);
		strString = (UserAgent.search(/Safari/i) < 0)?objSpn.textContent:objSpn.innerText;
		if (UserAgent.search(/chromeframe/i) > 0)
		    strString = objSpn.innerText;
		document.body.removeChild(objSpn);
	}
	objSpn = null;
	return strString;
}

function STKNZR(strData, strToken)
{
	this.strData = strData;
	this.strToken = strToken;
	this.nIndex = 0;
	this.arrToken = strData.split(strToken);
}

STKNZR.prototype.noTKNS = function()
{
	return this.arrToken.length;
}

STKNZR.prototype.isExt = function()
{
	return this.nIndex < this.arrToken.length;
}

STKNZR.prototype.NXTKN = function()
{
	if (!this.isExt())return null;
	return this.arrToken[this.nIndex++];
}
STKNZR.prototype.ALLTKN = function()
{
	if (!this.isExt())return null;
	for (var i = 0;i < this.nIndex;i++)this.arrToken.shift();
	return this.arrToken.join(String.fromCharCode(1));
}

STKNZR.prototype.Get = function(nIndex)
{
	if (nIndex >= this.arrToken.length || nIndex < 0)return null;
	return this.arrToken[nIndex];
}

function OutputNetworkLayer(naParam)
{
	if (naParam == null)return this;
	OutputNetworkLayer.LANG_STRING_SESSION_LABEL_ID			= 1;
	OutputNetworkLayer.LANG_STRING_SENDBUTTON_CAPTION		= 4;
	OutputNetworkLayer.LANG_STRING_EXITBUTTON_CAPTION		= 5;
	OutputNetworkLayer.LANG_STRING_COMBO_OPT				= 6;
	OutputNetworkLayer.LANG_STRING_COMBO_CALL				= 7;
	OutputNetworkLayer.LANG_STRING_COMBO_COPYALL			= 8;
	OutputNetworkLayer.LANG_STRING_COMBO_COPYPRINT			= 9;
	OutputNetworkLayer.LANG_STRING_LOGIN_ERROR				= 11;
	OutputNetworkLayer.LANG_STRING_QUEUEPOS_NEXT			= 12;
	OutputNetworkLayer.LANG_STRING_QUEUEPOS_NUMBER			= 13;
	OutputNetworkLayer.LANG_STRING_UNKNOWN_AGENT			= 14;
	OutputNetworkLayer.LANG_STRING_CONNECT_WITH				= 15;
	OutputNetworkLayer.LANG_STRING_PUSHES_PAGE				= 16;
	OutputNetworkLayer.LANG_STRING_PUSHES_FILE				= 17;
	OutputNetworkLayer.LANG_STRING_PUSHES_MAILTO			= 18;
	OutputNetworkLayer.LANG_STRING_PUSHED_PAGE				= 19;
	OutputNetworkLayer.LANG_STRING_PUSHED_FILE				= 20;
	OutputNetworkLayer.LANG_STRING_PUSHED_MAILTO			= 21;
	OutputNetworkLayer.LANG_STRING_SESSION_CONNECT_REP		= 24;
	OutputNetworkLayer.LANG_STRING_SESSION_CONNECTTO		= 25;
	OutputNetworkLayer.LANG_STRING_SESSION_CONNECT			= 26;
	OutputNetworkLayer.LANG_STRING_SESSION_DISCONNECT		= 27;
	OutputNetworkLayer.LANG_STRING_SESSION_HASENDED			= 28;
	OutputNetworkLayer.LANG_STRING_SESSION_ENDED			= 29;
	OutputNetworkLayer.LANG_STRING_SESSION_LEFT				= 30;
	OutputNetworkLayer.LANG_STRING_SESSION_JOIN				= 31;
	OutputNetworkLayer.LANG_STRING_SESSION_TFER_FOOTER		= 34; 
	OutputNetworkLayer.LANG_STRING_NTWKERR_STARTUP_FOOTER	= 36;
	OutputNetworkLayer.LANG_STRING_COBROWSE_REQUEST 		= 41;
	OutputNetworkLayer.LANG_STRING_COBROWSE_PLUS_REQUEST	= 42;
	OutputNetworkLayer.LANG_STRING_COBROWSE_REQUEST_ACCEPT	= 43;
	OutputNetworkLayer.LANG_STRING_COBROWSE_REQUEST_DECLINE	= 44;
	OutputNetworkLayer.LANG_STRING_COBROWSE_END 			= 45;
	OutputNetworkLayer.LANG_STRING_COBROWSE_PLUS_START		= 46;
	OutputNetworkLayer.LANG_STRING_COBROWSE_START   		= 47;
	OutputNetworkLayer.LANG_STRING_COBROWSE_PLUS_REQ_ACCEPT	= 48;
	OutputNetworkLayer.LANG_STRING_COBROWSE_PLUS_REQ_DECLINE = 49;
	OutputNetworkLayer.LANG_STRING_EMAGIC_FTER_YOULEAD		= 50;
	OutputNetworkLayer.LANG_STRING_EMAGIC_FTER_AGTLEAD		= 51;
	OutputNetworkLayer.LANG_STRING_EMAGIC_CUSTPUSH			= 52;
	OutputNetworkLayer.LANG_STRING_MAIN_NTWKERR_LOSTCONN	= 53;
	OutputNetworkLayer.LANG_STRING_MAIN_NTWKERR_UNABLELOGON	= 56;
	OutputNetworkLayer.LANG_STRING_MAIN_NTWKERR_NOTOP		= 58;
	OutputNetworkLayer.LANG_STRING_MAIN_FOOTER_NTWK_CONN	= 61;
	OutputNetworkLayer.LANG_STRING_MAIN_TALK_CONNNNECTING	= 62;
	OutputNetworkLayer.LANG_STRING_QUESTION					= 64;
	OutputNetworkLayer.LANG_STRING_RECONN_TITLE				= 65;
	OutputNetworkLayer.LANG_STRING_RECONN_FSENT				= 66;
	OutputNetworkLayer.LANG_STRING_RECONN_SSENT 			= 67;
	OutputNetworkLayer.LANG_STRING_OK						= 75;
	OutputNetworkLayer.LANG_STRING_CANCEL					= 76;
	OutputNetworkLayer.LANG_STRING_RETRY_NOW				= 77;
	OutputNetworkLayer.LANG_STRING_EDIT_ERROR_TITLE			= 78;
	OutputNetworkLayer.LANG_STRING_EDIT_ERROR_MSG			= 79;
	OutputNetworkLayer.LANG_STRING_MAIN_TALK_RECONN			= 80;
	OutputNetworkLayer.LANG_STRING_RECON_STATUS				= 81;
	OutputNetworkLayer.LANG_STRING_RECON_STATUS_ATT			= 82;
	OutputNetworkLayer.LANG_STRING_RECON_STATUS_ATTFAIL		= 83;
	OutputNetworkLayer.LANG_STRING_NM_NOTACCEPT				= 84;
	OutputNetworkLayer.LANG_STRING_EMAGIC_FAIL				= 85;
	OutputNetworkLayer.LANG_STRING_ORIGSUBJECT				= 86;
	OutputNetworkLayer.LANG_STRING_NETMEETINGBUTTON_CAPTION	= 87;
	OutputNetworkLayer.LANG_STRING_QUEUE_WAIT_TIME			= 88;
	OutputNetworkLayer.LANG_STRING_SESSION_SUSPENDED		= 89;
	OutputNetworkLayer.LANG_STRING_AGENT_TYPING				= 99;
	OutputNetworkLayer.LANG_STRING_CUST_TIMEOUT_TITLE		= 100;
	OutputNetworkLayer.LANG_STRING_CUST_TIMEOUT_QUESTION	= 101;
	OutputNetworkLayer.LANG_STRING_CUST_TIMEOUT_RESP_END	= 102;
	OutputNetworkLayer.LANG_STRING_CUST_TIMEOUT_RESP_CONT	= 103;
	OutputNetworkLayer.LANG_STRING_MULTIPLE_AGENTS_TYPING	= 104;
	OutputNetworkLayer.LANG_STRING_QUEUEWAITING				= 150;
	OutputNetworkLayer.LANG_STRING_TRANSFERINGIET			= 151;
	OutputNetworkLayer.LANG_STRING_AGENTENTEREDSESSION		= 152;
	OutputNetworkLayer.LANG_STRING_SUPERVISORENTEREDSESSION	= 153;
	OutputNetworkLayer.LANG_STRING_SESSION_ABORT            = 154;
	OutputNetworkLayer.LANG_STRING_AGENT                    = 160;
	OutputNetworkLayer.LANG_STRING_CUSTOMER					= 161;
	OutputNetworkLayer.LANG_STRING_SYSTEM					= 162;
	OutputNetworkLayer.LANG_STRING_SAVE     				= 168;
	OutputNetworkLayer.LANG_STRING_ACCEPT_COBROWSE_CERTS   	= 171;
	OutputNetworkLayer.LANG_STRING_COBROWSE_CERT_ACCEPTED  	= 172;
	OutputNetworkLayer.LANG_STRING_COBROWSE_CERT_REJECTED  	= 173;
	OutputNetworkLayer.LANG_STRING_CUST_PRETEXT				= 200;
	OutputNetworkLayer.LANG_STRING_AGENT_PRETEXT			= 201;
	OutputNetworkLayer.LANG_STRING_WELCOME_TEXT				= 202;
	OutputNetworkLayer.LANG_STRING_WELCOME_TALKTEXT			= 203;
	OutputNetworkLayer.LANG_STRING_WELCOME_IMTEXT			= 204;
	OutputNetworkLayer.LANG_STRING_NORM_TRANS_MSG_Q			= 205;
	OutputNetworkLayer.LANG_STRING_ABNORM_TRANS_MSG_Q		= 206;
	OutputNetworkLayer.LANG_STRING_NORM_TRANS_MSG_AGENT		= 207;
	OutputNetworkLayer.LANG_STRING_BROSWER_END				= 208;
	OutputNetworkLayer.LANG_STRING_CUST_TABLE_PREFEXT		= 209;
	OutputNetworkLayer.LANG_STRING_SYSTEM_TABLE_PREFEXT		= 210;
	OutputNetworkLayer.LANG_STRING_REFERENCE_NUMBER 		= 211;

	this.Name = "outputNetworkLayer";
	this.UserAgent = naParam.useragent;
	this.LoginName = fnGetHTML(naParam.login_name, this.UserAgent);
	this.Password = naParam.password;
	this.ServiceLine = naParam.ServiceLine;
	this.Queue = naParam.queue;
	this.CallBack = naParam.callback;
	this.ServerName = document.location.hostname;
	this.Subject = fnGetHTML(naParam.subject, this.UserAgent);
	this.EMail = fnGetHTML(naParam.email, this.UserAgent);
	this.Referer = naParam.referer;
	this.HTTP_Port = naParam.http_port;
	this.Sock_Port = naParam.sock_port;
	this.Proxy = naParam.proxy;
	this.LogData = naParam.logdata;
	this.Send_WB_Data = naParam.send_wb_data;
	this.Options = fnGetHTML(naParam.options, this.UserAgent);
	this.ServerURL = naParam.server_url;
	this.Secure = naParam.secure;
	this.VID = naParam.vid;
	this.Lang_ID = naParam.lang_id;
	this.Lang_URL = naParam.lang_url;
	this.Paid = naParam.paid;
	this.RouteTo = naParam.route_to;
	this.Pacat = naParam.pacat;
	this.SuspendSessionID = naParam.suspend_session_id;
	this.SuspendID = naParam.suspend_id;
	this.WID = naParam.wid;
	this.Force_HTTP = naParam.force_http;
	this.SpellCode = 'am';
	this.UserID = "";
	this.SessionID = 0;
	this.LangArray = null;
	this.SendMsg = new Array();
	this.Buffer = new Array();
	this.Ping = 0;
	this.requestvoip = naParam.requestvoip;
	this.portalid = naParam.portalid;
	this.questionnaireid = naParam.questionnaireid;
	this.webcollabkey = naParam.webcollabkey;
	this.IsTryingToConnect = 0;
	this.jvmVer = naParam.jvm_ver;
	this.PollInterval = 5000;

	var d = new Date();
	var fnUnld = Function ("var obj = " + this.Name + ";if (obj.SessionID <= 0)return;" +
	"return obj.getLangString(208);");
	
	if (this.UserAgent.search(/Safari/i) >= 0 && navigator.userAgent.toLowerCase().indexOf("chrome") <= 0)
        top.onbeforeunload = fnUnld;
    else
		window.onbeforeunload = fnUnld;

	//send the unload notification
	window.onunload = Function("outputNetworkLayer.OnEndSessionNavigate();var obj = " + this.Name + ";if (obj.SessionID <=0)return;" +
	"sessionended();" +
	"var strURL = '" + this.GetServerBaseUrl() + "?Action=3099&Content=' + obj.SessionID + " + 
	"'&SID=' + obj.UserID + '&Rand=" + Date.parse(d) + "';if(this.objXML)this.objXML.abort();this.objXML=null;" +
	"if(obj.objCustXML)obj.objCustXML.abort();obj.objCustXML=null;obj.GetHTTPResponse(strURL, false, false);" +
	"return;");

	this.MsgQueue = new function()
	{
		var arrQueue = new Array();
		this.Done = function (varData){return arrQueue.shift();}
		this.Add = function(varData){arrQueue.push(varData);}
		this.Get = function(){if (arrQueue.length == 0)return null;return arrQueue[0];}
		this.Exists = function(){return (arrQueue.length > 0);}
		this.Clear = function(){arrQueue.length = 0;return true;}
	}
	this.ClientIDString = "UNIFIEDCLIENT";

	this.Blob = function(strName, strContent){this.Name=strName; this.Content=strContent};
	clientDriver.SetLangCode(this.Lang_ID);
	this.LoadLanguage(false);
	this.LoadLanguage(true);
	this.NetError = false;
	window[this.Name] = this;
	//this.Connected = this.Connect(false);
	setTimeout("outputNetworkLayer.Connected = outputNetworkLayer.Connect(false);",250);
	//setTimeout("if(outputNetworkLayer.IsTryingToConnect == 0 && !outputNetworkLayer.Connected){outputNetworkLayer.Connected = outputNetworkLayer.Connect(false);}", 1000);

	return this;
}

OutputNetworkLayer.prototype.LoadLanguage = function(isLocale)
{

	var strURL = document.location.protocol + "//" + document.location.host + this.Lang_URL;
	var nLangID = (isLocale)?this.Lang_ID:11;
	if (isLocale == true && 11 == this.Lang_ID)return;
	if (window.XMLHttpRequest && this.UserAgent.search(/Safari/i) < 0 && !(ie || ie7 || ie8 || opera))
		strURL += "NAAJAXLoadLangFiles.aspx?FileID=" + nLangID + "&Random=" + Date.parse(Date());
	else
		strURL += "language" + nLangID + ".txt?Random=" + Date.parse(Date());
	var strLanguage = this.GetHTTPResponse(strURL, false);
	if (strLanguage != "")
	{
		var nFileStart = strLanguage.search(/\d{5} {6,7}".*"/);
		strLanguage = strLanguage.substr(nFileStart)
		var arrLang = new Array();
		var nPos = 0;
		while ((nPos = strLanguage.search(/\d{5}/)) >= 0)
		{
			if (strLanguage.match(/\d{2}(\d{3}) {6,7}"(.*)"/))
			{
				arrLang[parseInt(RegExp.$1, 10)] = RegExp.$2;

			}
			var nPos1 = strLanguage.indexOf("\r\n", nPos);
			nPos1 = (nPos1 < 0)?(strLanguage.indexOf("\n", nPos) + 1):(nPos1 + 2);
			strLanguage = strLanguage.substr(nPos1);
		}

		if (isLocale)
		{
			this.LocalString = arrLang;
		}
		else
			this.LangArray = arrLang;
		if (arrLang[25])arrLang[25] = arrLang[25].replace(/##SERVER##/i, this.ServerName);
		if (arrLang[0])this.SpellCode = arrLang[0].split(";")[1];
	}
}

OutputNetworkLayer.prototype.getLangString = function (strID)
{
	if (this.LocalString != null && this.LocalString[strID] != null)return this.LocalString[strID];
	if (this.LangArray == null)return "";
	return this.LangArray[strID];
}
OutputNetworkLayer.prototype.getLangStringWithVariable = function(id, variable) {
	var str = this.getLangString(id);
	str = str.replace(/%s%/g, variable);
	return str;
}

OutputNetworkLayer.prototype.Connect = function(bClear)
{
	var strURL = "";
	var d = new Date();
	strURL = this.GetServerBaseUrl() + "?Action=0&Rand=" + Date.parse(d) + "&SID=XXXXXX";

	var strResult = this.GetHTTPResponse (strURL, false);
	var arrLine = strResult.replace(/\r/g, "").split('\n');
	if (arrLine.length <= 2 || arrLine[1] != ""){this.ConnSchd();return false};
	if (arrLine[0] != "<!--NETCOM--->" && arrLine[0] != "<!NETCOM--->"){this.ConnSchd();return false};
	var nIndex = arrLine[2].indexOf("SID=");
	if (nIndex < 0){this.ConnSchd();return false};
	var data = arrLine[2];
	this.UserID = data.substring(nIndex + 4, nIndex + 10);

	var strLang = this.getLangString(0);
	strLang = strLang.substring(0, strLang.indexOf(";"));
	
	var jres = deployJava.getJREs();
	
	
	var strCon = "LOGIN_NAME=" + this.LoginName
		+ "\001PASSWORD=" + this.Password
		+ "\001ENTER_QUEUE=" + this.Queue 
		+ "\001CALLBACK=" + this.CallBack
		+ "\001SUBJECT=" + this.Subject 
		+ "\001EMAIL=" + this.EMail 
		+ "\001REFERER=" + this.Referer 
		+ "\001USER_AGENT=" + this.UserAgent
		+ "\001CLIENTINFO=" + this.ClientIDString + "/nGenera"
		+ "\001VISITOR_ID=" + this.VID
		+ "\001WARMTRANS_ID=" + this.WID
		+ "\001LANG_NAME=" + strLang
		+ "\001LANG_NUMBER=" + this.Lang_ID
		+ "\001SPELLCODE=" + this.SpellCode
		+ "\001PROACTIVEID=" + this.Paid
		+ "\001ROUTETOAGENT=" + this.RouteTo
		+ "\001SUSPENDID=" + this.SuspendID
		+ "\001SUSPENDSESSIONID=" + this.SuspendSessionID
		+ "\001REQUESTVOIP=" + this.requestvoip
		+ "\001PORTALID=" + this.portalid
		+ "\001QUESTIONNAIREID=" + this.questionnaireid
		+ "\001WEBCOLLABKEY=" + this.webcollabkey;
		
		strCon += "\001JVM_VERSION=";
		if ((typeof(this.jvmVer) != "undefined") && (this.jvmVer != null))
			strCon += this.jvmVer;
		else
			strCon += "UNKNOWN";

	//if(true == isrepeatcustomer())
	//{
		strCon += "\001RETURNCUSTOMER="
		strCon += isrepeatcustomer()
	//}
	
	strCon += "\001OPTIONS=" + this.Options + "\r\n\r\n";
		
	var nRet = this.SendHTTP (1100, strCon, false, false, false, bClear);
	if (this.reqResponseCode != 200 || nRet == false) 
    {
		alert("Connection to server failed. " + this.reqResponseCode);
		this.ConnSchd();
		return false;
	}
	else
	{
		this.IsTryingToConnect = 1;
		clientDriver.onLogin(this.LoginName, this.EMail, this.Queue, this.Subject);
		setTimeout ("outputNetworkLayer.run();", this.PollInterval);
		return nRet;
	}
}
OutputNetworkLayer.prototype.ConnSchd = function()
{
	this.IsTryingToConnect = setTimeout(this.Name + ".Connect();", this.PollInterval);
}

OutputNetworkLayer.prototype.SendHTTP = function(action, strQuery, bASync, bCustReq, bFromQ, bClear)
{
	if (!bCustReq && this.objXML != null)return true;
	if (bCustReq)
	{
		if (!bFromQ && this.SessionID > 0)this.MsgQueue.Add([action, strQuery, bASync]);
		if (this.objCustXML != null || this.MsgQueue.Exists() && !bFromQ)
		{
			if (this.objCustXML == null)this.ProcessPending();
			return true;
		}
		if (this.Ping > 0)clearTimeout(this.Ping);this.Ping = 0;
	}
	else if (!this.Connected) setStatusText(this.getLangString(OutputNetworkLayer.LANG_STRING_MAIN_TALK_CONNNNECTING));
	var strURL = "";
	
	if (action == 4100 || action == 1100)
	{
		strURL = this.GetServerBaseUrl() + "?Action=" + action + "&ESBLOB";
	}
	else
	{
		//if 4100 or 1100 is uses query string then the strquery for these actions should be encoded using encodeURIComponent rather encodeURI.
		strURL = this.GetServerBaseUrl() + "?Action=" + action + "&Content=" + encodeURI(strQuery);
	}
	
	var d = new Date();
	strURL += "&SID=" + this.UserID + "&Rand=" + (Date.parse(d) + d.getMilliseconds());

	if (bASync == null)bASync = true;
	if (bASync)
		return this.GetHTTPResponse(strURL, bASync, bCustReq, action, strQuery)
	else
		return this.ParseResponse(this.GetHTTPResponse(strURL, bASync, bCustReq, action, strQuery), bClear, action);
}

OutputNetworkLayer.prototype.GetHTTPResponse = function(strURL, bASync, bCustReq, action, strMsg)
{
	if (window.XMLHttpRequest)
		var XMLReq1 = new XMLHttpRequest();
	else
		var XMLReq1 = new ActiveXObject("Microsoft.XMLHTTP");

	if (action == 4100 || action == 1100)
	{
		XMLReq1.open("POST", strURL, bASync);
		XMLReq1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}
	else
	{
		XMLReq1.open("GET", strURL, bASync);
   		 if(XMLReq1.overrideMimeType){        
        		XMLReq1.overrideMimeType("text/plain");
    		}
	}
	
	if (bASync == null)bASync = true;
	if (bASync)
	{
		if (bCustReq)
		{
			this.objCustXML = XMLReq1;
			XMLReq1.onreadystatechange = new Function(this.Name + ".OnHTTPCustReqResponse();");
			if (window.XMLHttpRequest)XMLReq1.onerror = new Function(this.Name + ".OnNetError();");
		}
		else
		{
			this.objXML = XMLReq1;
			XMLReq1.onreadystatechange = new Function(this.Name + ".OnHTTPResponse(true);");
		}
	}

	if (action == 4100 || action == 1100)
		XMLReq1.send(strMsg);
	else
		XMLReq1.send(null);
		
	if (bASync)return true;
	this.reqResponseCode = XMLReq1.status;
	this.ProcessResXML (XMLReq1);
	var strRes = XMLReq1.responseText;
	XMLReq1 = null;
	return strRes;
}

OutputNetworkLayer.prototype.ProcessResXML = function(objXML)
{
	var strXML = objXML.responseText;
	var nRet = false;
	try{
		if (!(ie || ie7 || ie8))
		{
			if (strXML == null)return true;
			if (strXML.indexOf("<?xml") != 0)return true;
			var parser = new DOMParser();
			var objXDoc = parser.parseFromString(strXML, "text/xml");
			var objNodes = objXDoc.getElementsByTagNameNS("http://schemas.xmlsoap.org/soap/envelope/", "Fault");
			if(objNodes && objNodes.length > 0)this.ProcessNetError();
			else nRet = true;
		}
		else
		{
			if (objXML.responseText.indexOf("<SOAP-ENV:Fault") >= 0)this.ProcessNetError();
			else nRet = true;
		}
	}catch(e){nRet = true;}
	return nRet;
}
OutputNetworkLayer.prototype.OnHTTPResponse = function()
{
	try{
	if (this.objXML != null && this.objXML.readyState == 4)
	{
		if (this.objXML.status == 200)
		{
			if (this.NetError)
			{
				clientDriver.ResetMessage();
			}
			if (this.ProcessResXML(this.objXML))
			{
				this.Connected = true;
				var strText = this.objXML.responseText;
				if (this.NetError && strText.search(/<html>No Data<\/html>/i) < 0 && this.AgentID){enableDisplay(true);
					displayMessage(new Date(), 0 /*MSG_FORMAT_SYSTEM*/, this.getLangStringWithVariable(OutputNetworkLayer.LANG_STRING_CONNECT_WITH, getClientName(this.AgentID)), undefined, undefined);
					setStatusText(this.getLangString(OutputNetworkLayer.LANG_STRING_SESSION_CONNECT_REP));
				}
				this.NetError = false;
				this.ParseResponse (strText);
			}
		}
		else this.ProcessNetError();
		this.objXML = null;
	}
	}catch(e){this.objXML = null;this.ProcessNetError();}
}

OutputNetworkLayer.prototype.ProcessNetError = function()
{
	enableDisplay(false);
	this.Connected = false;
	this.NetError = true;
	if (this.Connected)
	{
		displayMessage(new Date(), 0 /*MSG_FORMAT_SYSTEM*/, this.getLangString(OutputNetworkLayer.LANG_STRING_MAIN_NTWKERR_LOSTCONN), undefined, undefined);
		setStatusText(this.getLangString(OutputNetworkLayer.LANG_STRING_MAIN_TALK_CONNNNECTING));
	}
	else
		setStatusText(this.getLangString(OutputNetworkLayer.LANG_STRING_MAIN_NTWKERR_LOSTCONN));
}
OutputNetworkLayer.prototype.OnHTTPCustReqResponse = function()
{
	try{
	if (this.objCustXML != null && this.objCustXML.readyState == 4)
	{
		if (this.objCustXML.status == 200)
		{
			this.MsgQueue.Done();
			this.SendMsg.length == 0;
			var strText = this.objCustXML.responseText;
			this.ParseResponse (strText);
			this.objCustXML = null;
			this.ProcessPending();
		}
		else
		{
			this.Ping = setTimeout (this.Name + ".ProcessPending();", 5000);
			this.objCustXML = null;
		}
	}
	}catch(e){}
}

OutputNetworkLayer.prototype.OnNetError = function(bCust)
{
	this.Ping = setTimeout (this.Name + ".ProcessPending();", 5000);
	this.objCustXML = null;
}

OutputNetworkLayer.prototype.ProcessPending = function()
{
	this.Ping = 0;
	if (this.MsgQueue.Exists())
	{
		var arrReq = this.MsgQueue.Get();
		this.SendHTTP (arrReq[0], arrReq[1], arrReq[2], true, true);
		return true;
	}
	return false;
}
OutputNetworkLayer.prototype.ParseResponse = function(strResponse, bClear, action)
{
	var bRet = false;
	var re = /(ESBLOB|ESQUERY)[\r]*\nContent-Length: \d+[\r]*\n[\r]*\n\d+ /i;
	while(true)
	{
		var nHeadEnd = strResponse.indexOf("\r\n\r\n");
		var nPad = 4;
		var nHeadLen = 0;
		if (nHeadEnd == -1)
		{
			nHeadEnd = strResponse.indexOf("\n\n");
			nPad = 2;
		}
		if (nHeadEnd > -1)
		{
			nHeadLen = nHeadEnd + nPad;
		}
		var oBlob = new this.Blob();
		var nContentLen = this.ProcessHeader (strResponse.substr(0, nHeadLen), nHeadLen, oBlob);
		if (nContentLen > 0)
		{
			var strMsg = encodeUTF(strResponse.substr(nHeadLen));
			var nTotalPos = 0;
			var strTemp = strMsg;
			while (true)
			{
				var nNextMsg = strMsg.search(re);
				if (nNextMsg < 0 || nNextMsg == nContentLen){nTotalPos = -1;break;}
				if (nTotalPos + nNextMsg != nContentLen)
				{
					var arrNew = strTemp.substr(0,nTotalPos + nNextMsg).match(/\n/g);
					if (arrNew != null && (nContentLen - arrNew.length) == (nTotalPos + nNextMsg)){nTotalPos += nNextMsg;break;}
				}
				nTotalPos += nNextMsg + 5;
				strMsg = strTemp.substr(nTotalPos);
			}
			strMsg = strTemp;
			nNextMsg = nTotalPos;
			if (nNextMsg > 0 && nNextMsg != nContentLen)nContentLen = nNextMsg;
			oBlob.Content = decode2UTF(strMsg.substr(0, nContentLen));
			this.ProcessBlob(oBlob, bClear);
		}
		else
		{
			var strNetWrk = strResponse.substr(0, nHeadLen);
			if (strNetWrk.indexOf("<!--NETCOM--->") < 0 && strNetWrk.indexOf("<!NETCOM--->") <0 )
			{
				if (strResponse.search(/<html>No Data<\/html>/i) >= 0 && !this.bDisconnecting)
				{
					this.MsgQueue.Clear();
					if (this.SessionID > 0)clientDriver.onEndSession(this.SessionID);
					this.UserID = 0;
					this.SessionID = 0;
					this.AgentID = 0;
					try{if (this.objXML)this.objXML.abort();}catch(e){}
					this.objXML = null;
					//this.reconnect(true);
				}
				else if (action == 3099)
				{
					this.MsgQueue.Clear();
					this.SessionID = 0;
				}
				return bRet;
			}
			bRet = true
		}
		strResponse = decode2UTF(encodeUTF(strResponse.substr(nHeadLen)).substr(nContentLen));
	}
	return bRet;
}

OutputNetworkLayer.prototype.ProcessHeader = function (strHeader, nHeadLen, oBlob)
{
	var nPos = strHeader.indexOf("\n");
	if (nPos < 0) return 0;
	oBlob.Name = strHeader.substr(0, nPos);

	nPos = strHeader.indexOf("Content-Length: ");
	if (nPos < 0)return 0;
	return parseInt(strHeader.substr(nPos + 16))
}

OutputNetworkLayer.prototype.run = function()
{
	if (this.SessionID <= 0){return;}
	if (!this.SendHTTP(100, "UPDATE"))
	{
		return;
	}
	setTimeout("window['" + this.Name + "'].run();", this.PollInterval);
}

OutputNetworkLayer.prototype.ProcessBlob = function(oBlob, bClear)
{
	if (oBlob.Name == "")return;
	if (oBlob.Name == "ESBLOB")
	{
		this.ProcessData (oBlob.Content, bClear);
	}
	else if (oBlob.Name == "ESQUERY")
	{
		this.onRecvBlob (oBlob);
	}
	else
	{
		displayMessage(new Date(), 0, "<I>" + this.getLangString(98) + "</I>", undefined, undefined);
	}
}

OutputNetworkLayer.prototype.isDigit = function(data)
{
	return (/[0-9]/).test(data);
}

String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, "");
}

OutputNetworkLayer.prototype.ProcessData = function(data, bClear)
{

    var code=0;
    try {
        if (data == "")
            return;
        var cnt = 0;
        while (cnt < data.length && this.isDigit(data.charAt(cnt)))
            cnt++;
        if (cnt < 1)
            return;
        code = parseInt(data.substring(0, cnt));
        if (data.length > cnt)
            data = data.substring(cnt).trim();
        else
            data = ""; //$NON-NLS-1$
            
        
        if (code > 10000 && code < 10100) {
            clientDriver.onLoginStatus(code, data);
            return;
        }
        

        switch (code) {
            
            case 10000:
                Session = parseInt(data);
                this.SessionID = Session;
				clientDriver.onConnected(Session, bClear);
				sessionstarted();
                break;
            case 10508:
            case 10505:
				if (this.Buffer)
				{
					for (var i = 0;i < this.Buffer.length;i++){
						displayMessage(this.Buffer[i][0], this.Buffer[i][1], safeHTMLEncode(this.Buffer[i][2]), this.Buffer[i][3], this.Buffer[i][4]);
					} 
				}
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() < 1)break;
                //boolean bRepTransfer = false;
                //bRepTransfer = parseInt(s.NXTKN())==1;
                var typeoftransfer = parseInt(s.Get(0));
                var szTransferMsg="";
                if (s.length > 1)
                    szTransferMsg = s.Get(1);
                if (typeoftransfer == 1)clientDriver.onTransferCallToRep("");
                else if (typeoftransfer == 2)clientDriver.onTransferCallToQueue("2");
                else clientDriver.onTransferCallToQueue("3");
                break;
            case 10510:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() >= 1){var fn = function(val){val = parseInt((val == "")?"0":val);return val;}
            		clientDriver.onRecvQueuePosition(fn(s.NXTKN()));
            	}
                break;
            case 10511: // replaced 10510 starting in NetAgent 6.6
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() >= 4){var fn = function(val){val = parseInt((val == "")?"0":val);return val;}
            		clientDriver.onRecvQueuePosition(fn(s.NXTKN()), fn(s.NXTKN()), fn(s.NXTKN()), fn(s.NXTKN()));
            	}
                break;
            case 10512:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() >= 3){var fn = function(val){val = parseInt((val == "")?"0":val);return val;}
            		clientDriver.onRecvQueuePosition(-1, fn(s.NXTKN()), fn(s.NXTKN()), fn(s.NXTKN()));
            	}
                break;
            case 10600:
				this.AgentID = data;
				clientDriver.onStartSession(data); // data is the agent ID.
				sessionstartedwithagent();
				break;
            case 10700:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() >= 3)clientDriver.onRecvMessage(s.NXTKN(), s.NXTKN(), s.ALLTKN());
                break;
            case 10716:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 7)clientDriver.onRecvWebRequest(s.NXTKN(), s.NXTKN(), s.NXTKN(), s.NXTKN(),s.NXTKN(), s.NXTKN(), s.NXTKN());
                break;
           case 10701:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 3)clientDriver.onRecvUrl(s.NXTKN(), s.NXTKN(), s.NXTKN());
                break;
            case 10702:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 2)clientDriver.onRecvWebScriptMessage(s.NXTKN(), s.NXTKN());
                break;
            case 10703:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 2)clientDriver.onRecvWebScriptUrl(s.NXTKN(), s.NXTKN());
                break;
            case 10704:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 3)clientDriver.onRecvFile(s.NXTKN(),s.NXTKN(), s.NXTKN());
                break;
            case 10705:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 3)clientDriver.onRecvEmail(s.NXTKN(),s.NXTKN(), s.NXTKN());
                break;
            case 10706:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 2)clientDriver.onRecvWebScriptFile(s.NXTKN(), s.NXTKN());
                break;
            case 10707:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 2)clientDriver.onRecvWebScriptEmail(s.NXTKN(), s.NXTKN());
                break;
            case 10708:
                var s = new STKNZR(data,"\001");
				this.bSilent = true;
                if (s.noTKNS() == 5)clientDriver.onRecvWarmTransfer(s.NXTKN(), s.NXTKN(), s.NXTKN(), s.NXTKN(), s.NXTKN());
                break;
            case 10709:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 3)clientDriver.onRecvEmagicCommand(s.NXTKN(), s.NXTKN(), s.NXTKN());
                break;
            case 10711:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 3)clientDriver.onRecvEmagicFormData(s.NXTKN(), s.NXTKN(), s.NXTKN());
                break;
            case 10712:
                var st = new STKNZR(data,"\003");
                if (st.noTKNS() % 2 == 0) {
					while (st.isExt()) {
						var name = st.NXTKN();
						var value = st.NXTKN();
						if (name == "companyname")clientDriver.onCompanyName(value);
						if (name == "multiallow"){clientDriver.onAllowNationalization(!(value.trim()== "0"));}
					}
				}
				clientDriver.onReceiveOptionsString(data);
				break;
            case 10714:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 3)clientDriver.onReceiveEventFromAgent(s.NXTKN(), s.NXTKN(), s.NXTKN());
                break;
            case 10715:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 1)clientDriver.onReceiveOrigSubject(s.NXTKN(), this.LoginName);
                break;
			case 10719:
                var s = new STKNZR(data,"\001");
                var p1,p2,p3,p4;
                p4=undefined;
                if (s.noTKNS() == 3) {
                    p1= s.NXTKN();
                    p2= s.NXTKN();
                    p3= s.NXTKN();
                    clientDriver.onRecvTypingStatus(p1, p2, p3, undefined); //without displayName
                } else if (s.noTKNS() == 4) {
                    p1= s.NXTKN();
                    p2= s.NXTKN();
                    p3= s.NXTKN();
                    p4= s.NXTKN();
                    clientDriver.onRecvTypingStatus(p1, p2, p3, p4); //with displayName
                }
				setTimeout ("clientDriver.onRecvTypingStatus("+p1+","+p2+", 0, undefined);", 10000);
                break;
			case 10721:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 3)clientDriver.onReceiveGUID(s.NXTKN(),s.NXTKN(),s.NXTKN());
                break;
			case 10722:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 1)clientDriver.onReceivePortalExitTarget(s.NXTKN());
                break;
			case 10723:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 1)clientDriver.onReceivePortalExitLastPush(s.NXTKN());
                break;
			case 10724:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 5)
					clientDriver.onVoipRequest(s.NXTKN(),s.NXTKN(),s.NXTKN(),s.NXTKN(),s.NXTKN());
                break;
			case 10742:
               var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 1)clientDriver.onReceivePortalExitEnabled(s.NXTKN());
                break;                
			case 10725:
				var s = new STKNZR(data,"\001");
				if (s.noTKNS() >= 3) {
					// Ignore the first 2 parameters
					s.NXTKN(); // session ID
					s.NXTKN();
					clientDriver.onVoipEnd(s.NXTKN());
				}
                break;
			case 10726:
				var s = new STKNZR(data,"\001");
				if (s.noTKNS() >= 1) {
					clientDriver.onSetHideInput(s.NXTKN());
				}
				break;
			case 10507:		// resume session
				var s = new STKNZR(data,"\001");
				if (s.noTKNS() == 3)
				{
					clientDriver.onResumeSession(s.NXTKN(),s.NXTKN(),s.NXTKN());
					sessionstartedwithagent();
				}
				for (var i = 0;i < this.Buffer.length;i++){
					displayMessage(this.Buffer[i][0], this.Buffer[i][1], safeHTMLEncode(this.Buffer[i][2]), this.Buffer[i][3], this.Buffer[i][4]);
				} 
				break;
			case 10717:		// suspend session
				var s = new STKNZR(data,"\001");
				if (s.noTKNS() == 3)
				{
					this.SessionID = 0;
					clientDriver.onSuspendSession(s.NXTKN(),s.NXTKN(),s.NXTKN(), this);
					sessionended();
				}
				break;
			case 10720:
				break;
			case 10790:
				var s = new STKNZR(data,"\001");
				if (s.noTKNS() >= 3)
				{
					clientDriver.onEnterSession(s.NXTKN(), s.NXTKN(), s.NXTKN());
					sessionstartedwithagent();
				}
				break;
            case 10797:
                var s = new STKNZR(data, "\001");
                if (s.noTKNS() == 2) clientDriver.onAbortSession(s.NXTKN(), s.NXTKN());
                break;
            case 10798:
                var s = new STKNZR(data, "\001");
                if (s.noTKNS() ==2)clientDriver.onLeaveSession(s.NXTKN(), s.NXTKN());
                break;
            case 10799:
		//this.MsgQueue.Clear();
		//this.SessionID = 0;
		var s = new STKNZR(data, "\001");
		if (s.noTKNS() == 6)
		{
                	clientDriver.onEndSession(s.NXTKN(), s.NXTKN(), s.NXTKN(), s.NXTKN(), s.NXTKN(), s.NXTKN()); // data is the session ID.
		}
		else
		{
                	clientDriver.onEndSession(data, null); // data is the session ID.
		}
				this.SessionID = 0;
                break;
            case 10802:
				var s = new STKNZR(data,"\001");
				var imgURL = s.NXTKN();
				if (s.noTKNS() != 2)break;
				clientDriver.onAgentPhoto (imgURL, s.NXTKN());
                break;
            case 10900:
                break;
            case 11013:
                var s = new STKNZR(data, "\001", true); // Get tokens so we do not miss empty strings.
                if (s.noTKNS()>=7) {
                    var ScriptID = s.NXTKN();
                    var ActionID = s.NXTKN();
                    var Question = s.NXTKN();
                    var Url	   = s.NXTKN();
                    var Responses="";
                    while(s.isExt()) {
                        var temp;
                        temp = s.NXTKN();
                        if (temp.trim() != "")
                            Responses += temp + "\001";
                    }
                    if (Question == "\001")
                        Question = "";
                    if (Url == "\001")
                        Url = "";
                    clientDriver.onRecvBranchScript(ScriptID, ActionID, Question, Url, Responses);
                }
                break;
            case 11015:
                var s = new STKNZR(data, "\001");
                if (s.noTKNS()>=3)clientDriver.onRecvBranchScriptQuestion(s.NXTKN(),s.NXTKN(),s.NXTKN());
                break;
            case 11016:
                var s = new STKNZR(data, "\001");
                if (s.noTKNS()>=3)clientDriver.onRecvBranchScriptUrl(s.NXTKN(),s.NXTKN(),s.NXTKN());
                break;
            case 11020:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 4)clientDriver.onWebCollabAgreement(s.NXTKN(), s.NXTKN(), s.NXTKN(), s.NXTKN());
                break;
            case 11024:
//                clientDriver.onWebCollabStart();
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 3) clientDriver.onWebCollabAgreementNotNeeded(s.NXTKN(), s.NXTKN(), s.NXTKN());
                break;
            case 11028:
                var s = new STKNZR(data, "\001");
                if (s.noTKNS()>=3)
			clientDriver.onRecvPromoteTocoBrowsePlus(s.NXTKN(),s.NXTKN(),s.NXTKN());
		else if (s.noTKNS()>=2)
			clientDriver.onCoBrowsePlusAgreementNotNeeded(s.NXTKN(),s.NXTKN());
                break;
            case 11034:
				var s = new STKNZR(data,"\001");
				if (s.noTKNS() >= 1)clientDriver.onCoBrowseEnd(s.NXTKN());
				break;
            case 10739:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 2)clientDriver.onRecvChatScriptMessage(s.NXTKN(), s.NXTKN());
                break;
            case 10740:
                var s = new STKNZR(data,"\001");
                if (s.noTKNS() == 2)clientDriver.onRecvChatScriptUrl(s.NXTKN(), s.NXTKN());
                break;
            case 10743:
                clientDriver.onRecvTimeoutPrompt();
                break;
            case 11026:
                var s = new STKNZR(data,"\001");
				if (s.noTKNS() >= 2)clientDriver.onCoBrowseCertificateAccept(s.NXTKN(),s.NXTKN(), s.NXTKN());
                break;
            case 11038:
                clientDriver.onCoBrowseStart();
                break;
            default:
                //onRecvUnknown(code, data);
                break;
        }
    } catch (e) {
    }
}

OutputNetworkLayer.prototype.onRecvBlob = function(oBlob)
{
	appletReady();
	var MSG_FORMAT_AGENT =		1;
	var MSG_FORMAT_CUST =		2;

     var data = oBlob.Content;
     if (data == "")
 		return;

     if (oBlob.Name == "ESQUERY")
     {
         var start = data.indexOf("\n");
         if (start < 0) return;
         start++;

         var end = data.indexOf("\n", start);
         if (end < 0) return;

         var code = parseInt(data.substring(start, end));

         var stuff = data.substring(end+1);

         var rows = stuff.split("\02");

         var agentName = "";
         agentName = "Agent";
		var lastDate = new Date();
		var lastMsgOwner = 0;
		var msgIndex = 0;
		for(var i=1; i < rows.length;i++)
		{
			var cols = rows[i].split("\01");
			if(cols.length >3 && cols.length <=4)
			{
				var who = cols[0];
				var time = cols[1];
				var what = cols[2];
				var content = "";
				if(cols.length==4) content = cols[3];

				try{
					var iwhat = parseInt(what);
					if(iwhat == 179){
					    agentName = content;
					}
					if (iwhat >= 1000 && iwhat < 2000 || iwhat >= 2000 && iwhat < 3000)
					{
						var msg = content;
					}
					else
						var msg = this.formatSessionEvent( iwhat, who, content, agentName);
					if (msg.length > 0)
					{
					    var itime = parseInt(time);
						itime *= 1000;
					    var date = new Date( itime );
					    if (iwhat == 100) {
							this.Buffer.push([date, MSG_FORMAT_AGENT ,msg,"",who.substr(0,who.indexOf(":"))]);
							lastDate = date;
							lastMsgOwner = iwhat;
							msgIndex = 0;
					    } else if (iwhat == 200) {
							this.Buffer.push([date, MSG_FORMAT_CUST ,msg,"",this.LoginName]);
							lastDate = date;
							lastMsgOwner = iwhat;
							msgIndex = 0;
					    } else {
							if (Date.parse(lastDate) == Date.parse(date) && iwhat == (lastMsgOwner + msgIndex.toString()))
							{
								this.Buffer[this.Buffer.length - 1][2] += msg;
								msgIndex++;
							}
					        //displayMessage(date, MSG_FORMAT_SYSTEM ,msg,"","SYSTEM");
					    }
					}
				}catch(e){
				}
			}

		}
    }
    else
    {
        return;
    }
    data = null;

}

OutputNetworkLayer.prototype.formatSessionEvent = function(iCode, sWho, sContent, name)
{
        var sName = "";
        var lPos;
        var sEvent = "";
        var lEnd;
        var lStart;
        var sTag = "";
        var sTmp = "";
        var finished = false;
        sEvMp = new Array();
        var cnt = " %~content~%";
        sEvMp[100] = cnt;
        sEvMp[105] = cnt;
        sEvMp[110] = cnt;
        sEvMp[120] = cnt;
        sEvMp[171] = "Response: %~content~%";
        sEvMp[173] = " %~content~% ";
        sEvMp[174] = cnt;
        sEvMp[177] = " %~content~% ";
        sEvMp[178] = " %~content~% ";
        sEvMp[185] = " %~content~% ";
        sEvMp[186] = " %~content~% ";
        sEvMp[200] = cnt;
        sEvMp[300] = cnt;
        sEvMp[310] = cnt;
        sEvMp[310] = cnt;
        sEvMp[320] = cnt;
        sEvMp[330] = cnt;

        switch (iCode) {
            case 80:case 47:case 172:
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9:
                finished = true;
                break;
            case 179:
                sName = sContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
                break;
            default:
                lPos = sWho.indexOf(':');
                if (lPos >= 0) {
                    sName = sWho.substring(0, lPos).trim();
                } else {
                    sName = sWho.trim();
                }
                break;
        }

		name = "";
        if (! finished)
        {
           if ((iCode > 999) && (iCode < 3000)) {
              sEvent = "%~content~%";
            } else {
                if (sEvMp.length > iCode)
                    sEvent = sEvMp[iCode]; //get event msg
                else
                    sEvent = "";
                if (sEvent == null)
                    sEvent = "";
            }

            lStart = 0;
            while ((lEnd = sEvent.indexOf("%~", lStart)) > 0)
            {
                lPos = sEvent.indexOf("~%", lEnd + 1);
                if (lPos > lEnd)
                {
                    sTmp += sEvent.substring(lStart, lEnd); // before tag
                    sTag = sEvent.substring(lEnd + 2, lPos); // tag
                    if (sTag.search(/name/i) > -1) {
                        sTmp += sName;
                    } else if (sTag.search(/content/i) > -1) {
                        sTmp += sContent;
                    } else if (sTag.search(/transferdest/i) > -1) {
                        lEnd = sContent.indexOf(':');
                        if (lEnd >= 0)
                            sTmp += sContent.substring(1, lEnd);
                        else
                            sTmp += sWho;
                    }
                }
                lStart = lPos + 2;
            }
            sEvent = sTmp + sEvent.substring(lStart);

            if (sEvent.search(/\[\]$/) > -1)
                sEvent = sEvent.substring(0, sEvent.length() - 2);

            name += sName;
        }
        return sEvent;
}

OutputNetworkLayer.prototype.GetServerBaseUrl = function()
{
	var UrlStr;
	UrlStr = document.location.protocol + "//" + document.location.host + this.ServerURL;
	return UrlStr;
}

OutputNetworkLayer.prototype.sendMessage = function(Msg)
{
	this.SendHTTP (4100, this.SessionID + "\001" + Msg, true, true);
	//this.SendHTTP(4100, Msg, true, true);
}

OutputNetworkLayer.prototype.sendCustMsg = OutputNetworkLayer.prototype.sendMessage;
OutputNetworkLayer.prototype.sendServerAutoPilotResponse = function(ScriptID, ActionID, LastActionID, Comment, LastResponse)
{
    this.SendHTTP(8200, ScriptID + "\001" + ActionID + "\001" + Comment + "\001\001" + this.SessionID + "\001" + LastActionID + "\001" + LastResponse, true, true);
}
OutputNetworkLayer.prototype.cancelAutoPilotScript = function(ScriptID)
{
    this.SendHTTP(8200, ScriptID + "\0010\001\001\001" + this.SessionID + "\0010\001", true, true);
}

OutputNetworkLayer.prototype.customerTimeoutState = function(state)
{
    this.SendHTTP(4118, this.SessionID + "\001" + state, true, true);
}

OutputNetworkLayer.prototype.setCustomerTyping = function (Msg)
{
	this.SendHTTP(4107, this.SessionID + "\001" + "1", true, true);
}

OutputNetworkLayer.prototype.sendWebCollabAgreementResponse = function(Agree)
{
    this.SendHTTP(4924, this.SessionID + "\001" + Agree, true, true);
}

OutputNetworkLayer.prototype.sendCobrowseCertificateResponse = function(Agree)
{
    this.SendHTTP(4926, Agree, true, true);
}

OutputNetworkLayer.prototype.sendCobrowsePlusAgreementResponse = function(Agree)
{
    this.SendHTTP(4929, this.SessionID + "\001" + Agree, true, true);
}

OutputNetworkLayer.prototype.sendCobrowseEnd = function()
{
    this.SendHTTP(4933, this.SessionID + "\001" + "0", true, true);
}

OutputNetworkLayer.prototype.sendExitRequest = function()
{
	this.bSilent = true;
	this.SendHTTP(4194, this.SessionID, true, true);
    this.SendHTTP(4199, this.SessionID, true, true);
}

OutputNetworkLayer.prototype.shutDown = function()
{
	sessionended();
	this.bDisconnecting = true;
	this.SendHTTP(3099, "", false, true);
	this.bDisconnecting = false;
}

OutputNetworkLayer.prototype.shutDownNoLogoff = function(){}

OutputNetworkLayer.prototype.OnUnload = function()
{
	//alert("3");
	//sessionended();
    this.SendHTTP(4199, this.SessionID, false, false);
}

OutputNetworkLayer.prototype.OnEndSessionNavigate = function()
{
    this.SendHTTP(4193, this.SessionID, true, true);    
}

OutputNetworkLayer.prototype.reconnect = function(bClear)
{
	this.Connect(bClear);
}

