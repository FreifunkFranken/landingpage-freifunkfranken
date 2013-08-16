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
    
    var btnClose = $('<div id="btnCloseMesh">╳</div>')
      .css({
        "position": "fixed", 
        "top": "10px", 
        "right": "25px", 
        "font-size": "bigger",
        "text-align": "right",
        "font-weight": "900",
        "cursor": "pointer"
    }).click(function() {
      btnClose.remove();
      canvas.fadeOut(1000, function() {
        canvas.remove();
      });
    });
    
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = "js/libs/processing-1.4.1.min.js";
    
    canvas.hide();
    $('body').prepend(btnClose).prepend(canvas).append(script);
    canvas.fadeIn(2000);
 }
 
  if ( (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ) {
    //don't show mash on mobile devices
    return;
  } else if ($('html').width() <= 1024) {
    //don't show mash on small devices (tablets, small netbooks) 
    //because they usually lag the cpu power for the animation.
    return;	
  } else {
    createMeshAnimation();
  }

})(jQuery);