$(function(){

  animateDiv();
  $('#target').click(function(){
    $(this).hide();
  });
});


function makeNewPosition(){

  // Get viewport dimensions (remove the dimension of the div)
  var height = $(window).height()-100;
  var width = $(window).width() - 100;

  var nheight = Math.floor(Math.random() * height);
  var nwidth = Math.floor(Math.random() * width);

  return [nheight,nwidth];

}

function animateDiv(){

  var newq = makeNewPosition();
  var oldq = $('.duck').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);
  // $('duck').style.left =  '650px';
  // $('duck').style.top= '200px';

  $('.duck').animate({ top: newq[0], left: newq[1] }, speed, function(){
    animateDiv();
  });


}

function calcSpeed(prev, next) {

  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);

  var greatest = x > y ? x : y;

  var speedModifier = 1;

  var speed = Math.ceil(greatest/speedModifier);

  return speed;

}
function gameLoop(){

}
