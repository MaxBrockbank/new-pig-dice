import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './js/scripts.js'

import { Player } from './js/scripts.js';
import { Game } from './js/scripts.js';
$;

function gameStart(players_array){
  for(let i = 0; i < players_array.length; i ++){
    if(players_array.length === 2){
      $(".player-1").text(players_array[0].name);
      $(".player-2").text(players_array[1].name);
      $("#2").hide();
      $("#form").hide();
      $("#game").show();
    }
  }
}

function switchUser (currentPlayer) {
  currentPlayer.score = 0;
  if (currentPlayer.id === 0) {
    $("#1").hide();
    $("#2").show();
  } else {
    $("#2").hide();
    $("#1").show();
  }
}

function addClickEvent(game){
  $(".buttons").on('click', 'button.roll', function(){
    let currentPlayer = game.findPlayer(this.classList[1]);
    roll(currentPlayer, game);
  }); 
  $(".buttons").on('click', 'button.hold', function(){
    let currentPlayer = game.findPlayer(this.classList[1]);
    hold(currentPlayer, game);
  })
  
}

function roll(currentPlayer, game){
  let dice = document.getElementById("dice");
  let roll = Math.floor((Math.random() * 6) + 1);
  dice.innerHTML = roll;
  if (roll === 1) {
    $("#score").text("Round Total: "+ 0);
    switchUser(currentPlayer);
  } else if (roll != 1) {
    currentPlayer.newScore(roll);
    currentPlayer.winner(game);
    $("#score").text("Round Total: "+ currentPlayer.score);
  }
}

function hold(currentPlayer, game){
  currentPlayer.winner(game);
  currentPlayer.total += currentPlayer.score;
  currentPlayer.winner(game);
  $(`.total.${currentPlayer.id}`).text(currentPlayer.total);
  $("#score").text("Round Total: "+ 0);
  switchUser(currentPlayer);
}

$(document).ready(function() {
  let game = new Game();
  addClickEvent(game);
  $("#player-name").submit(function(event) {
    event.preventDefault();

    let name = $("input#player1").val();
    let player = new Player(name);
    game.addPlayer(player);
    gameStart(game.players);
    $("input#player1").val("");
  });
})