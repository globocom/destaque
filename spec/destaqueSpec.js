describe("Destaque Slideshow Plugin", function() {
  var destaque;

  beforeEach(function() {
    loadFixtures("default.html");
  });

  describe("Plugin initialization", function() {
    beforeEach(function() {
      destaque = $("#slide-container").destaque({
        itemSelector: ".item",
        itemForegroundElementSelector: ".foreground .element"
      });
    });

    it("should use default values", function() {
      expect(destaque.params.currentSlide).toBe(0);
      expect(destaque.params.slideSpeed).toBe(1000);
    });

    it("should allow the user to override the default values", function() {
      expect(destaque.params.itemSelector).toBe(".item");
      expect(destaque.params.itemForegroundElementSelector).toBe(".foreground .element")
    });

    describe("Calculated options", function() {
      it("should mark the component as initialized", function() {
        expect(destaque.params.initialized).toBe(true);
      });

      it("should mark the component as not animating", function() {
        expect(destaque.params.animating).toBe(false);
      });

      it("should store the base size", function() {
        expect(destaque.params.baseSize).toBe( $("#slide-container").width() );
      });

      it("should store the number of slides", function() {
        expect(destaque.params.slideSum).toBe(4);
      });
    });
  });

  describe("Callbacks", function() {
    beforeEach(function() {
      destaque = $("#slide-container").destaque({
        itemSelector: ".item",
        itemForegroundElementSelector: ".foreground .element",

        onInit:           jasmine.createSpy("onInit"),
        onSlideLoad:      jasmine.createSpy("onSlideLoad"),
        beforePageUpdate: jasmine.createSpy("beforePageUpdate"),
        onPageUpdate:     jasmine.createSpy("onPageUpdate"),
        onResume:         jasmine.createSpy("onResume"),
        onPause:          jasmine.createSpy("onPause")
      });
    });

    it("should call onInit", function() {
      expect(destaque.params.onInit).toHaveBeenCalledWith(destaque);
    });

    describe("Initial onSlideLoaded callbacks", function() {
      it("should load the first slide", function() {
        expect(destaque.params.onSlideLoad).
          toHaveBeenCalledWith(destaque, $(".item.slide-1").get(0), 0);
      });

      it("should load the last slide", function() {
        expect(destaque.params.onSlideLoad).
          toHaveBeenCalledWith(destaque, $(".item.slide-4").get(0), 3);
      });

      it("should load the second slide", function() {
        expect(destaque.params.onSlideLoad).
          toHaveBeenCalledWith(destaque, $(".item.slide-2").get(0), 1);
      });

      it("should not load the third slide", function() {
        expect(destaque.params.onSlideLoad).
          not.toHaveBeenCalledWith(destaque, $(".item.slide-3").get(0), 2);
      });
    });

    describe("Automatic slide switching callbacks", function() {

      it("should call onResume after resuming", function() {
        destaque.resume();
        expect(destaque.params.onResume).toHaveBeenCalledWith(destaque);
      });

      it("should call onPause after pausing", function() {
        destaque.pause();
        expect(destaque.params.onPause).toHaveBeenCalledWith(destaque);
      });
    });

    describe("Pagination callbacks", function() {
      beforeEach(function() {
        destaque.params.currentSlide = 0;
        destaque.slideSetAndMove("toLeft");
      });

      it("should call beforePageUpdate before paginate", function() {
        var data = {
          currentSlide: 0,
          totalSlides: 4
        };

        expect(destaque.params.beforePageUpdate).
          toHaveBeenCalledWith(destaque, data);
      });

      it("should call onPageUpdate after paginate", function() {
        var data = {
          currentSlide: 1,
          totalSlides: 4
        };

        expect(destaque.params.onPageUpdate).
          toHaveBeenCalledWith(destaque, data);
      });
    });
  });

  // TODO: Pending tests

  xdescribe("Event listeners", function() {
    describe("Control-based pagination listeners", function() {
      // Pagination links
    });

    describe("Keyboard-based pagination listeners", function() {
      // Arrow keys
    });

    describe("Gesture-based pagination listeners", function() {
      // Swipeleft and swiperight
    });

    describe("Window listeners", function() {
      // Resize
    });
  });

  xdescribe("Pause automatic slide switching", function() {
    it("should only pause if not currently animating", function() {
    });

    it("should stop automatic slide switching timer", function() {
    });
  });

  xdescribe("Resume automatic slide switching", function() {
    it("should only resume if not currently animating", function() {
    });

    it("should start automatic slide switching timer", function() {
    });
  });

  xdescribe("Slide pagination", function() {
    xdescribe("Paginate to left", function() {
    });

    xdescribe("Paginate to right", function() {
    });
  });
});
