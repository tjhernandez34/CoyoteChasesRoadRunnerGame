var url;
var distanceX, distanceY, distance;
var ctx, canvas, canvasEdgeX, canvasEdgeY;

var Game = function(player1, player2) {
  this.id = getID(),
  this.player1 = player1,
  this.player2 = player2,
  this.duration = 31000,
  this.completed = false,
  this.winner = null;
};

function getID(){
  url = window.location.href;
  return url.split("game")[1].split('/')[1];
}

// var countDownStart = function(){
//   console.log('starting countDownStart...');
//   var counter = ["5", "4", "3", "2", "1", "GO"];
//   for (var i in counter) {
//     setTimeout(function() {
//       console.log(i);
//       // $('.countdown-start').text(i);
//     }, 1000);
//   }
//   // $('.countdown-start').remove();
//   console.log('countDownStart is over...');
// };

function gameCountDown(game){
  console.log('starting gameCountDown...');
  setInterval(timeDown(), 1000);
  // game.completed = true;
};

 function timeDown() {
    console.log(time);
    time -= 35;
    $('h1').text(time / 1000);
    return time;
  };

  var game = new Game(roadRunner, coyote);
  var time = game.duration;
  var rate = 10;
  var gameLoopCounter = 0;
  var frameRate = 35; // frames per second
  var canvasEdgeX = $(window).width(); // sync this with HTML below
  var canvasEdgeY = $(window).height(); // sync this with HTML below


// var board=document.getElementById("canvas");
// var ctx=board.getContext("2d");
// var img=document.getElementById("lamp");
// var pat=ctx.createPattern(img,"repeat");
// ctx.rect(0,0,150,100);
// ctx.fillStyle=pat;
// ctx.fill();

  $(document).keydown(event, function() {
    console.log('registering keydown event coyote...');
    // if (game.duration < 27000) {
      switch(event.which) {
        case 37:
          coyote.posX = coyote.posX - rate;
          coyote.image.src = '/images/coyote-left.png';
          break;
        case 38:
          coyote.posY = coyote.posY - rate;
          break;
        case 39:
          coyote.posX = coyote.posX + rate;
          coyote.image.src = '/images/coyote.png';
          break;
        case 40:
          coyote.posY = coyote.posY + rate;
          break;
        default:
          coyote.posX = coyote.posX;
          coyote.posY = coyote.posY;
    }
  // } else {
  //   console.log("Wait!!!");
  // }
});

// pseudocode for AI
// if roadrunner moves with a keystroke
// coyote moves towards center of roadrunner


// var moveRoadRunner = function() {
  $(document).keydown(event, function() {
    console.log('registering keydown event roadRunner...');
    switch(event.which) {
      case 65:
        roadRunner.posX = roadRunner.posX - rate;
        roadRunner.image.src = '/images/road-runner_left.png';
        break;
      case 87:
        roadRunner.posY = roadRunner.posY - rate;
        break;
      case 68:
        roadRunner.posX = roadRunner.posX + rate;
        roadRunner.image.src = '/images/road-runner.png';
        break;
      case 83:
        roadRunner.posY = roadRunner.posY + rate;
        break;
      default:
        roadRunner.posX = roadRunner.posX;
        roadRunner.posY = roadRunner.posY;
    }
  });


$(document).ready(function() {
  canvas = document.getElementById("canvas");
  setSizes();
  ctx = canvas.getContext("2d");
  // countDownStart();
  console.log("running document ready function...");
  // gameCountDown(game);
  loop();
});

$(window).resize(function() {
  setSizes();
});


// ============================================== //
// ============================================== //

function loop(){
  var looper = setInterval(function(){
  time -= 35;
  $('h1').text(Math.floor(time / 1000));
  if (game.completed === false) {
    timeExpired();
    isCaught();
    draw();
    } else {
      clearInterval(looper);
      gameOver();
    }
  },frameRate);
}

function gameOver(){
  $.ajax({
    url: '/games/' + game.id + '/gameover',
    method: 'POST',
    dataType: 'json',
    data: {
      winner: game.winner
    },
    success: function(data){
      console.log('success');
      $('#game > h1').remove();
      $('#game > canvas').remove();
      $('#game').text(data.responseText);
      window.location = ("http://localhost:9393/games/" + data.id + "/gameover");
    },
    error: function(data){
      console.log('error');
      console.log(data.responseText);
    }
  });
}

function draw(){
  console.log(ctx);
  if (canvas.getContext) {
    ctx.clearRect (0, 0, canvasEdgeX, canvasEdgeY);
    coyote.drawAvatar(ctx);
    roadRunner.drawAvatar(ctx);
  }
  else {
    window.alert("Ehhh... What's up, Doc?");
  }
}

function isCaught() {
  if (getDistance() < 40) {
    game.completed = true;
    alert("Finally, the Coyote did it!");
  }
  // game.winner = game.player1;
  return game.completed;
}

function timeExpired() {
  if (time < 40) {
    game.completed = true;
    alert("Beep! Beep! The Road Runner got away...");
  }
  // game.winner = game.player2;
  return game.completed;
}

function getDistance(){
  distanceX = coyote.posX - roadRunner.posX;
  distanceY = coyote.posY - roadRunner.posY;
  distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
  return distance;
}

function setSizes(){
  canvasEdgeX = $(window).width();
  canvasEdgeY = $(window).height();
  canvas.width = canvasEdgeX;
  canvas.height = canvasEdgeY;
};