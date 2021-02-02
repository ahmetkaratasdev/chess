// This file will contain the functions which control
// the view and the logic of the chess application

import Game from "./Game.js";
import GameView from "./GameView.js";

// When the 'new' term is called, the constructer is called
let game = new Game();
let gameView = new GameView(document.getElementById("app")); 
console.log(gameView.root);
// console.log(game.turn);
console.log(game.chessboard);


let row = 0;
let col = 0;
gameView.onTileClick = function(i) {
    row = Math.floor(i / 8) ;
    col = i % 8;
    console.log("First tile clicked:", i);

    // gameView.onTileClick = function(j) {
    //     console.log("Second tile clicked:", j);
    // }

}

// gameView.updateBoard(game, row, col);

// console.log(game);

// console.log(game.board)

