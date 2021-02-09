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



// have a board struct
class board {
    constructor(piece, colour, hasPieceMoved) {
        this.hasPieceMoved = hasPieceMoved;
        this.piece = piece;
        this.colour = colour;
        this.empassant = {
            answer : NO,
            withRow : -1,
            withCol : -1
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
let turn = WHITE;
// initialise the board pieces
for (let row = 0; row < SIZE; row++) {
    chessboard[row] = [];
    for (let col = 0; col < SIZE; col++) {
        // if second or 7th row,
        if (row === 1) {
            chessboard[row][col] = new board(PAWN, BLACK, NO);
        } else if (row === SIZE - 2) {
            chessboard[row][col] = new board(PAWN, WHITE, NO);

        } else if (row === 0) {
            if (col <= 4) {
                chessboard[row][col] = new board(col + 2, BLACK, NO);
            } else {
                chessboard[row][col] = new board(SIZE - col + 1, BLACK, NO);
            }
        } else if (row === SIZE - 1) {
            if (col <= 4) {
                chessboard[row][col] = new board(col + 2, WHITE, NO);
            } else {
                chessboard[row][col] = new board(SIZE - col + 1, WHITE, NO);
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

// The bridge between the user leterface and the javascript code lies in this function
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
    console.log(row1, col1, row2, col2);
    // let piece = document.getElementById(chosenPieceId);

    let piece = chessboard[row2][col2];

    // 1. if a piece has been chosen
    // 2. if it's the corresponding turn
    // 3. If a piece hasn't been selected
    
    console.log('hi', chessboard[3][0].piece, chessboard[3][0].colour);
    if (piece && !chosenPieceId && piece.colour === turn) { // if trying to move
        // if (chessboard[row2][col2].colour != turn) {
        console.log(`chosenPieceId: ${chosenPieceId}`);
        chosenPieceId = id;
        console.log(`chosenPieceId: ${chosenPieceId}`);
        // }
    } else if (chosenPieceId) {
        let piece1 = document.getElementById(chosenPieceId);
        if (isValidMove(row1, col1, row2, col2)) {
            // console.log(`row1 col1, row2, col2: ${row1} ${col1} ${row2} ${col2}`);
            // console.log('bye', chessboard[0][0].piece, chessboard[0][0].colour);

            chessboard[row2][col2] = chessboard[row1][col1];
            chessboard[row2][col2].hasPieceMoved = YES;
            chessboard[row1][col1] = new board(NONE, EMPTY, NO);
            
            e.target.innerText = piece1.textContent;
            piece1.textContent = null;
            flipBoard();
        } else {
            alert(`invalid move mate. That piece can't move there`);
        }
        chosenPieceId = null;
        print_debug_chessboard(chessboard);
    } else {
        alert(`Either the square u selected is empty or u clicked the wrong colour`); 
    }
}

function isValidMove(row1, col1, row2, col2) {
    // console.log(row1, row2, col1, col2);
    let piece = chessboard[row1][col1].piece;
    if (piece === NONE) {
        return false;
    } else if (piece === PAWN) {
        return canPawnMove(row1, col1, row2, col2);
    }
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

function canPawnMove(row1, col1, row2, col2) {
    // if the pawn 
    let position1 = chessboard[row1][col1];
    let position2 = chessboard[row2][col2];
    let colour = position1.colour;
    let hasPieceMoved = position1.hasPieceMoved;
    
    // if attempting to empassant
    console.log(position1);
    console.log(chessboard[row2][col2]);
    if (position1.empassant.answer === YES) {                      // if it can empassant  
        alert('this is where it went to');
        console.log(`position1 row: ${position1.empassant.withRow} and col: ${position1.empassant.withCol}`);
        if (position1.empassant.withRow === row2 && position1.empassant.withCol === col2) {
            return true;
        }
    // if dest is empty and it's the same column
    } else if (position2.piece === NONE && col1 === col2) { 
        if (row1 - row2 === 1) {                                 // if the pawn wants to move up 1 position
            return true;
        } else if (row1 - row2 === 2 && !hasPieceMoved) {       // if the pawn wnats to move up 2 positions
            if (chessboard[row1 - 1][col1].piece === NONE) {         // if the square in front of it is empty
                // canAdjacentPawnEmpassant(row2, col2);
                return true;
            }
        }
    } else if (position2.piece != NONE) {
        console.log(`colour 1 and position2.colour: ${colour} and ${position2.colour}`);
        print_debug_chessboard(chessboard);
        if (colour != position2.colour && row2 === row1 - 1 && col2 === col1 - 1) {             // if it wants to kill an opponent
            return true;
        } else if (colour != position2.colour && row2 === row1 - 1 && col2 === col1 + 1) {             // if it wants to kill an opponent
            return true;
        }
    }
    return false;
}

// function canAdjacentPawnEmpassant(row2, col2) {
//     let positionL = chessboard[row2][col2 - 1];
//     let positionR = chessboard[row2][col2 + 1];
//     // If the there's a pawn to the right of the destination
//     // of opposite colour
//     if (col2 < SIZE - 1) {                                                  
//         if (positionR.piece === PAWN && positionR.colour != turn) {
//             chessboard[row2][col2 + 1].empassant.answer = YES;
//             chessboard[row2][col2 + 1].empassant.withRow = row2;
//             chessboard[row2][col2 + 1].empassant.withCol = col2;
//         }
//     }
//     if (col2 > 0) {
//         if (positionL.piece === PAWN && positionL.colour != turn) {
//             chessboard[row2][col2 - 1].empassant.answer = YES;
//             chessboard[row2][col2 - 1].empassant.withRow = row2;
//             chessboard[row2][col2 - 1].empassant.withCol = col2;
//         }
//     }
// }

function flipBoard() {
    if (turn === WHITE) turn = BLACK;
    else if (turn === BLACK) turn = WHITE;

    for (let row = 0; row < SIZE / 2; row++) {
        for (let col = 0; col < SIZE; col++) {
            // update HTML browser
            let piece1 = document.getElementById((8 * row) + col);
            let piece2 = document.getElementById(8 * (7 - row) + col);
            let piece3 = piece1.textContent;
            piece1.textContent = piece2.textContent;
            piece2.textContent = piece3;

            // update local chessboard
            temp = chessboard[row][col];
            chessboard[row][col] = chessboard[7 - row][col];
            chessboard[7 - row][col] = temp;

        }
    }
}


function print_debug_chessboard(curr_board) {
    var row, col;
    var image;
    image += ("  ABCDEFGH\n");
    // image += ("   ---------------------------------------\n");
    for (row = 0; row < SIZE; row++) {
        for (col = 0; col < SIZE; col++) {
            if (col == 0) {
                image += ("%d ", row + 1);
            }
            image += ("%d", curr_board[row][col].piece);
        }
        image += ("\n");
    }
    console.log(image);
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
