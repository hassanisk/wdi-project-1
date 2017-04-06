var game = game || {};

let playerScore = 0;
let MissingShot = 10;


$(function(){
  var intro = new Audio('./audio/intro.mp3');
  intro.play();
  $('.startButton').on('click', animateDiv);
  $('.restart').on('click', restartButton);
  $('.bg').on('click', '.Ufo', UfoClicked);
  $('.buttonNuke').on('click', nuke);

});
function restartButton(){
  location.reload();
}
function UfoClicked() {
  $(this).remove();
  appendScore();
  console.log('Clicked that Ufo yo');
}


function appendScore() {
  playerScore++;
  $('.score').text(playerScore);

}
function shotMiss(){
  MissingShot--;
  console.log('ammo used');
  var laser = new Audio('./audio/laser.mp3');
  laser.play();
  $('.shotTotal').text(MissingShot);
  if (MissingShot===0){
    var fail = new Audio('./audio/fail.mp3');
    fail.play();
    $('.planet').css({'display': 'none'});
    $('.Ufo').css({'display': 'none'});
    $('.bg').off('click', '.Ufo', UfoClicked);
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
  var start = new Audio('./audio/start.wav');
  start.play();
  $('.bg').on('click',shotMiss);
  var noOfUfos = 10000;
  var UfoIntervals = setInterval(createUfo, 1000);
  setTimeout(function() {
    clearInterval(UfoIntervals);
  }, noOfUfos);

}
function createUfo(){
  var newUfo = $('<div class="Ufo" id="target"></div>');
  $('.bg').append(newUfo).find(newUfo).css({'position': 'absolute', 'z-index': '3'});
  animateUfo();
  var ufo = new Audio('./audio/ufo.mp3');
  ufo.play();
}
function animateUfo() {
  var newq = makeNewPosition();
  var oldq = $('.Ufo').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);
  $('.Ufo').animate({ top: newq[0], left: newq[1] }, {
    duration: speed,
    complete: animateUfo
  });
}
function calcSpeed(prev, next) {
  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);
  var greatest = x > y ? x : y;
  var speedModifier = 0.1;
  var speed = Math.ceil(greatest/speedModifier);
  return speed;
}

function nuke(){
  var explosion = new Audio('./audio/explosion.mp3');
  explosion.play();
  $('.planet').css({'display': 'none'});
  $('.Ufo').css({'display': 'none'});
  $('.bg').off('click', '.Ufo', UfoClicked);
  $('.shotTotal').css({'display': 'none'});
  $('.bomb').css({'display': 'block'});
  $('.grass').css({'display': 'none'});

}
