//if (window.innerWidth && window.innerWidth <= 480)
var callCenter = '13671661897';
var telUser = '13671661897';
var serviceUrl = 'www.baidu.com';

var latitude = 22.2222;
var longitude = 11.1111;

var map;

if(true)
{
	var jQT = $.jQTouch({
        icon: 'kilo.png'
    });
	
	//google.maps.event.addDomListener(window, 'load', initializeMap);
}

function initializeMap() 
{
	if(checkConnection())
	{
		var myOptions = {
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		map = new google.maps.Map(document.getElementById('map_canvas'),myOptions);
  
		if(navigator.geolocation) 
		{
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
				latitude = position.coords.latitude;
				longitude = position.coords.longitude;
				//alert("latitude: " + position.coords.latitude + "\nlongitude: " + position.coords.longitude);
			
				var infowindow = new google.maps.InfoWindow({
					map: map,
			        position: pos,
			        content: 'Location found using HTML5.'
			    });

				map.setCenter(pos);
			}, function() {
				handleNoGeolocation(true);
			});
			detectBrowser();
			return true;
		}
		else 
		{
			alert('map error!');
			return false;
		}
	}
	else
	{
		alert('no network! no map!');
		return false;
	}
}

function detectBrowser() 
{
	  var useragent = navigator.userAgent;
	  var mapdiv = document.getElementById("map_canvas");
	    
	  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) 
	  {
	    mapdiv.style.width = '100%';
	    mapdiv.style.height = '100%';
	  } 
	  else 
	  {
	    mapdiv.style.width = '600px';
	    mapdiv.style.height = '800px';
	  }
}

function checkConnection() 
{
    var networkState = navigator.network.connection.type;
    
    var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    
    //alert('Connection type: ' + states[networkState]);
    
    states[Connection.UNKNOWN]  = false;
    states[Connection.ETHERNET] = true;
    states[Connection.WIFI]     = true;
    states[Connection.CELL_2G]  = true;
    states[Connection.CELL_3G]  = true;
    states[Connection.CELL_4G]  = true;
    states[Connection.NONE]  = false;
    
    return states[networkState];
}

function setNumber()
{
	if(document.getElementById('callcenter_phone').value=='')
	{
		return;
	}
	if(document.getElementById('user_phone').value=='')
	{
		return;
	}
	if(document.getElementById('service_url').value=='')
	{
		return;
	}
	callCenter = document.getElementById('callcenter_phone').value;
	telUser = document.getElementById('user_phone').value;
	serviceUrl = document.getElementById('service_url').value;
	
	alert('Number Change Success!');
}

function sendSMS(args)
{
	alert('send sms!');
//	window.plugins.sms.send(telArvato,args,function () {
//		alert('Message sent successfully! \nWe will call back soon...!');
//		},function (e) {alert('Message Failed:' + e);}
//	);
}

function sendRequest(args)
{
	if(args=='Get Lost')
	{
		// enterGetLostPage();
		args = args + "\nLatitude:" + latitude + " Longitude:" + longitude;
		args = args + '  \nUser Number:' +telUser;
	}
	else if(args=='Call taxi from location')
	{
		// enterCallTaxiPage();
		args = args + "\nLatitude:" + latitude + " Longitude:" + longitude;
		args = args + '  \nUser Number:' +telUser;
	}
	else if(args=='Emergency SMS')
	{
		args = args + '  \nUser Number:' +telUser;
	}
	else if(args=='submit reservation')
	{
		args = args + "\nLatitude:" + latitude + " Longitude:" + longitude;
		args = args + "\nResturant Name: " + document.getElementById('resturant_name').value;  
		args = args + "\nMeal Time: " + document.getElementById('meal_time').value;  
		args = args + "\nNumber of People: " + document.getElementById('people_number').value;  
	}
	var hasNetwork = checkConnection();
	if(!hasNetwork)
	{
		alert('No Network!\nCall Center: ' + callCenter + ' \n\nMessage: ' + args);
		sendSMS(args);
	}
	else
	{
		alert('Has Network!' + ' \n\nMessage: ' + args);
	}
}

function enterGetLostPage()
{
	var hasNetwork = initializeMap();
	if(hasNetwork)
	{
		document.getElementById('lostMap').style.display="block";
	}
	else
	{
		document.getElementById('lostMap').style.display="none";
	}
}

function enterCallTaxiPage()
{
	var hasNetwork = initializeMap();
	if(hasNetwork)
	{
		document.getElementById('taxiMap').style.display="block";
	}
	else
	{
		document.getElementById('taxiMap').style.display="none";
	}
}