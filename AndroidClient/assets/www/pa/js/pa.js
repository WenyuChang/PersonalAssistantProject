function checkConnection()
{
	appendDebugMessage("Checking your network, if network isn't available, we will use SMS to request service.");
	var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = false;
    states[Connection.ETHERNET] = true;
    states[Connection.WIFI]     = true;
    states[Connection.CELL_2G]  = true;
    states[Connection.CELL_3G]  = true;
    states[Connection.CELL_4G]  = true;
    states[Connection.NONE]  = false;

    return states[networkState];
}

function appendDebugMessage(msg)
{
	if(msg=='')
	{
		$j("#dmsg").html('');
		return;
	}
	var html = $j("#dmsg").html();
	html += '<br/>- '+msg;
	$j("#dmsg").html(html);
}
function sendSMS(msg, callcenter_tel)
{
	//appendDebugMessage("SMS sent successfully! We will call back soon!");
	window.plugins.sms.send(callcenter_tel,msg,function ()
		{
			appendDebugMessage("SMS sent successfully! We will call back soon!");
		},
		function (e)
		{
			appendDebugMessage("Send SMS Failed [" + e + "]");
		}
	);
}

function sendRequest(op,lat,long)
{
	var storage = window.localStorage;
	var user_tel = storage.getItem('user_tel');
	var callcenter_tel = storage.getItem('callcenter_tel');
	var callcenter_url = storage.getItem('callcenter_url');
	
	if(user_tel==''||callcenter_tel==''||callcenter_url=='')
	{
		appendDebugMessage("<b>You need complete setting to submit!</b>");
		return;
	}
	else
	{
//		appendDebugMessage("<b>User Phone: </b>" + user_tel);
//		appendDebugMessage("<b>Call Center Phone: </b>" + callcenter_tel);
//		appendDebugMessage("<b>Call Center URL: </b>" + callcenter_url);
	}
	var param = "?op="+op+"&lat="+lat+"&long="+long;
	if (checkConnection())
	{
		$j.ajax(callcenter_url+param);
		appendDebugMessage("Sent your request by network successfully! We will call back soon!");
	}
	else
	{
		param = "user tel:" + user_tel + "\n" + param;
		sendSMS(param, callcenter_tel);
	}
}
function doLostWay()
{
	appendDebugMessage("Try to find your location.");

	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition
		(
			function(position)
			{
				lat = position.coords.latitude;
				long = position.coords.longitude;

				appendDebugMessage("Your location is found.");

				sendRequest('lostway',lat,long);
			},
			function() {
				lat = -1;
				long = -1;
				sendRequest('lostway',lat,long);

				appendDebugMessage("Fail to find your location. we need ask your location by phone call.");
			}
		);
	}
	else
	{
		lat = -1;
		long = -1;
		sendRequest('lostway',lat,long);
		appendDebugMessage("Your phone doesn't have location device. we need ask your location by phone call.");
	}
}
function doTranslation()
{
	sendRequest('translation',-1,-1);
}
function doEmergency()
{
	appendDebugMessage("Try to find your location in case this will help.");

	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition
		(
			function(position)
			{
				lat = position.coords.latitude;
				long = position.coords.longitude;

				appendDebugMessage("Your location is found.");

				sendRequest('emergency',lat,long);
			},
			function() {
				lat = -1;
				long = -1;
				sendRequest('emergency',lat,long);

				appendDebugMessage("Fail to find your location. we need ask your location if necessary.");
			}
		);
	}
	else
	{
		lat = -1;
		long = -1;
		sendRequest('emergency',lat,long);
		appendDebugMessage("Your phone doesn't have location device. we need ask your location if necessary.");
	}
}

function settingPara()
{
	appendDebugMessage('');
	var user_tel = $j('#user_phone').val();
	var callcenter_tel = $j('#callcenter_phone').val();
	var callcenter_url = $j('#service_url').val();
	
	if(user_tel==''||callcenter_tel==''||callcenter_url=='')
	{
		appendDebugMessage("<b>You need fill all the settings!</b>");
		return false;
	}
	else
	{
		var storage = window.localStorage;
		storage.setItem("user_tel",user_tel);
		storage.setItem("callcenter_tel",callcenter_tel);
		storage.setItem("callcenter_url",callcenter_url);
		
//		appendDebugMessage("<b>User Phone: </b>" + storage.getItem("user_tel"));
//		appendDebugMessage("<b>Call Center Phone: </b>" + storage.getItem("callcenter_tel"));
//		appendDebugMessage("<b>Call Center URL: </b>" + storage.getItem("callcenter_url"));
		
		appendDebugMessage("Save successfully!");
		return true;
	}
	
}

function getRequest(url)
{
	$j.ajax(
	{
		//url: "pc.changwy.com:8080/Personal_Assistant/PA_Servlet",
		url: "http://pc.changwy.com/requests.xml",
		dataType: "xml",
		type: "GET",
		beforeSend: function(XMLHttpRequest){alert('aaa')},
		success: function(ResponseText){alert('bbb')},
		complete: function(XMLHttpRequest, textStatus){alert('ccc')},
		error: function(){alert('ddd')}
	}
	);
}

function getHttpRequest()
{
	http_request = null;
	if (window.XMLHttpRequest)
	{
		http_request = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		http_request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return http_request;
}

function sendRequest(callcenter)
{
	var req = getHttpRequest();
	if (req)
	{
		var param = "?op=getRequests&lat=-1&long=-1";
		req.open('GET', callcenter+param, true);
		req.send(null);
		req.onreadystatechange = complete(req);	
	}
}

function complete(req)
{
	if (req.readyState == 4)
	{
		if (req.status == 200)
		{
			var mes = req.responseText;
		}
	}
}