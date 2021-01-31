<<<<<<< HEAD
// This file will contain the functions which control
// the view and the logic of the chess application

import Game from "./Game.js";
let game = new Game();
console.log(game);

console.log(game.board)

=======
// Main controller which is going to control both the view and the model
// for the chess game
// We're going to have a class which is going to represent the view and the display
// and another class which contains all the game logic (the model)

import Game from "./Game.js";
import GameView from "./GameView.js";
let game = new Game(); 
let gameView = new GameView(document.getElementById("app")); 

gameView.onTileClick = function(i) {
    game.makeMove(i);
    gameView.update(game);
    console.log(`Tile clicked: ${i}`);
};

gameView.onRestartClick = function() {
    game = new Game();
    gameView.update(game);
    // console.log("Game is restarted!");
};

gameView.update(game);
>>>>>>> 0695864dc9022b2cea3e52751c4a1545df9bce6a
