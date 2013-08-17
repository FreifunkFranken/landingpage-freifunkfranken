$(document).ready(function() {
	
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	var viewportmeta = document.querySelectorAll('meta[name="viewport"]')[0];
	if (viewportmeta) {
		viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
		document.body.addEventListener('gesturestart', function() {
			viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
		}, false);
	}
}


/*****************************************************************************
 * Accordion
 ****************************************************************************/
$('.accordion').accordion({
	handleSelector: 'h3',
	contentSelector: 'p',
	initState: (($(window).height() > 800) ? 'open' : 'closed')
});


/*****************************************************************************
 * Read parameters from url and create the "Access Please" Button
 * Parameters:
 *   access: the url to the welcome-page
 *	  req: the url to the url originally requested by the user
 ****************************************************************************/
function getUrlParams() {
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.hash.split('#?')[1];
	
	if (!query || query.length <= 0) return {};
	
	//get parameters from url
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
			// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
};

function createAccessButton() {
	var urlParams = getUrlParams();
	if (urlParams.access && urlParams.req) {
		$('#accessBtn').empty().html(
			'<a href="'+urlParams.access+
			'?req='+encodeURIComponent(urlParams.req)+
			'"><span>Weitersurfen</span></a>');
	}
}

createAccessButton();




/*****************************************************************************
 * Get the node-list and show the nodes near to the user
 ****************************************************************************/
geo = {};
geo.position = null;
geo.isLoaded = false;

function errors_action(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED: console.error("Der Nutzer möchte keine Daten teilen."); break;
		case error.POSITION_UNAVAILABLE: console.error("Die Geodaten sind nicht erreichbar."); break;
		case error.PERMISSION_DENIED: console.error("Timeout erhalten"); break;
		default: console.error("Unbekannter Error"); break;
	}
}

function showNearNodes(nodes, position) {	
	//calculate distances to the client
	$.each(nodes, function(index, node) {
		var delta_lat = Math.abs(node.lat - position.coords.latitude);
		var delta_lon = Math.abs(node.lon - position.coords.longitude);
		
		var distance = Math.sqrt(delta_lat*delta_lat + delta_lon*delta_lon);
		node.distance = distance;
		//console.log("Node " + node.name + ": Distance: " + distance);
	});
	
	nodes.sort(function (a, b) {
		return ((a.distance < b.distance) ? -1 : ((a.distance > b.distance) ? 1 : 0));
	});
	
	var sponsores = $('section.sponsores');
	
	//hide and empty sponsor list
	sponsores.hide().empty();

	var nearNodesAvailible = false;
	var sponsoresList = $('<ul>');
	
	$.each(nodes, function(index, node) {
		//only show nodes that are really near the user. Nodes in many km distance are not interesting.
		//console.log(nodes[index].distance);
		if (nodes[index].distance < 0.1) {
			sponsoresList.append('<li><a href="https://netmon.freifunk-franken.de/router_status.php?router_id=' + nodes[index].id + '">' + nodes[index].name + '</a></li>');
			nearNodesAvailible = true;
		}
	});
	
	// if any nearby nodes exist show them 
	if (nearNodesAvailible) {
		sponsores.append('<h3>Knoten in deiner Nähe:</h3>');
		sponsores.append(sponsoresList);
		sponsores.fadeIn('slow');
	}
}

function loadKnotList(position) {
	var nodes;
	$.getJSON('api/nodes.json', function(nodes, textStatus, jqXHR) {
		console.log(nodes);
		showNearNodes(nodes, position);
	}).fail(function(jqxhr, textStatus, error) {
		console.error('error loading nodes.json: ', error)
	});
}

function geolocation_action(position){
	//do this once every 30 seconds
	if (geo.isLoaded) return;
	geo.isLoaded = true;
	setTimeout(function() {
		geo.isLoaded = false;
		navigator.geolocation.getCurrentPosition(geolocation_action, errors_action);
	}, 30000);
	
	geo.position = position;
	/*
	$('#statistics_position').html(
		"LON: " + Math.round( position.coords.longitude *10000)/10000 + ", " + 
		"LAT: " + Math.round( position.coords.latitude *10000)/10000
	);
	*/
	loadKnotList(position);
}

//get current location to start loading the node-list
//navigator.geolocation.getCurrentPosition(geolocation_action, errors_action);




/*****************************************************************************
 * Get access and redirect the user to the original location
 ****************************************************************************/
$('#accessBtn').click(function(e) {
	//prevent opening the clicked link
	e.preventDefault();

	//show loading animation
	var $btn = $(this);
	$btn.empty().html('<img src="images/loading.gif" />');
	
	$.ajax({
		type: "GET", 
		url: "FreifunkFrankenAccess.html",
		success: function(data){
			//wait for 2 seconds to give the proxy-server time to write the access rights into the database
			//and than go to the page the user originally requested
			setTimeout(function() {
				history.go(-1); //see bug #32
				//window.history.back()
			}, 2000);
			
			setTimeout(function() {
				//history.go(-1); //see bug #32
				window.history.back()
			}, 2100);
			
			//$('#container').fadeOut(2500);
		},
		error: function() {
			alert("Es gab leider ein Problem :-(");
			window.location.reload()
		}
	});
});

});