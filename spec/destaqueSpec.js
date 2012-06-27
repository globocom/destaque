describe("destaque Slideshow Plugin", function() {

  beforeEach(function() {
    jasmine.Clock.useMock();
    loadFixtures("default.html");
    $.fx.off = true;
  });

  describe("Plugin initialization", function() {
    beforeEach(function() {
      this.destaque = $("#slide-container").destaque({
        itemSelector: ".item",
        itemForegroundElementSelector: ".foreground .element"
      });
    });

    it("should use default values", function() {
      expect(this.destaque.params.currentSlide).toBe(0);
      expect(this.destaque.params.slideSpeed).toBe(1000);
    });

    it("should allow the user to override the default values", function() {
      expect(this.destaque.params.itemSelector).toBe(".item");
      expect(this.destaque.params.itemForegroundElementSelector).toBe(".foreground .element")
    });

    describe("Calculated options", function() {
      it("should mark the component as initialized", function() {
        expect(this.destaque.params.initialized).toBe(true);
      });

      it("should mark the component as not animating", function() {
        expect(this.destaque.params.animating).toBe(false);
      });

      it("should store the base size", function() {
        expect(this.destaque.params.baseSize).toBe( $("#slide-container").width() );
      });

      it("should store the number of slides", function() {
        expect(this.destaque.params.slideSum).toBe(4);
      });
    });
  });

  describe("Callbacks", function() {
    beforeEach(function() {
      this.destaque = $("#slide-container").destaque({
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
      expect(this.destaque.params.onInit).toHaveBeenCalledWith(this.destaque);
    });

    describe("Initial onSlideLoaded callbacks", function() {
      it("should load the first slide", function() {
        expect(this.destaque.params.onSlideLoad).
          toHaveBeenCalledWith(this.destaque, $(".item.slide-1").get(0), 0);
      });

      it("should load the last slide", function() {
        expect(this.destaque.params.onSlideLoad).
          toHaveBeenCalledWith(this.destaque, $(".item.slide-4").get(0), 3);
      });

      it("should load the second slide", function() {
        expect(this.destaque.params.onSlideLoad).
          toHaveBeenCalledWith(this.destaque, $(".item.slide-2").get(0), 1);
      });

      it("should not load the third slide", function() {
        expect(this.destaque.params.onSlideLoad).
          not.toHaveBeenCalledWith(this.destaque, $(".item.slide-3").get(0), 2);
      });
    });

    describe("Automatic slide switching callbacks", function() {

      it("should call onResume after resuming", function() {
        this.destaque.resume();
        expect(this.destaque.params.onResume).toHaveBeenCalledWith(this.destaque);
      });

      it("should call onPause after pausing", function() {
        this.destaque.pause();
        expect(this.destaque.params.onPause).toHaveBeenCalledWith(this.destaque);
      });
    });

    describe("Pagination callbacks", function() {
      beforeEach(function() {
        this.destaque.params.currentSlide = 0;
        this.destaque.slideSetAndMove("toLeft");
      });

      it("should call beforePageUpdate before paginate", function() {
        var data = {
          currentSlide: 0,
          totalSlides: 4
        };

        expect(this.destaque.params.beforePageUpdate).
          toHaveBeenCalledWith(this.destaque, data);
      });

      it("should call onPageUpdate after paginate", function() {
        var data = {
          currentSlide: 1,
          totalSlides: 4
        };

        expect(this.destaque.params.onPageUpdate).
          toHaveBeenCalledWith(this.destaque, data);
      });
    });
  });

  // TODO: Pending tests
  describe("Methods", function(){
    beforeEach(function() {
      //jasmine.Clock.useMock();
      this.destaque = $("#slide-container").destaque({
        itemSelector: ".item",
        itemForegroundElementSelector: ".foreground .element",
        controlsSelector: '#slide-pagination a'
      });
      this.destaque.pause();
    });
    it('should back to first page on restart', function(){
      $("#slide-pagination a[rel='next']").trigger('click');
      this.destaque.restart();
      expect(this.destaque.params.currentSlide).toBe(0);
    });
    afterEach(function(){
      this.destaque.restart();
    });
  });

  describe("Event listeners", function() {
    beforeEach(function() {
      this.destaque = $("#slide-container").destaque({
        itemSelector: ".item",
        itemForegroundElementSelector: ".foreground .element",
        controlsSelector: '#slide-pagination a'
      });
      this.destaque.pause();
    });
    describe("Control-based pagination listeners", function() {
      it("should go to next page", function(){
        $("#slide-pagination a[rel='next']").trigger('click');
        expect($('.slide-1').hasClass('active')).toBeFalsy;
        expect($('.slide-2').hasClass('active')).toBeTruthy;
        expect(this.destaque.params.currentSlide).toBe(1);
      });
      it("should go to previous page", function(){
        $("#slide-pagination a[rel='prev']").trigger('click');
        expect($('.slide-1').hasClass('active')).toBeFalsy;
        expect($('.slide-0').hasClass('active')).toBeTruthy;
        expect(this.destaque.params.currentSlide).toBe(3);
      });
    });

    describe("Keyboard-based pagination listeners", function() {
      it("should go to next page", function(){
        var e = jQuery.Event('keydown', {
          keyCode: 39
        });
        this.destaque.element.focus();
        this.destaque.element.trigger(e);
        expect($('.slide-1').hasClass('active')).toBeFalsy;
        expect($('.slide-2').hasClass('active')).toBeTruthy;
        expect(this.destaque.params.currentSlide).toBe(1);
      });
      it("should go to previous page", function(){
        var e = jQuery.Event('keydown', {
          keyCode: 37
        });
        this.destaque.element.focus();
        this.destaque.element.trigger(e);
        expect($('.slide-1').hasClass('active')).toBeFalsy;
        expect($('.slide-0').hasClass('active')).toBeTruthy;
        expect(this.destaque.params.currentSlide).toBe(3);
      });
    });

    describe("Gesture-based pagination listeners", function() {
      it("should go to next page", function(){
        this.destaque.element.trigger("swipeleft");
        expect($('.slide-1').hasClass('active')).toBeFalsy;
        expect($('.slide-2').hasClass('active')).toBeTruthy;
        expect(this.destaque.params.currentSlide).toBe(1);
      });
      it("should go to previous page", function(){
        this.destaque.element.trigger("swiperight");
        expect($('.slide-1').hasClass('active')).toBeFalsy;
        expect($('.slide-0').hasClass('active')).toBeTruthy;
        expect(this.destaque.params.currentSlide).toBe(3);
      });
    });

    describe("Window listeners", function() {
      it("should call onResize if the window is resized", function(){
        var resizeDestaque = $("#slide-container").destaque({
          itemSelector: ".item",
          itemForegroundElementSelector: ".foreground .element",
          autoSlideDelay: 0,
          controlsSelector: '#slide-pagination a',
          onResize: jasmine.createSpy("onPause")
        });
        resizeDestaque.pause();
        $(window).trigger('resize');
        expect(resizeDestaque.params.onResize).toHaveBeenCalledWith(resizeDestaque);
      });
    });
  });

  describe("Pause automatic slide switching", function() {
    beforeEach(function() {
      this.destaque = $("#slide-container").destaque({
        itemSelector: ".item",
        itemForegroundElementSelector: ".foreground .element",
        autoSlideDelay: 200,
        controlsSelector: '#slide-pagination a'
      });
    });
    it("should pause when method pause is called", function(){
      expect(this.destaque.params.currentSlide).toBe(0);
      this.destaque.pause();
      jasmine.Clock.tick(200);
      expect(this.destaque.params.currentSlide).toBe(0);
    });
  });

  describe("Resume automatic slide switching", function() {
     beforeEach(function() {
      this.destaque = $("#slide-container").destaque({
        itemSelector: ".item",
        itemForegroundElementSelector: ".foreground .element",
        autoSlideDelay: 100,
        controlsSelector: '#slide-pagination a'
      });
      this.destaque.pause();
    });
    it("should resume when resume is called", function(){
      expect(this.destaque.params.currentSlide).toBe(0);
      this.destaque.resume();
      jasmine.Clock.tick(100);
      expect(this.destaque.params.currentSlide).toBe(1);
    });
  });
  afterEach(function(){
     this.destaque.restart();
  });
});
describe("destaque slideshow plugin multiple", function(){
  beforeEach(function() {
    jasmine.Clock.useMock();
    loadFixtures("double.html");
    $.fx.off = true;
  });
  describe("two slides in same page", function(){
    beforeEach(function(){
      this.destaqueFirst = $("#slide-first").destaque({
        itemSelector: ".item",
        itemForegroundElementSelector: ".foreground .element",
        autoSlideDelay: 100,
        controlsSelector: '#slide-pagination a'
      });
      this.destaqueSecond = $("#slide-second").destaque({
        itemSelector: ".item",
        itemForegroundElementSelector: ".foreground .element",
        autoSlideDelay: 100,
        controlsSelector: '#second-slide-pagination a'
      });
      this.destaqueFirst.pause();
      this.destaqueSecond.pause();
    });
    it("should go to the second page with two slides in same time", function(){
      this.destaqueFirst.resume();
      this.destaqueSecond.resume();
      jasmine.Clock.tick(100);
      expect(this.destaqueFirst.params.currentSlide).toBe(1);
      expect(this.destaqueSecond.params.currentSlide).toBe(1);
      expect($('.slide-2', '#slide-first').hasClass('active')).toBeTruthy();
      expect($('.slide-2', '#slide-second').hasClass('active')).toBeTruthy();
    });
    it("should paginate each slide independent one from other", function(){
      $("#slide-pagination a[rel='next']").trigger('click');
      expect(this.destaqueFirst.params.currentSlide).toBe(1);
      expect(this.destaqueSecond.params.currentSlide).toBe(0);
      expect($('.slide-2', '#slide-first').hasClass('active')).toBeTruthy();
      expect($('.slide-2', '#slide-second').hasClass('active')).toBeFalsy();
    });
  });
  afterEach(function() {
    this.destaqueFirst.restart();
    this.destaqueSecond.restart();
  });
});
