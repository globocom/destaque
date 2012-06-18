$(function () {
  $("#slide-container").destaque({
    slideMovement: 100,
    slideSpeed: 1000,
    elementSpeed: 1100,
    easingType: "easeInOutExpo",
    itemSelector: ".item",
    itemForegroundElementSelector: ".foreground .element",
    controlsSelector: "#slide-pagination a",
  });
});
