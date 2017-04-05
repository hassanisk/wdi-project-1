let playerScore = 0;
let MissingShot = 10;





$(function (){
  $('.startButton').on('click', animateDiv);
  $('.restart').on('click', restartButton);
  $('.bg').on('click', '.duck', duckClicked);
});


function restartButton(){
  location.reload();
}


function duckClicked() {
  $(this).remove();
  appendScore();
  console.log('Clicked that duck yo');
}

function appendScore() {
  playerScore++;
  $('.score').text(playerScore);
}

function shotMiss(){
  MissingShot--;
  console.log('ammo used');
  $('.shotTotal').text(MissingShot);
  if (MissingShot===0){
    $('.tree').css({'display': 'none'});
    $('.duck').css({'display': 'none'});
    $('.bg').off('click', '.duck', duckClicked);
    $('.lost').css({'display': 'block','z-index': '20'});
    $('.shotTotal').css({'display': 'none'});
  }

}

function makeNewPosition(){
  var height = $(window).height()-100;
  var width = $(window).width() - 100;

  var nheight = Math.floor(Math.random() * height);
  var nwidth = Math.floor(Math.random() * width);

  return [nheight,nwidth];
}

function animateDiv(){
  $('.bg').on('click',shotMiss);
  console.log('start');
  var noOfDucks = 5000;
  var duckIntervals = setInterval(createDuck, 1000);
  setTimeout(function() {
    clearInterval(duckIntervals);
  }, noOfDucks);
}

function createDuck(){
  var newDuck = $('<div class="duck" id="target"></div>');
  $('.bg').append(newDuck).find(newDuck).css({'position': 'absolute', 'z-index': '3'});
  animateDuck();
  // addGuns();

}

function animateDuck() {
  var newq = makeNewPosition();
  console.log(newq);
  var oldq = $('.duck').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);
  $('.duck').animate({ top: newq[0], left: newq[1] }, {
    duration: speed,
    complete: animateDuck
  });
  // console.log('duck animated');
}

function calcSpeed(prev, next) {

  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);

  var greatest = x > y ? x : y;

  var speedModifier = 0.1;

  var speed = Math.ceil(greatest/speedModifier);

  return speed;

}



// $('#audio').click(function() {
//   var audio =$('$audio');
//   audio.play();
// });
//
// $('#audio').click();
