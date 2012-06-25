/*!
 *
 * @name jQuery destaque queue
 * @namespace jQuery
 * @author Alexandre Magno, Túlio Ornelas, Daniel Fernandes and Emerson Macedo (http://blog.alexandremagno.net)
 * @version 0.1
 * @description Use this component to make destaque work enhanced for more than one destaque in a page
 * @requires
 *   jquery.destaque
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *   jquery.scrollTo
 *   jquery.easing
 */

;(function ( $, window, document, undefined ) {

    $.fn.destaquesQueue = function ( options ) {

        var options = $.extend( {}, $.fn.destaquesQueue.options, options );
        var instances = [];
        var Destaques = {
          init: function(index, el) {
            instances[index] = $(el).destaque({
              slideMovement: options.slideMovement,
              slideSpeed: options.slideSpeed,
              autoSlideDelay: options.SlideDelay,
              elementSpeed: options.elementSpeed,
              stopOnMouseOver: false,
              easingType: options.easingType,
              itemSelector: options.itemSelector,
              itemForegroundElementSelector: options.itemForegroundElementSelector
            });
            Destaques.pause();
            for(var i=0; i<instances.length; i++) {
             Destaques.resume(i);
            }     
          },
          pause: function() {
            for(var i=0; i<instances.length; i++) {
             instances[i].pause();
            }     
          },
          move: function(i, direction){
            instances[i].slideSetAndMove(direction);
          },
          resume: function(i) {
             instances[i].resume();
          }
        };
        if(options.stopOnMouseOver) {
          this.parent().mouseover(function(){
            Destaques.pause();            
           }).mouseleave(function() {
              for(var i=0; i<instances.length; i++) {
               window.setTimeout(Destaques.resume, i*options.delay, i);
              }
           });          
        }
        $(options.controlsSelector).bind('click', function() {
          var direction = $(this).attr("rel") === "prev" ? "toRight" : "toLeft";
          for(var i=0; i<instances.length; i++) {
            window.setTimeout(Destaques.move, i*options.delay, i, direction);
           }
          return false;
        });
        return this.each(function (index, el) {
              var elem = $(this);
              window.setTimeout(Destaques.init, index*options.delay, index, el);                
        });
    };

    // Globally overriding options

    $.fn.destaquesQueue.options = {
        delay: 250,
        controlsSelector: "#slide-triple-pagination a",
        stopOnMouseOver: true,
        slideMovement: 100,
        slideSpeed: 1000,
        autoSlideDelay: 3000,
        elementSpeed: 1100,
        easingType: "easeInOutExpo",
        itemSelector: ".item-triple",
        itemForegroundElementSelector: ".foreground-triple .element"
    };

})( jQuery, window, document );