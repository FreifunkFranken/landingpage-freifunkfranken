/*
 * 2013 by mojoaxel
 */
;(function($){

  function createMeshAnimation() {
    var canvas = $('<canvas data-processing-sources="js/mesh.pde" id="mesh"></canvas>')
      .css({ "position": "fixed",
           "top": "0px",
           "left": "0px",
           "height": "100%",
           "width": "100%",
           "z-index": "-999",
           "overflow": "hidden"
    });
  var script = document.createElement( 'script' );
  script.type = 'text/javascript';
  script.src = "js/libs/processing-1.4.1.min.js";
  $('body').prepend(canvas).append(script);
 }
 
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    return;
  } else {
    createMeshAnimation();
    $(window).resize(function() {
      //FIXME not working:
      //$('canvas#mesh').remove();
      //createMeshAnimation();
    });
  }

})(jQuery);