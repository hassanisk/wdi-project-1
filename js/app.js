

$(function(){
  animateDiv();
  $('.duck').click(function(){
    $('.duck').hide();
  });


});


function makeNewPosition(){
  var height = $(window).height()-100;
  var width = $(window).width() - 100;

  var nheight = Math.floor(Math.random() * height);
  var nwidth = Math.floor(Math.random() * width);

  return [nheight,nwidth];
}

function animateDiv(){
  // $('body').append('<div class="duck"></div>');
  var newq = makeNewPosition();
  var oldq = $('.duck').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);

  $('.duck').animate({ top: newq[0], left: newq[1] }, speed, function(){
    // $('body').append('<div class="duck"></div>');



    animateDiv();
  });


}

function calcSpeed(prev, next) {

  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);

  var greatest = x > y ? x : y;

  var speedModifier = 0.2;

  var speed = Math.ceil(greatest/speedModifier);

  return speed;

}

// $('#audio').click(function() {
//   var audio =$('$audio');
//   audio.play();
// });
//
// $('#audio').click();
