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

;(function ($, window, document, undefined) {

  $.fn.destaquesQueue = function (options) {
    var options = $.extend({}, $.fn.destaquesQueue.options, options);
    return new DestaqueWrapper(options, $(this));
  }

  var DestaqueWrapper = function(options, elements) {
    this.options = options;
    this.elements = elements;
    this.instances = new Array(this.elements.length);
    this.currentSlide = 0;

    this._initializeMouseEvents();
    this._initializeControls();
    this._initKeyboardListeners();
    this._queue(this._initializeDestaque);
    
    this.options.onInit.call(this);
  }

  DestaqueWrapper.prototype = {
    _initializeDestaque: function(index) {
      var self = this;
      var element = self.elements.get(index);
      self.instances[index] = $(element).destaque({
        slideMovement: self.options.slideMovement,
        slideSpeed: self.options.slideSpeed,
        autoSlideDelay: self.options.autoSlideDelay,
        elementSpeed: self.options.elementSpeed,
        stopOnMouseOver: false,
        easingType: self.options.easingType,
        itemSelector: self.options.itemSelector,
        itemForegroundElementSelector: self.options.itemForegroundElementSelector,
        onPageUpdate: function(slideshow, pageData) {
          if(self.currentSlide !== pageData.currentSlide){
            self.options.onPageUpdate(self, slideshow, pageData);
          }
          self.currentSlide = pageData.currentSlide;
        },
        onInit: function() {
          $("body").unbind('keydown.destaque');
        }
      });
    },
    
    _queue: function(method) {
      for(var i = 0; i < this.instances.length; i++) {
         method.call(this, i, arguments[1]);
       }
    },

    _initializeMouseEvents: function() {
      if (this.options.stopOnMouseOver) {

        var self = this;
        var parent = $(this.elements).parent();

        parent.mouseover(function(){
          self._queue(self.pause);
        });

        parent.mouseleave(function() {
          self._queue(self.resume);
        });

      }
    },

    _initializeControls: function() {
      var self = this;
      $(this.options.controlsSelector).bind('click', function(e) {
        e.preventDefault();

        var direction = $(this).attr("rel") === "prev" ? "toRight" : "toLeft";
        self._queue(self.move, direction);
      });
    },
    
    _initKeyboardListeners: function() {
      var self = this;
      $("body").bind("keydown.destaqueQueue", function(e) {
        
        if (e.keyCode === 37) {
          self._queue(self.move, "toRight");
        } else {
          self._queue(self.move, "toLeft");
        }
      });
    },

    pause: function(index) {
      this.instances[index].pause();
    },

    resume: function(index) {
      this.instances[index].resume();
    },

    move: function(index, direction){
      var self = this;
      self.instances[index].slideSetAndMove(direction);
    }
  }

  $.fn.destaquesQueue.options = {
    delay: 250,
    stopOnMouseOver: true,
    controlsSelector: "#slide-triple-pagination a",
    slideMovement: 100,
    slideSpeed: 1000,
    autoSlideDelay: 3000,
    elementSpeed: 1100,
    easingType: "easeInOutExpo",
    itemSelector: ".item-triple",
    itemForegroundElementSelector: ".foreground-triple .element",
    onPageUpdate: function(slideshow, pageData){},
    onInit: function() {}
  };

})(jQuery, window, document, undefined);