var game = game || {};

game.playerScore = 0;
game.missedShot  = 30;
game.ufoIntervals;
game.intro     = new Audio('./audio/intro.mp3');
game.laser     = new Audio('./audio/laser.mp3');
game.start     = new Audio('./audio/start.wav');
game.explosion = new Audio('./audio/explosion.mp3');
game.ufo       = new Audio('./audio/ufo.mp3');
game.fail      = new Audio('./audio/fail.mp3');
game.blast      = new Audio('./audio/blast.mp3');

game.init = function(){
  this.intro.play();
  this.addEventListeners();
};

game.addEventListeners= function() {
  $('.restart').on('click', this.restartButton);
  $('.bg').on('click', '.Ufo', this.UfoClicked);
  $('.bg').on('click', this.shotMiss);
  $('.buttonNuke').on('click', this.nuke);
  $('.startButton').on('click', this.animateDiv);
  $('speed').on('click');
};

game.restartButton = function (){
  game.intro.play();
  game.fail.pause();
  game.start.pause();
  game.explosion.pause();
  game.ufo.pause();
  $('.planet').css({'display': 'block'});
  $('.Ufo').css({'display': 'none'});
  $('.shotTotal').html('30');
  $('.score').html('0');
  $('.lost').css({'display': 'block'});
  $('.shotTotal').css({'display': 'block'});
  $('.bomb').css({'display': 'none'});
  $('.lost').css({'display': 'none'});
  $('.grass').css({'display': 'block'});
  $('.level').css({'display': 'none'});

  clearInterval(game.ufoIntervals);
  game.missedShot  = 30;
  game.playerScore = 0;
  $('.bg').off('click', '.Ufo', game.UfoClicked);
  $('.bg').off('click', game.shotMiss);
  $('.startButton').off('click', game.animateDiv);
  game.addEventListeners();
};

game.UfoClicked =function() {
  game.blast.play();
  $(this).remove();
  game.appendScore();
  console.log('Clicked that Ufo yo');
};

game.appendScore = function () {
  game.playerScore++;
  $('.score').text(game.playerScore);
  if (game.playerScore === 5) {
    game.calcSpeed= function (prev, next) {
      const x             = Math.abs(prev[1] - next[1]);
      const y             = Math.abs(prev[0] - next[0]);
      const greatest      = x > y ? x : y;
      const speedModifier = 0.3;
      const speed         = Math.ceil(greatest/speedModifier);
      console.log('fast');
      return speed;
    };

  }
  if (game.playerScore === 10) {
    game.calcSpeed= function (prev, next) {
      const x             = Math.abs(prev[1] - next[1]);
      const y             = Math.abs(prev[0] - next[0]);
      const greatest      = x > y ? x : y;
      const speedModifier = 0.5;
      const speed         = Math.ceil(greatest/speedModifier);
      console.log('faster');
      return speed;
    };
  }
};

game.shotMiss = function (){
  game.missedShot--;
  console.log('ammo used');
  game.laser.play();
  $('.shotTotal').text(game.missedShot);
  if (game.missedShot === 0) {
    game.fail.play();
    $('.planet').css({'display': 'none'});
    $('.Ufo').css({'display': 'none'});
    $('.bg').off('click', '.Ufo', game.UfoClicked);
    $('.lost').css({'display': 'block','z-index': '20'});
    $('.shotTotal').css({'display': 'none'});
    $('.level').css({'display': 'none'});

    clearInterval(game.ufoIntervals);
  }
};

game.makeNewPosition = function (){
  const height  = $(window).height()-100;
  const width   = $(window).width() - 100;
  const nheight = Math.floor(Math.random() * height);
  const nwidth  = Math.floor(Math.random() * width);
  return [nheight,nwidth];
};

game.animateDiv= function (){
  game.intro.pause();
  game.start.play();
  console.log('clicked');
  // $('.bg').on('click', shotMiss);
  game.ufoIntervals = setInterval(game.createUfo, 1000);
};

game.createUfo = function (){
  const newUfo = $('<div class="Ufo" id="target"></div>');
  $('.bg').append(newUfo).find(newUfo).css({'position': 'absolute', 'z-index': '3'});
  game.animateUfo();
  game.ufo.play();
};

game.animateUfo =function () {
  const newq          = game.makeNewPosition();
  const oldq          = $('.Ufo').offset();
  const speed         = game.calcSpeed([oldq.top, oldq.left], newq);
  $('.Ufo').animate({ top: newq[0], left: newq[1] }, {
    duration: speed,
    complete: game.animateUfo
  });
};

game.calcSpeed= function (prev, next) {
  const x             = Math.abs(prev[1] - next[1]);
  const y             = Math.abs(prev[0] - next[0]);
  const greatest      = x > y ? x : y;
  const speedModifier = 0.1;
  const speed         = Math.ceil(greatest/speedModifier);
  console.log(speed);
  return speed;

};

game.nuke=function (){
  game.explosion.play();
  game.intro.pause();
  game.ufo.pause();
  $('.planet').css({'display': 'none'});
  $('.Ufo').css({'display': 'none'});
  $('.bg').off('click', '.Ufo', game.UfoClicked);
  $('.shotTotal').css({'display': 'none'});
  $('.bomb').css({'display': 'block'});
  $('.grass').css({'display': 'none'});
  $('.level').css({'display': 'none'});

  clearInterval(game.ufoIntervals);
};

$(game.init.bind(game));
