var game = game || {};

let playerScore = 0;
let missedShot  = 10;
let ufoIntervals;
const intro     = new Audio('./audio/intro.mp3');
const laser     = new Audio('./audio/laser.mp3');
const start     = new Audio('./audio/start.wav');
const explosion = new Audio('./audio/explosion.mp3');
const ufo       = new Audio('./audio/ufo.mp3');
const fail      = new Audio('./audio/fail.mp3');
const blast      = new Audio('./audio/blast.mp3');

$(function(){
  intro.play();
  addEventListeners();
});

function addEventListeners() {
  $('.restart').on('click', restartButton);
  $('.bg').on('click', '.Ufo', UfoClicked);
  $('.bg').on('click', shotMiss);
  $('.buttonNuke').on('click', nuke);
  $('.startButton').on('click', animateDiv);
  $('speed').on('click');
}

function restartButton(){
  intro.play();
  fail.pause();
  start.pause();
  explosion.pause();
  ufo.pause();
  $('.planet').css({'display': 'block'});
  $('.Ufo').css({'display': 'none'});
  $('.shotTotal').html('10');
  $('.score').html('0');
  $('.lost').css({'display': 'block'});
  $('.shotTotal').css({'display': 'block'});
  $('.bomb').css({'display': 'none'});
  $('.lost').css({'display': 'none'});
  $('.grass').css({'display': 'block'});
  clearInterval(ufoIntervals);
  missedShot  = 10;
  playerScore = 0;
  // $('.restart').on('click', restartButton);
  $('.bg').off('click', '.Ufo', UfoClicked);
  $('.bg').off('click', shotMiss);
  // $('.buttonNuke').on('click', nuke);
  $('.startButton').off('click', animateDiv);
  // $('speed').on('click');
  addEventListeners();
}

function UfoClicked() {
  blast.play();
  $(this).remove();
  appendScore();
  console.log('Clicked that Ufo yo');
}

function appendScore() {
  playerScore++;
  $('.score').text(playerScore);
}

function shotMiss(){
  missedShot--;
  console.log('ammo used');
  laser.play();
  $('.shotTotal').text(missedShot);
  if (missedShot===0) {
    fail.play();
    $('.planet').css({'display': 'none'});
    $('.Ufo').css({'display': 'none'});
    $('.bg').off('click', '.Ufo', UfoClicked);
    $('.lost').css({'display': 'block','z-index': '20'});
    $('.shotTotal').css({'display': 'none'});
    clearInterval(ufoIntervals);
  }
}

function makeNewPosition(){
  const height  = $(window).height()-100;
  const width   = $(window).width() - 100;
  const nheight = Math.floor(Math.random() * height);
  const nwidth  = Math.floor(Math.random() * width);
  return [nheight,nwidth];
}

function animateDiv(){
  intro.pause();
  start.play();
  console.log('clicked');
  // $('.bg').on('click', shotMiss);
  ufoIntervals = setInterval(createUfo, 1000);
}

function createUfo(){
  const newUfo = $('<div class="Ufo" id="target"></div>');
  $('.bg').append(newUfo).find(newUfo).css({'position': 'absolute', 'z-index': '3'});
  animateUfo();
  ufo.play();
}



function animateUfo() {
  const newq = makeNewPosition();
  const oldq = $('.Ufo').offset();
  const speed = calcSpeed([oldq.top, oldq.left], newq);
  $('.Ufo').animate({ top: newq[0], left: newq[1] }, {
    duration: speed,
    complete: animateUfo
  });
}

function calcSpeed(prev, next) {
  const x             = Math.abs(prev[1] - next[1]);
  const y             = Math.abs(prev[0] - next[0]);
  const greatest      = x > y ? x : y;
  const speedModifier = 0.1;
  const speed         = Math.ceil(greatest/speedModifier);
  console.log(speed);
  return speed;

}

function nuke(){
  explosion.play();
  intro.pause();
  ufo.pause();
  $('.planet').css({'display': 'none'});
  $('.Ufo').css({'display': 'none'});
  $('.bg').off('click', '.Ufo', UfoClicked);
  $('.shotTotal').css({'display': 'none'});
  $('.bomb').css({'display': 'block'});
  $('.grass').css({'display': 'none'});
  clearInterval(ufoIntervals);
}
