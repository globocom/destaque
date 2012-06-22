var destaques = [];
function callingDestaqueTriple(index, el) {
  destaques[index] = $(el).destaque({
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
}

function resumeDestaqueTriple(i) {
  console.debug(i, destaques[0]);
  destaques[i].resume();
}

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
 
  $('.triple-slides').each(function(index, el){
    window.setTimeout(function(){
      callingDestaqueTriple(index, el);
    }, index*250);
  }); 
  
 $('.triple-slides').mouseover(function(){
   for(var i=0; i<destaques.length; i++) {
     destaques[i].pause();
   }    
 }).mouseleave(function() {
  for(var i=0; i<destaques.length; i++) {
     window.setTimeout(resumeDestaqueTriple, i*250, i);
  }
 });

});
