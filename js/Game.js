// Going to represent a single game of chess
const NO = 0;
const YES = 1;
const SIZE = 8;

const chessPiece = {
    NONE: 0,
    PAWN: 1,
    ROOK: 2,
    KNIGHT: 3,
    BISHOP: 4,
    QUEEN: 5,
    KING: 6
};

const colour = {
    EMPTY: 0,
    WHITE: 1,
    BLACK: 2
};

Object.freeze(chessPiece);
Object.freeze(colour);

class canEmpassant {
    constructor() {
        this.answer = NO;
        this.withRow = -1;
        this.withCol = -1;
    }
}

class board {
    constructor() {
        this.hasPieceMoved = NO;
        this.piece = chessPiece.NONE;
        this.colour = colour.EMPTY;
        this.empassant = new canEmpassant;
        
    }
;}

export default class Game {
    // A constructor is used to initialise objects
    constructor() {
        this.turn = "White";
        this.chessboard = [

            [2, 3, 4, 5, 6, 4, 3, 2],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [2, 3, 4, 5, 6, 4, 3, 2]
        ];
        console.log(colour.WHITE);
        console.log(chessPiece);
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (row == 0 || row == 1) {
                    chessboard[row][col].colour = colour.WHITE;
                } else if (row == SIZE - 2 || row == SIZE - 1) {
                    chessboard[row][col].colour = colour.BLACK;
                } else {
                    chessboard[row][col].colour = colour.EMPTY;
                }
            }
        }
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

