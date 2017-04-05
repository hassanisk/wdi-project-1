let playerScore = 0;
let MissingShot = 10;

$(function (){
  var intro = new Audio('./audio/intro.mp3');
  intro.play();
  $('.startButton').on('click', animateDiv);
  $('.restart').on('click', restartButton);
  $('.bg').on('click', '.duck', duckClicked);
});
function restartButton(){
  var restart = new Audio('./audio/restart.wav');
  restart.play();
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
  var shotgun = new Audio('./audio/shot.mp3');
  shotgun.play();
  $('.shotTotal').text(MissingShot);
  if (MissingShot===0){
    var fail = new Audio('./audio/fail.mp3');
    fail.play();
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
  var start = new Audio('./audio/start.wav');
  start.play();
  $('.bg').on('click',shotMiss);
  console.log('start');
  var noOfDucks = 10000;
  var duckIntervals = setInterval(createDuck, 1000);
  setTimeout(function() {
    clearInterval(duckIntervals);
  }, noOfDucks);
}
function createDuck(){
  var newDuck = $('<div class="duck" id="target"></div>');
  $('.bg').append(newDuck).find(newDuck).css({'position': 'absolute', 'z-index': '3'});
  animateDuck();
  var quack = new Audio('./audio/quack.wav');
  quack.play();
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
}
function calcSpeed(prev, next) {
  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);
  var greatest = x > y ? x : y;
  var speedModifier = 0.1;
  var speed = Math.ceil(greatest/speedModifier);
  return speed;
}
