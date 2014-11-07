var roadRunnerImageSource = '/images/road-runner.png';
var coyoteImageSource = '/images/coyote.png';
var url;

function Player (name, id){
  this.id = id;
  this.name = name;
};

function Avatar(player, imageSource, position){
  this.player = player,
  this.posX = position,
  this.posY = position,
  this.center = {
    left: (this.posX + 60),
    top: (this.posY + 60)
  },
  this.size = 120,
  this.image = new Image(),
  this.image.src = imageSource,
  this.drawAvatar = function(ctx){
    ctx.save();
    ctx.translate(this.posX, this.posY);
    // ctx.rotate(to_rad(this.direction));
    ctx.drawImage(this.image,this.posX, this.posY, this.size, this.size);
    ctx.restore();
  };
}

function getPlayers(playerNum){
  url = window.location.href;
  return url.split("player" + playerNum)[1].split('/')[1];
}

var playerOne = new Player("Zach", getPlayers('1'));
var playerTwo = new Player("Travis", getPlayers('2'));
var roadRunner = new Avatar(playerOne, roadRunnerImageSource, 100);
var coyote = new Avatar(playerTwo, coyoteImageSource, 10);
