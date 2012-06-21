$(function () {
 $("#slide-container").destaque({
    slideMovement: 100,
    slideSpeed: 1000,
    elementSpeed: 1100,
    easingType: "easeInOutExpo",
    itemSelector: ".item",
    itemForegroundElementSelector: ".foreground .element",
    controlsSelector: "#slide-pagination a"
  });
  
  var destaques = [];
  $('.triple-slides').each(function(index, el){
    destaques[index] = $(this).destaque({
      slideMovement: 100,
      slideSpeed: 1000,
      autoSlideDelay: 3000,
      elementSpeed: 1100,
      stopOnMouseOver: false,
      easingType: "easeInOutExpo",
      itemSelector: ".item-triple",
      itemForegroundElementSelector: ".foreground-triple .element",
      controlsSelector: "#slide-triple-pagination a"
    });
   
  });
  
 $('.triple-slides').mouseover(function(){
    for(var i=0; i<destaques.length; i++) {
      destaques[i].pause();
    }    
  }).mouseleave(function() {
    for(var i=0; i<destaques.length; i++) {
      destaques[i].resume();
    }
  });

});
