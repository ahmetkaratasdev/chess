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
let chosenPieceId = null;
var row1, col1, row2, col2;
// The bridge between the user interface and the javascript code lies in this function
function whichTileWasClicked() {
    const squares = document.querySelectorAll('.black_square, .white_square');
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', movePiece);
    };
}

const movePiece = (e) => {
    const id = e.target.id;
    
    // if chosen from the first chessboard, obtain the corresponding row and column
    if (id < 64 && colour === WHITE) { 
        if (chosenPieceId) {
            if (chosenPieceId >= 64) {
                alert('squares selected must be on the same board');
            } else {
                row2 = Math.floor(id / 8);
                col2 = id % 8; 
            }
        } else {
            row1 = Math.floor(id / 8);
            col1 = id % 8;
        }

    // if chosen from the second chessboard, obtain the corresponding row and column
    } else if (id >= 64 && colour === BLACK) {
        if (chosenPieceId) {
            if (chosenPieceId < 64) {
                alert('squares selected must be on the same board');
            } else {
                row2 = Math.floor((id - 64) / 8);
                col2 = (id - 64) % 8;
            }
        } else {  
            // alert('hi');
            row1 = Math.floor((id - 64) / 8);
            col1 = (id - 64) % 8;   
        }
    } else {
        alert("Player must select square from appropriate board");
        return;
    }

    // if chessboard 1 is chosen, get the corresponding element id in the second chessboard
    var duplicateId1, duplicateId2;
    if (colour == WHITE) {
        duplicateId1 = 8 * (7 - row1) + (7 - col1) + 64;
        duplicateId2 = 8 * (7 - row2) + (7 - col2) + 64;

    // if chessboard 2 is chosen, get the corresponding element id in the first chessboard
    } else {
        duplicateId1 = (127 - chosenPieceId);
        duplicateId2 = (127 - id);
    }

    var square1, square2;
    square1 = chessboard[row1][col1];
    if (row2 && col2) square2 = chessboard[row2][col2];
    else square2 = null;
    // **************************************** 
    // If a sqaure was selected AND it's the first square chosen
    // AND the square's colour is the correct colur
    // ****************************************
    if (square1 && !chosenPieceId && square1.colour === colour) {
        let piece1 = document.getElementById(id);
        piece1.classList.add("square_selected");
        chosenPieceId = id;

    } else if (chosenPieceId) {
        let piece1 = document.getElementById(chosenPieceId);
        piece1.classList.remove("square_selected");

        if (isValidMove(row1, col1, row2, col2)) {
            // **************************************** CHESS HISTORY
            if (colour === WHITE) {
                i = -1;
                document.getElementById("c1").style.color = "silver";
                document.getElementById("c2").style.color = "black";
                // moves[turn] = {row1, col1, row2, col2};
            } else if (colour === BLACK) {
                i = 1;
                document.getElementById("c1").style.color = "black";
                document.getElementById("c2").style.color = "silver";
                // moves[turn] = ({
                //     'row1': 7 - row1,
                //     'col1': col1,
                //     'row2': 7 - row2,
                //     'col2': col2
                // });
            }
            // **************************************** UPDATE COORDINATES
            // **************************************** 
            // Incase history is trying to be rewritten
            // for (let i = turn + 1; i < moves.length; i++) {
            //     moves[i] = null;
            // }
            // **************************************** 

            // **************************************** IF square2 IS ATTACKING
            // let temp = document.getElementById((8 * row2) + col2);
            // moves[turn]['pieceCode'] = temp.textContent;
            // moves[turn]['square1'] = chessboard[row1][col1];
            // moves[turn]['square2'] = chessboard[row2][col2];
            // moves[turn]['hasPieceMoved'] = chessboard[row1][col1].hasPieceMoved;
            // **************************************** IF square2 IS ATTACKING

            // **************************************** CHESS HISTORY     

            // **************************************** EMPASSANT
            // if a pawn is moving to a different column && destination is empty, 
            // What if it's black??? wouldn't it be row - 1?
            
            // if (square1.piece === PAWN && !square2.piece && col1 != col2) {
            //     alert("you made it");
            //     chessboard[row2 + i][col2] = new board(NONE, EMPTY, NO);
            //     let opposingPawn = document.getElementById((8 * (row2 + i)) + col2);
            //     opposingPawn.textContent = null;
            // }
            // // **************************************** EMPASSANT

            // **************************************** UPDATE CHESSBOARD
            chessboard[row2][col2] = chessboard[row1][col1];
            chessboard[row2][col2].hasPieceMoved = YES;
            chessboard[row1][col1] = new board(NONE, EMPTY, NO);
            
            // **************************************** UPDATE BROWSER BOARD
            // UPDATE FIRST AND SECOND BOARS
            document.getElementById(id).innerHTML = piece1.textContent;
            document.getElementById(duplicateId2).innerHTML = piece1.textContent;
            
            document.getElementById(duplicateId1).innerHTML = null;
            piece1.textContent = null;
            flipBoard();


        } else {
            alert(`invalid move mate. That piece can't move there`);
        }
        chosenPieceId = null;
        print_debug_chessboard(chessboard);
        // flipBoard();


    } else {
        alert(`Either the square u selected is empty or u clicked the wrong colour`); 
    }
    console.log(`turn: ${turn}`);
}

