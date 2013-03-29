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


function errors_action(error) {
  switch(error.code){
    case error.PERMISSION_DENIED: alert("Der Nutzer m&ouml;chte keine Daten teilen.");break;
    case error.POSITION_UNAVAILABLE: alert("Die Geodaten sind nicht erreichbar.");break;
    case error.PERMISSION_DENIED: alert("Timeout erhalten");break;
    default: alert ("Unbekannter Error");break;
  }
}

function geolocation_action(position){
  $('#statistics_position').html(
    "LON: " + Math.round( position.coords.longitude *10000)/10000 + ", " + 
    "LAT: " + Math.round( position.coords.latitude *10000)/10000
  );
}

navigator.geolocation.getCurrentPosition(geolocation_action, errors_action);