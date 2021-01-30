// Main controller which is going to control both the view and the model
// for the chess game
// We're going to have a class which is going to represent the view and the display
// and another class which contains all the game logic (the model)

import Game from "./Game.js";
let game = new Game();                              // create a new game
console.log(game.turn);
game.makeMove(0)
console.log(game.board.join(","));

console.log(game.turn);
game.makeMove(3)
console.log(game.board.join(","));

console.log(game.turn);
game.makeMove(1)
console.log(game.board.join(","));

console.log(game.turn);
game.makeMove(4)
console.log(game.board.join(","));

console.log(game.turn);
game.makeMove(2)
console.log(game.board.join(","));

console.log(game.findWinningComb());

