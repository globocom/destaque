/*!
 * jQuery Destaque - a simple slideshow plugin with built-in parallax effect
 * https://github.com/globocom/destaque
 * version: 0.2.0
 */

;(function ($, window, document, undefined) {

  $.fn.destaque = function(params) {
    var params = $.extend({}, $.fn.destaque.options, params);
    return new Destaque(this, params);
  };

  $.fn.destaque.options = {
    currentSlide: 0,
    slideSpeed: 1000,
    slideMovement: 150,
    slideDirection: "toLeft",
    elementSpeed: 1000,
    autoSlideDelay: 3000,
    resumeSlideDelay: 250,
    stopOnMouseOver: true,
    easingType: "easeInOutExpo",
    itemDefaultZIndex: 10,
    itemSelector: "div.item",
    itemLoadedClass: "loaded",
    activeItemClass: "active",
    itemForegroundElementSelector: ".foreground img",

    // Callbacks
    onInit: function (slideshow) {},
    onResize: function (slideshow) {},
    onPause: function(slideshow) {},
    onResume: function(slideshow) {},
    onSlideLoad: function(slideshow, item, idx) {},
    beforePageUpdate: function(slideshow, pageData) {},
    onPageUpdate: function(slideshow, pageData) {}
  };

  var Destaque = function (element, params) {
    this.element = $(element);
    this.params = params;

    this.params.initialized = false;
    this.params.mouseOver = false;
    this.params.animating = false;

    this.params.autoId = 0;
    this.params.autoTimeStamp = 0;

    this._initElements();
    this._initListeners();

    this.params.onInit(this);
  };

  Destaque.prototype = {
    pause: function() {
      var params = this.params;

      if (!params.animating) {
        params.mouseOver = true;
        window.clearTimeout(params.autoId);
        params.onPause(this);
      }
    },

    resume: function() {
      var self = this;
      var params = this.params;

      if (!params.animating) {
        params.mouseOver = false;

        var timeout = 0;

        if (params.autoSlideDelay - (new Date().getTime() - params.autoTimeStamp) < 0) {
          timeout = params.resumeSlideDelay;
        } else {
          timeout = params.autoSlideDelay - (new Date().getTime() - params.autoTimeStamp);
        }

        params.autoId = window.setTimeout(function() {
          self._slideElementsOut();
        }, timeout);

        params.onResume(this);
      }
    },

    restart: function() {
      this.goTo(0);
    },

    slideSetAndMove: function(direction, targetToClear) {
      var params = this.params;

      if (!params.animating) {
        if (direction === "toLeft") {
          params.slideDirection = "toLeft";
          params.elementDirection = "fromLeft";
          this.element.removeClass("right").addClass("left");
        } else {
          params.slideDirection = "toRight";
          params.elementDirection = "fromRight";
          this.element.removeClass("left").addClass("right");
        }

        this._setElementPositions(true);
        this._slideElementsOut(targetToClear);
      }
    },

    goTo: function(slideNumber) {
      var params = this.params;
      var current = params.currentSlide;
      var currentSlide = this._currentSlide();

      if (slideNumber < 0 || slideNumber > params.slideSum) {
        return;
      }

      if (slideNumber > current || (current == params.slideSum && slideNumber == 0)) {
        params.currentSlide = slideNumber - 1;
        this.slideSetAndMove('toLeft', currentSlide);

      } else if (slideNumber < current) {
        params.currentSlide = slideNumber + 1;
        this.slideSetAndMove('toRight', currentSlide);
      }
    },

    refresh: function(newParams) {
      this.pause();
      this.params = $.extend({}, this.params, (newParams || {}));

      this.element.find(this.params.itemSelector + "." + this.params.activeItemClass).removeClass(this.params.activeItemClass);
      this.element.find(this.params.itemSelector).removeAttr("style").removeClass(this.params.itemLoadedClass).hide();
      this.element.find(this.params.itemSelector + " " + this.params.itemForegroundElementSelector).removeAttr("style");

      this.params.initialized = false;
      this._initElements();
      this.resume();
    },

    _initListeners: function() {
      this._initPaginationListeners();
      this._initMouseListeners();
      this._initKeyboardListeners();
      this._initMobileListeners();
      this._initWindowListeners();
    },

    _initPaginationListeners: function () {
      var self = this;

      if (!this.params.controlsSelector) {
        return;
      }
      $(this.params.controlsSelector).each(function() {
        $(this).bind("click.destaque", function(e) {
          e.preventDefault();

          var direction = $(this).attr("rel") === "prev" ? "toRight" : "toLeft";
          self.slideSetAndMove(direction);
        });
      });
    },

    _initMobileListeners: function() {
      var self = this;

      this.element.bind("swipeleft.destaque", function(e) {
        self.slideSetAndMove("toLeft");
      });

      this.element.bind("swiperight.destaque", function (e) {
        self.slideSetAndMove("toRight");
      });
    },

    _initMouseListeners: function () {
      var params = this.params;
      var self = this;

      if (params.slideSum > 1) {
        if (params.stopOnMouseOver) {
          this.element.mouseover(function() {
            self.pause();
          });

          this.element.mouseleave(function() {
            self.resume();
          });
        }
      }
    },

    _initKeyboardListeners: function() {
      var self = this;
      $("body").bind("keydown.destaque", function(e) {
        if (e.keyCode === 37) {
          self.slideSetAndMove("toRight");
        } else {
          if (e.keyCode === 39) {
            self.slideSetAndMove("toLeft");
          }
        }
      });
    },

    _initWindowListeners: function() {
      var self = this;

      $(window).bind("resize.destaque", function() {
        self.params.onResize(self);
      });
    },

    _initElements: function () {
      var element = this.element;
      var params = this.params;

      if (!params.initialized) {
        params.baseSize = element.width();
        params.slideSum = element.find(this.params.itemSelector).length;
        params.elementDirection = params.slideDirection === "toLeft" ? "fromLeft" : "toLeft";
        if (params.currentSlide < 0 || params.currentSlide >= params.slideSum) {
          params.currentSlide = 0;
        }

        this._initSlide();

        params.initialized = true;
      }
    },

    _initSlide: function() {
      var self = this;
      var params = this.params;

      this.element.find(params.itemSelector).each(function() {
        $(this).data("zIndex", params.itemDefaultZIndex).css({zIndex: params.itemDefaultZIndex});
      });

      this.element.find(params.itemForegroundElementSelector).each(function (idx, e) {
        var e = $(this);

        var initialX = parseInt(e.css("left"), 10) || 0;

        e.css({left: initialX});
        e.data("xPos", initialX).data("slidePos", 9999);
      });

      this._loadSlide();
      this._currentSlide().addClass(params.activeItemClass).show();
      this._slideElementsIn();

      params.autoTimeStamp = new Date().getTime();
    },

    _setElementPositions: function(justCalculate) {
      var params = this.params;
      var element, pos = 0;

      this._currentSlide().find(params.itemForegroundElementSelector).each(function(i) {
        element = $(this);

        if (params.elementDirection === "fromLeft") {
          pos = params.baseSize + (i * params.baseSize) - (i > 0 ? parseInt(element.data("xPos"), 10) : 0);
        } else {
          pos = -params.baseSize - (i * params.baseSize) + (i > 0 ? parseInt(element.data("xPos"), 10) : 0);
        }

        element.data("slidePos", pos);

        if (!justCalculate) {
          element.css({left: pos});
        }
      });
    },

    _moveSlide: function(targetToClear) {
      var self = this;
      var params = this.params;

      var initialPosition = 0;
      var outPosition = 0;
      var current = this._currentSlide();
      var next = this._nextSlide();
      params.animating = true;

      if (params.slideDirection === "toLeft") {
        outPosition = -params.slideMovement;
        next.css({left: params.baseSize, zIndex: params.itemDefaultZIndex + 1}).show();
      } else {
        outPosition = params.slideMovement;
        next.css({left: -params.baseSize, zIndex: params.itemDefaultZIndex + 1}).show();
      }

      next.stop().animate({left: initialPosition}, params.slideSpeed, params.easingType, function() {
        next.addClass(params.activeItemClass);
      });

      this._clearTarget(current, outPosition);
      if (targetToClear) {
        this._clearTarget(targetToClear, outPosition);
      }

      this._updateCurrentSlide();
    },

    _clearTarget: function(target, outPosition) {
      var params = this.params;
      target.css({zIndex: params.itemDefaultZIndex}).stop().animate({left: outPosition}, params.slideSpeed, params.easingType, function() {
        $(this).removeClass(params.activeItemClass).hide();
      });
    },

    _updatePagers: function(callback) {
      var params = this.params;
      var data = {
        currentSlide: params.currentSlide,
        totalSlides:  params.slideSum
      };

      return params[callback](this, data);
    },

    _currentSlide: function() {
      var params = this.params;
      return this.element.find(params.itemSelector).eq(params.currentSlide);
    },

    _previousPage: function() {
      var params = this.params;

      if (params.slideDirection === "toLeft") {
        if (params.currentSlide > 0) {
          return params.currentSlide - 1;
        } else {
          return this.element.find(params.itemSelector).length - 1;
        }
      } else {
        if (params.currentSlide < params.slideSum - 1) {
          return params.currentSlide + 1;
        } else {
          return 0;
        }
      }
    },

    _nextPage: function(idx) {
      var params = this.params;

      if (params.slideDirection === "toLeft") {
        if (params.currentSlide < this.element.find(params.itemSelector).length - 1) {
          return params.currentSlide + 1;
        } else {
          return 0;
        }
      } else {
        if (params.currentSlide > 0) {
          return params.currentSlide - 1;
        } else {
          return this.element.find(params.itemSelector).length - 1;
        }
      }
    },

    _nextSlide: function() {
      return this.element.find(this.params.itemSelector).eq(this._nextPage());
    },

    _updateCurrentSlide: function() {
      this.params.currentSlide = this._nextPage();

      this._loadSlide();
      this._slideElementsIn();
    },

    _loadSlide: function() {
      var self = this;
      var params = this.params;

      var slidesIdx = [
        params.currentSlide,
        this._previousPage(),
        this._nextPage()
      ];

      var i, idx;
      for (i = 0; i < slidesIdx.length; i++) {
        idx = slidesIdx[i];

        this.element.find(params.itemSelector).eq(idx).each(function() {
          if (!$(this).hasClass(params.itemLoadedClass)) {
            $(this).addClass(params.itemLoadedClass);
            params.onSlideLoad(self, this, idx);
          }
        });
      }
    },

    _slideElementsIn: function() {
      var self = this;
      var params = this.params;

      var current = this._currentSlide();
      var elementNum = current.find(params.itemForegroundElementSelector).length;

      this._setElementPositions();

      current.each(function() {
        $(this).find(params.itemForegroundElementSelector).each(function(i) {
          if (!params.initialized) {
            $(this).css({left: $(this).data("xPos")});

            if (elementNum - 1 === i && !params.mouseOver && params.slideSum > 1) {
              params.autoId = window.setTimeout(function() {
                self._slideElementsOut();
              }, params.autoSlideDelay);

              params.animating = false;
            }
          } else {
            params.animating = true;

            $(this).stop().css({left: $(this).data("slidePos")});
            $(this).animate({left: $(this).data("xPos")}, params.elementSpeed, params.easingType, function() {
              if (elementNum - 1 === i && params.slideSum > 1) {
                if (!params.mouseOver) {
                  params.autoId = window.setTimeout(function() {
                    self._slideElementsOut();
                  }, params.autoSlideDelay);
                }

                params.autoTimeStamp = new Date().getTime();
                params.animating = false;
              }
            });
          }
        });
      });
    },

    _slideElementsOut: function(targetToClear) {
      var params = this.params;

      if (params.slideSum < 2) {
        return;
      }

      if (this._updatePagers("beforePageUpdate") === false) {
        return;
      };

      params.animating = true;
      window.clearTimeout(params.autoId);

      this.element.find(params.itemSelector + " " + params.itemForegroundElementSelector).removeAttr("style");
      this.element.find(params.itemSelector + "." + params.activeItemClass + " " + params.itemForegroundElementSelector).each(function() {
        var pos = params.elementDirection === "fromLeft" ? $(this).data("slidePos") * -1 + params.baseSize - $(this).width() : $(this).data("slidePos") * -1;
        $(this).stop().animate({left: pos}, params.elementSpeed, params.easingType);
      });

      this._moveSlide(targetToClear);
      this._updatePagers("onPageUpdate");
    }
  };

})(jQuery, window, document, undefined);
