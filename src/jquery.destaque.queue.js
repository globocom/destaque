/*!
 * jQuery Destaque Queue - Make jquery.destaque work enhanced for more than one instance in a page
 * https://github.com/globocom/destaque
 * version: 0.1.0
 */

;(function ($, window, document, undefined) {

  $.fn.destaquesQueue = function (options) {
    var options = $.extend({}, $.fn.destaquesQueue.options, options);
    return new DestaqueWrapper(options, $(this));
  };

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

  var DestaqueWrapper = function(options, elements) {
    this.options = options;
    this.elements = elements;
    this.instances = [];
    this.currentSlide = 0;

    this._initializeMouseEvents();
    this._initializeControls();
    this._initKeyboardListeners();
    this._queue(this._initializeDestaque);

    this.options.onInit.call(this);
  };

  DestaqueWrapper.prototype = {
    pause: function() {
      this._queue(this.pauseFor);
    },

    pauseFor: function(index) {
      this.instances[index].pause();
    },

    resume: function() {
      this._queue(this.resumeFor);
    },

    resumeFor: function(index) {
      this.instances[index].resume();
    },

    slideSetAndMove: function(direction) {
      this._queue(this.slideSetAndMoveFor, direction);
    },

    slideSetAndMoveFor: function(index, direction) {
      this.instances[index].slideSetAndMove(direction);
    },

    goTo: function(slideNumber) {
      this._queue(this.goToFor, slideNumber);
    },

    goToFor: function(index, slideNumber) {
      this.instances[index].goTo(slideNumber);
    },

    refresh: function(newParams) {
      this._queue(this.refreshFor, newParams);
    },

    refreshFor: function(index, newParams) {
      this.instances[index].refresh(newParams);
    },

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
      var self = this;
      var args = arguments[1];
      $(self.elements).each(function(index, el){
        window.setTimeout(function(){

          method.call(self, index, args);

        }, self.options.delay * index);
      });
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
        self._queue(self.slideSetAndMoveFor, direction);
      });
    },

    _initKeyboardListeners: function() {
      var self = this;
      $("body").bind("keydown.destaqueQueue", function(e) {

        if (e.keyCode === 37) {
          self._queue(self.slideSetAndMoveFor, "toRight");
        } else {
          self._queue(self.slideSetAndMoveFor, "toLeft");
        }

      });
    }
  };

})(jQuery, window, document, undefined);