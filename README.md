# Destaque

Destaque is a simple slideshow plugin with built-in parallax effect.

Refer to the [jQuery Destaque website](http://globocom.github.com/destaque/) for examples.

## Browser Compatibility

* IE 7+
* Firefox 3.6+
* Chrome 4+
* Safari 5+
* Opera 10.10+

## Dependencies

* [jQuery](http://jquery.com) 1.7.2
* [jQuery UI](http://jqueryui.com) 1.8.18
* [jQuery Mobile Events](https://github.com/jvduf/jquery-mobile-events)
  (support for swipe gestures. Optional)
* [jQuery Transition](https://github.com/louisremi/jquery.transition.js)
  (for smoother transitions using CSS3. Optional)

## Usage

````javascript

$("#slide-container").destaque({
  itemSelector: ".item",
  itemForegroundElementSelector: ".foreground .element",
  controlsSelector: "#slide-pagination a"
});
````

Now the HTML:

````html
<div id="slide-container">
  <div class="item">
    <div class="foreground">
      <div class="element">Text 1</div>
      <div class="element">Text 2</div>
      <div class="element">Text 3</div>
    </div>
  </div>

  <div class="item">
    <div class="foreground">
      <div class="element">Text 1</div>
      <div class="element">Text 2</div>
      <div class="element">Text 3</div>
    </div>
  </div>

  <div class="item">
    <!-- ... -->
  </div>
</div>

<p id="slide-pagination">
  <a href="#" rel="prev">Previous</a> - <a href="#" rel="next">Next</a>
</p>
````

### Plugin Initialization

#### Callbacks

* **onInit(instanceOfDestaque)**: Called right after the plugin initialization.
* **onResize(instanceOfDestaque)**: Called when the window is resized.
* **onPause(instanceOfDestaque)**: Called after the automatic slide switching is paused.
* **onResume(instanceOfDestaque)**: Called after the automatic slide switching is resumed.
* **onSlideLoad(instanceOfDestaque, item, index)**: Called after a slide is loaded.
* **beforePageUpdate(instanceOfDestaque, pageData)**: Called before slide pagination. ex: pageData = {currentSlide: 0, totalSlides: 10}
* **onPageUpdate(instanceOfDestaque, pageData)**: Called after slide pagination.

#### Options

* **currentSlide** (default: 0): First slide to be active.
* **slideSpeed** (default: 1000): Transition speed of slides.
* **slideMovement** (default: 150): Amount of space the current slide shifts, in pixels, when switching to the
next slide.
* **slideDirection** (default: "toLeft"): Direction in which the slides shift to.
* **elementSpeed** (default: 1000): Transition speed of foreground elements.
* **autoSlideDelay** (default: 3000): Automatic slide switching delay.
* **resumeSlideDelay** (default: 250): Minimum delay before the automatic slide switching starts after being paused.
* **stopOnMouseOver** (default: true): Pauses automatic slide switching when the mouse is over the container.
* **easingType** (default: "easeInOutExpo"): Easing type used in slide and foreground elements transitions.
* **itemDefaultZIndex** (default: 10): Z-index assigned to each slide.
* **itemSelector** (default: "div.item"): CSS selector used to find each slide.
* **itemLoadedClass** (default: "loaded"): CSS calss added right after a slide is loaded.
* **activeItemClass** (default: "active"): CSS class added to the active slide.
* **itemForegroundElementSelector** (default: ".foreground img"): CSS selector used to find each foreground element withing a slide.
* **controlsSelector** (default: undefined): CSS selector used to find the pagination links.

#### Methods

* **pause()**: Pauses the slideshow until a mouseover happens or resume is called
* **resume()**: Resumes the slideshow
* **restart()**: Sends the slideshow to the first page
* **goTo(index)**: Sends the slideshow to the given page, starts with 0.
* **refresh(paramsToOverride)**: Overrides some params and recalculates. Keeps the current page. Used for adaptative layouts.
* **slideSetAndMove(direction)**: Changes the slide direction. Does not work if the slide is animating. The possible values are "toLeft" or "toRight".

# Destaque Queue

Makes jquery.destaque work enhanced for more than one instance in a page

Refer to the [jQuery Destaque website](http://globocom.github.com/destaque/) for examples.

## Usage

````javascript
$('.triple-slides').destaquesQueue({
 delay: 250,
 itemSelector: ".item-triple",
 itemForegroundElementSelector: ".foreground-triple .element",
 controlsSelector: "#slide-pagination a"
});
````

````html
<div id="multiple-slide-container" class="slides">
  <h2>Multiple slides example:</h2>
  <div class="triple-slides">
    <div class="item-triple">
      <div class="foreground-triple">
        <div class="element">Text 1</div>
      </div>
    </div>
    <!-- the same markup for other itens -->
  </div>
  <div class="triple-slides">
    <div class="item-triple">
      <div class="foreground-triple">
        <div class="element">Text 2</div>
      </div>
    </div>
    <!-- the same markup for other itens -->
  </div>
  <div class="triple-slides">
    <div class="item-triple">
      <div class="foreground-triple">
        <div class="element">Text 3</div>
      </div>
    </div>
    <!-- the same markup for other itens -->
  </div>
</div>

<p id="slide-pagination">
  <a href="#" rel="prev">Previous</a> - <a href="#" rel="next">Next</a>
</p>
````

### Plugin Initialization

#### Callbacks

Same as destaque

#### Options

Same as destaque with:

* **delay** (default: 250): Delay between destaques.

#### Methods

Same as destaque with:

* **pauseFor(index)**
* **resumeFor(index)**
* **goToFor(index, slideNumber)**
* **refreshFor(index, paramsToOverride)**
* **slideSetAndMoveFor(index, direction)**

## Authors

* [Daniel Martins](https://github.com/danielfm)
* [Túlio Ornelas](https://github.com/tulios)
* [Emerson Macedo](https://github.com/emerleite)
* [Alexandre Magno](https://github.com/alexanmtz)

## License

Copyright (c) 2012 Globo.com - Webmedia. See COPYING for more details.