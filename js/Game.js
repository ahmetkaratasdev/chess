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

// have a canEmpassant struct
class canEmpassant {
    constructor() {
        this.answer = NO;
        this.withRow = -1;
        this.withCol = -1;
    }
}

// have a board struct
class board {
    constructor(piece, colour, hasPieceMoved) {
        this.hasPieceMoved = hasPieceMoved;
        this.piece = piece;
        this.colour = colour;
        this.canEmpassant = {
            answer : NO,
            empassantWithRow : -1,
            empassantWithCol : -1
        }
    }
;}

export default class Game {
    // A constructor is used to initialise objects
    constructor() {
        this.turn = "White";
        //     [
        //     [2, 3, 4, 5, 6, 4, 3, 2],
        //     [1, 1, 1, 1, 1, 1, 1, 1],
        //     [0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0],
        //     [1, 1, 1, 1, 1, 1, 1, 1],
        //     [2, 3, 4, 5, 6, 4, 3, 2]
        //     ];
 
        // initialise the fields of the chessboard struct                           
        this.chessboard = [];
        // initialise the board pieces
        for (let row = 0; row < SIZE; row++) {
            this.chessboard[row] = [];
            for (let col = 0; col < SIZE; col++) {
                // if second or 7th row,
                if (row === 1) {
                    this.chessboard[row][col] = new board(chessPiece.PAWN, colour.WHITE, NO);
                } else if (row === SIZE - 2) {
                    this.chessboard[row][col] = new board(chessPiece.PAWN, colour.BLACK, NO);

                } else if (row === 0) {
                    if (col <= 4) {
                        this.chessboard[row][col] = new board(col + 2, colour.WHITE, NO);
                    } else {
                        this.chessboard[row][col] = new board(SIZE - col + 1, colour.WHITE, NO);
                    }
                } else if (row === SIZE - 1) {
                    if (col <= 4) {
                        this.chessboard[row][col] = new board(col + 2, colour.BLACK, NO);
                    } else {
                        this.chessboard[row][col] = new board(SIZE - col + 1, colour.BLACK, NO);
                    }
                } else {
                    this.chessboard[row][col] = new board(chessPiece.NONE, colour.EMPTY, NO);
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

