// Going to represent a single game of chess
export default class Game {
    // A constructor is used to initialise objects
    constructor() {
        this.turn = "White";
        
        let chessboard = [];
        for (let row = 0; row < 8; row++) {
            chessboard[row] = [];
            for (let col = 0; col < 8; col++) {
                chessboard[row][col] = 0;
            }
        }
        this.chessboard = chessboard;
    }
}

    // if the current turn is white then make it black and vice versa
    // nextTurn() {
    //     this.turn = this.turn == "White" ? "Black" : "White";
    // }

    // // make the chess move
    // makeMove(i) {
    //     this.board[i] = this.turn
    //     this.nextTurn();
    // }

