
let duck;
let gameTimer;
let output;


function init(){
  duck = document.getElementById('duck');
  gameTimer = setInterval(gameLoop, 50);
  output = document.getElementById('output');
  playDuck();
}

function playDuck(){
  var x =Math.floor(Math.random()*600);
  var y =Math.floor(Math.random()*700);
  duck.style.left = '400px';
  duck.style.top= y +'px';

}
function gameLoop(){

  var y = parseInt(duck.style.top)-10;
  if (y<-50){
    playDuck();
  }else{
    duck.style.top= y + 'px';
  }
}

function hitDuck (){
  playDuck();
}
