$(function () {
  $("#slide-container").destaque({
    slideMovement: 100,
    slideSpeed: 1000,
    easingType: "easeInOutQuart",
    itemSelector: ".item",
    itemBackgroundSelector: ".background",
    elementSpeed: 1100,
    itemForegroundElementSelector: ".foreground .element",
    controlsSelector: "#slide-pagination a"
  });

  $('.triple-slides').destaquesQueue({
    slideMovement: 40,
    delay: 250
  });
});
