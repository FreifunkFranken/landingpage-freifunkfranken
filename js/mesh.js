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
    
    var btnClose = $('<div class="button" id="btnCloseMesh">Animation entfernen</div>')
      .css({
        "position": "fixed", 
        "top": "10px", 
        "right": "10px", 
        "width": "160px"
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