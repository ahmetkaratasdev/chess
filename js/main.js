// This file will contain the functions which control
// the view and the logic of the chess application

import Game from "./Game.js";
import GameView from "./GameView.js";

// When the 'new' term is called, the constructer is called
let game = new Game();
let gameView = new GameView(document.getElementById("app")); 
// console.log(game.turn);
console.log(game.chessboard);


// console.log(game);

// console.log(game.board)

