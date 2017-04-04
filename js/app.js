let playerScore = 0;


$(function (){


  $('.startButton').on('click', animateDiv);
  // $('#target').click(function(){
  //   var score = parseInt($('#score').html);
  //   console.log('score1');
  //   score++;
  //   console.log(score++);
  //   $('#score').html = score;
  //   console.log(score);
  //
  // });

  $('.bg').on('click', '.duck', duckClicked);

});


function duckClicked() {
  $(this).remove();
  appendScore();
  console.log('Clicked that duck yo');
}

function appendScore() {
  playerScore++;
  $('.score').text(playerScore);
}





// function addGuns() {
//   $('.duck').click();
// }

function makeNewPosition(){
  var height = $(window).height()-100;
  var width = $(window).width() - 100;

  var nheight = Math.floor(Math.random() * height);
  var nwidth = Math.floor(Math.random() * width);

  return [nheight,nwidth];
}

function animateDiv(){
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


// var score = 0 ;
function score1() {
  score++;
  $('#score').text(`${score}`);
}
// $('#audio').click(function() {
//   var audio =$('$audio');
//   audio.play();
// });
//
// $('#audio').click();
