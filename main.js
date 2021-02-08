// Set up my initialisations here
// Going to represent a single game of chess
const NO = 0;
const YES = 1;
const SIZE = 8;

const NONE = 0;
const PAWN = 1;
const ROOK = 2;
const KNIGHT = 3;
const BISHOP = 4;
const QUEEN = 5;
const KING = 6;

const EMPTY = 0;
const WHITE = 1;
const BLACK = 2;


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
let chessboard = [];
// initialise the board pieces
for (let row = 0; row < SIZE; row++) {
    chessboard[row] = [];
    for (let col = 0; col < SIZE; col++) {
        // if second or 7th row,
        if (row === 1) {
            chessboard[row][col] = new board(PAWN, WHITE, NO);
        } else if (row === SIZE - 2) {
            chessboard[row][col] = new board(PAWN, BLACK, NO);

        } else if (row === 0) {
            if (col <= 4) {
                chessboard[row][col] = new board(col + 2, WHITE, NO);
            } else {
                chessboard[row][col] = new board(SIZE - col + 1, WHITE, NO);
            }
        } else if (row === SIZE - 1) {
            if (col <= 4) {
                chessboard[row][col] = new board(col + 2, BLACK, NO);
            } else {
                chessboard[row][col] = new board(SIZE - col + 1, BLACK, NO);
            }
        } else {
            chessboard[row][col] = new board(NONE, EMPTY, NO);
        }

    }
}
    

console.log('Start Game');
// console.log(chessboard);

// what I understand from this is if any of the squares is clicked, put an alert and return squares id
let chosenPieceId = null;

// The bridge between the user interface and the javascript code lies in this function
function whichTileWasClicked() {
    const squares = document.querySelectorAll('.black_square, .white_square');
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', movePiece);
    };
}

const movePiece = (e) => {
    const id = e.target.id;

    let row1 = Math.floor(chosenPieceId / 8);
    let col1 = chosenPieceId % 8;
    let row2 = Math.floor(id / 8);
    let col2 = id % 8;

    if (!chosenPieceId) { // if trying to move
        chosenPieceId = id;
    } else {
        let piece1 = document.getElementById(chosenPieceId);
        
        if (isValidMove(row1, col1, row2, col2)) {
            chessboard[row2][col2].piece = chessboard[row1][col1].piece;
            chessboard[row1][col1].piece = null;

            e.target.innerText = piece1.textContent;
            piece1.textContent = null;
            flipBoard();
        } else {
            alert("You Dumbo, that was an illegal move");
        }
        chosenPieceId = null;
    }
}

function isValidMove(row1, col1, row2, col2) {
    // console.log(row1, row2, col1, col2);
    let piece = chessboard[row1][col1].piece;
    if (piece === NONE) {
        return false;
    }
    // } else if (piece === PAWN) {
    //     return canPawnMove(row1, col1, row2, col2);
    // } else if (piece === ROOK) {
    //     return canRookMove(row1, col1, row2, col2);
    // } else if (piece === KNIGHT) {
    //     return canKnightMove(row1, col1, row2, col2);
    // } else if (piece === BISHOP) {
    //     return canBishopMove(row1, col1, row2, col2);
    // } else if (piece === QUEEN) {
    //     return canRookMove(row1, col1, row2, col2) ||
    //     canBishopMove(row1, col1, row2, col2);
    // } else if (piece === KING) {
    //     return canKingMove(row1, col1, row2, col2);
    // }
    return true;

}


function flipBoard() {
    for (let row = 0; row < SIZE / 2; row++) {
        for (let col = 0; col < SIZE; col++) {
            let piece1 = document.getElementById((8 * row) + col);
            let piece2 = document.getElementById(8 * (7 - row) + col);
            let piece3 = piece1.textContent;
            piece1.textContent = piece2.textContent;
            piece2.textContent = piece3;

            chessboard[row][col] = chessboard[7 - row][col];
        }
    }
}



whichTileWasClicked();


// if (chosenPieceId && chosenSquareId) {
//     alert('Trying to move from', chosenPieceId, 'to', chosenSquareId);
// }


// tile = whichTileWasClicked();
// if (tile) {
//     console.log("alright");
//     alert(`The ${square.id} Square Was clicked`);
// }
