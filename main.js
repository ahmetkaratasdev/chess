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
let moves = [];
let colour = WHITE;
let turn = 0;

function newBoard() {
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
}
    
new newBoard();
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
    console.log(chessboard[6][4]);
    const id = e.target.id;

    let row1 = Math.floor(chosenPieceId / 8);
    let col1 = chosenPieceId % 8;
    let row2 = Math.floor(id / 8);
    let col2 = id % 8;
    console.log(row1, col1, row2, col2);
    // let piece = document.getElementById(chosenPieceId);

    let square1 = chessboard[row1][col1];
    let square2 = chessboard[row2][col2];


    // 1. if a square2 has been chosen
    // 2. if it's the corresponding colour
    // 3. If a square2 hasn't been selected
    
    // **************************************** 
    // If a square2 was selected AND it's the first square2 chosen
    // AND the square2's colour is the correct colur
    // ****************************************
    if (square2 && !chosenPieceId && square2.colour === colour) { 
        chosenPieceId = id;
        console.log(`chosenPieceId: ${chosenPieceId}`);
        // }
    } else if (chosenPieceId) {
        let piece1 = document.getElementById(chosenPieceId);
        if (isValidMove(row1, col1, row2, col2)) {

            // **************************************** CHESS HISTORY
            // **************************************** UPDATE COORDINATES
            if (colour === WHITE) moves[turn] = {row1, col1, row2, col2};
            else if (colour === BLACK) moves[turn] = ({
                'row1': 7 - row1,
                'col1': col1,
                'row2': 7 - row2,
                'col2': col2
            });
            console.log(`turn is ${turn}`);
            // **************************************** UPDATE COORDINATES

            // **************************************** IF square2 IS ATTACKING
            // if (chessboard[row2][col2].square2) {
            let temp = document.getElementById((8 * row2) + col2);
            // console.log(moves[turn - 1].square2);
            moves[turn]['pieceCode'] = temp.textContent;
            moves[turn]['square1'] = chessboard[row1][col1];
            moves[turn]['square2'] = chessboard[row2][col2];
            moves[turn]['hasPieceMoved'] = chessboard[row1][col1].hasPieceMoved;
            // }
            // **************************************** IF square2 IS ATTACKING

            // **************************************** CHESS HISTORY            
            // **************************************** EMPASSANT
            // if a pawn is moving to a different column && destination is empty, 
            if (square1.piece === PAWN && !square2.piece && col1 != col2) {
                chessboard[row2 + 1][col2] = new board(NONE, EMPTY, NO);
                let opposingPawn = document.getElementById((8 * (row2 + 1)) + col2);
                opposingPawn.textContent = null;
            }
            // **************************************** EMPASSANT

            // **************************************** UPDATE CHESSBOARD
            chessboard[row2][col2] = chessboard[row1][col1];
            chessboard[row2][col2].hasPieceMoved = YES;
            chessboard[row1][col1] = new board(NONE, EMPTY, NO);
            
            // **************************************** UPDATE BROWSER BOARD
            e.target.innerText = piece1.textContent;
            piece1.textContent = null;

            flipBoard();
        } else {
            alert(`invalid move mate. That piece can't move there`);
        }
        chosenPieceId = null;
        print_debug_chessboard(chessboard);
    } else {
        // print_debug_chessboard(chessboard);
        alert(`Either the square u selected is empty or u clicked the wrong colour`); 
    }
    console.log(`turn: ${turn}`);
}

