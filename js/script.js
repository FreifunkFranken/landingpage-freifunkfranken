if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
  var viewportmeta = document.querySelectorAll('meta[name="viewport"]')[0];
  if (viewportmeta) {
    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
    document.body.addEventListener('gesturestart', function() {
      viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    }, false);
  }
}

/*
// Set the initial width
$('.column-width').text($('.column-width').width()/16+'em');
$('.aside-width').text($('.aside-width').width()/16+'em');

// Find the width on resize
$(window).resize(function() {
  $('.column-width').text($('.column-width').width()/16+'em');
  $('.aside-width').text($('.aside-width').width()/16+'em');
});

$('.column-width').waypoint(function(event, direction) {
  if (direction === 'down') {
    $('#main').addClass('fixed');
  }  else {
    $('#main').removeClass('fixed');
  }
});
*/

/* START GEO Location experiments: */
$(document).ready(function() {

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
	sponsores.hide();
	sponsores.append('<h3>Knoten in deiner Nähe:</h3>');
	sponsores.append('<p class="sponsor"><a href="https://netmon.freifunk-franken.de/router_status.php?router_id=' + nodes[0].id + '">' + nodes[0].name + '</a></p>');
	sponsores.append('<p class="sponsor"><a href="https://netmon.freifunk-franken.de/router_status.php?router_id=' + nodes[1].id + '">' + nodes[1].name + '</a></p>');
	sponsores.append('<p class="sponsor"><a href="https://netmon.freifunk-franken.de/router_status.php?router_id=' + nodes[2].id + '">' + nodes[2].name + '</a></p>');
	sponsores.fadeIn('slow');
}

function loadKnotList(position) {
	var nodes;
	$.getJSON('api/nodes.json', function(nodes, textStatus, jqXHR) {
		showNearNodes(nodes, position);
	}).fail(function(jqxhr, textStatus, error) {
		console.error('error loading nodes.json: ', error)
	});
}

function geolocation_action(position){
	//only do this once
	if (geo.isLoaded) return;
	geo.isLoaded = true;
	setTimeout(function() {
		//invalidate the position after 5 Seconds
		geo.isLoaded = false;
	}, 5000);
	
	geo.position = position;
	
	$('#statistics_position').html(
		"LON: " + Math.round( position.coords.longitude *10000)/10000 + ", " + 
		"LAT: " + Math.round( position.coords.latitude *10000)/10000
	);
	loadKnotList(position);
}

if (!geo.isLoaded) {
	navigator.geolocation.getCurrentPosition(geolocation_action, errors_action);
}

});
/* END GEO Location experiments: */