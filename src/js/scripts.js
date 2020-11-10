// Business Logic
export function Game (){
  this.players = [];
  this.playerNumber = 0;
}

Game.prototype.addPlayer = function(playerObject){
  playerObject.id = this.playerNumber;
  this.playerNumber ++ ;
  this.players.push(playerObject);
}

Game.prototype.findPlayer = function(buttonClasslist){
  for( let i = 0; i < this.players.length; i++){
    if(buttonClasslist.includes(this.players[i].id)){
      return this.players[i];
    }
  }
}

Game.prototype.reset = function(){
  this.players.forEach(function(player){
    player.total = 0;
    player.score = 0;
  })
  $(".total").text('');
}

export function Player (name){
  this.name = name;
  this.total= 0;
  this.score = 0;
  this.wins = 0;
  this.losses = 0;
}

Player.prototype.newScore = function(roll){
  this.score += roll;
  return this.score;
}

Player.prototype.winner = function(game){
  if (this.total >= 20 || this.score >=20) {
    this.wins++;
    $(`.wins.${this.id}`).text(this.wins);
    game.reset();
    switchUser(this);

    for(let i = 0; i < game.players.length; i++){
      if(game.players[i] !== this){
        game.players[i].losses ++;
        $(`.losses.${game.players[i].id}`).text(game.players[i].losses);
      }
    }
  }
}

