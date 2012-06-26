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
    var options = $.extend({}, $.fn.destaque.options, options);
    return new DestaqueWrapper(options, $(this));
  }

  var DestaqueWrapper = function(options, elements) {
    this.options = options;
    this.elements = elements;
    this.instances = [];
    this.currentSlide = 0;

    this._initializeMouseEvents();
    this._initializeControls();
    var self = this;

    for(var i = 0; i < this.elements.length; i++) {
      this._initializeDestaque(i);
    }

    this.options.onInit(this);
  }

  DestaqueWrapper.prototype = {
    _initializeDestaque: function(index) {
      var self = this;
      window.setTimeout(function(){
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
          }
        });

      }, index * self.options.delay);
    },

    _initializeMouseEvents: function() {
      if (this.options.stopOnMouseOver) {

        var self = this;
        var parent = $(this.elements).parent();
        parent.mouseover(function(){
          self.pause();
        });

        parent.mouseleave(function() {
          for(var i = 0; i < self.instances.length; i++) {
            self.resume(i);
          }
        });

      }
    },

    _initializeControls: function() {
      var self = this;
      $(this.options.controlsSelector).bind('click', function(e) {
        e.preventDefault();

        var direction = $(this).attr("rel") === "prev" ? "toRight" : "toLeft";
        for(var i = 0; i < self.instances.length; i++) {
          self.move(i, direction);
        }
      });
    },

    pause: function() {
      for(var i = 0; i < this.instances.length; i++) {
        this.instances[i].pause();
      }
    },

    move: function(index, direction){
      var self = this;
      window.setTimeout(function(){
        self.instances[index].slideSetAndMove(direction);
      }, index * this.options.delay);
    },

    resume: function(index) {
      var self = this;
      window.setTimeout(function(){
        self.instances[index].resume();
      }, index * this.options.delay)
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