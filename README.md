# Destaque

Destaque is a simple slideshow plugin with built-in parallax effect.

## Browser Compatibility

* IE 7+
* Firefox 3.6+
* Chrome 4+
* Safari 5+
* Opera 10.10+

## Dependencies

* [jQuery](http://jquery.com) 1.7.2
* [jQuery UI](http://jqueryui.com) 1.8.18
* [jQuery Animate Enhanced](http://playground.benbarnett.net/jquery-animate-enhanced/)
  0.91 (for smoother transitions using CSS3. Optional)

## Usage

A functional demo can be found at the `example` directory, but in a nutshell
this is how the plugin must be instantiated:

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

**onInit**

Called right after the plugin initialization.

**onResize**

Called when the window is resized.

**onPause**

Called after the automatic slide switching is paused.

**onResume**

Called after the automatic slide switching is resumed.

**onSlideLoad**

Called after a slide is loaded.

**beforePageUpdate**

Called before slide pagination.

**onPageUpdate**

Called after slide pagination.

#### Options

**currentSlide** (default: 0)

First slide to be active.

**slideSpeed** (default: 1000)

Transition speed of slides.

**slideMovement** (default: 150)

Amount of space the current slide shifts, in pixels, when switching to the
next slide.

**slideDirection** (default: "toLeft")

Direction in which the slides shift to.

**elementSpeed** (default: 1000)

Transition speed of foreground elements.

**autoSlideDelay** (default: 3000)

Automatic slide switching delay.

**resumeSlideDelay** (default: 250)

Minimum delay before the automatic slide switching starts after being paused.

**stopOnMouseOver** (default: true)

Pauses automatic slide switching when the mouse is over the container.

**easingType** (default: "easeInOutExpo")

Easing type used in slide and foreground elements transitions.

**itemDefaultZIndex** (default: 10)

Z-index assigned to each slide.

**itemSelector** (default: "div.item")

CSS selector used to find each slide.

**itemLoadedClass** (default: "loaded")

CSS calss added right after a slide is loaded.

**activeItemClass** (default: "active")

CSS class added to the active slide.

**itemForegroundElementSelector** (default: ".foreground img")

CSS selector used to find each foreground element withing a slide.

**controlsSelector** (default: undefined)

CSS selector used to find the pagination links.

## Authors

* Daniel Martins <https://github.com/danielfm>
* Túlio Ornelas <https://github.com/tulios>
* Emerson Macedo <https://github.com/emerleite>
* Alexandre Magno <https://github.com/alexanmtz>
## License

Copyright (c) 2012 Globo.com - Webmedia. See COPYING for more details.