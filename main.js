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
    
    const duplicateId1 = 8 * (7 - row1) + (7 - col1) + 64
    const duplicateId2 = 8 * (7 - row2) + (7 - col2) + 64
    // redeclare the local chessboard
    let square1 = chessboard[row1][col1];
    let square2 = chessboard[row2][col2];
    // **************************************** 
    // If square2 was selected AND it's the first square chosen
    // AND square2's colour is the correct colur
    // ****************************************
    if (square2 && !chosenPieceId && square2.colour === colour) { 
        let piece1 = document.getElementById(id);
        // Make the square turn green as soon as you click it
        // override the a:hover function
        // if (id % 2 === 0) piece1.classList.remove("white_square");
        // else piece1.classList.remove("black_square");
        piece1.classList.add("square_selected");
        chosenPieceId = id;

    } else if (chosenPieceId) {
        let piece1 = document.getElementById(chosenPieceId);
        
        let duplicatePiece1 = document.getElementById(chosenPieceId + 64);

        piece1.classList.remove("square_selected");
        // if (chosenPieceId % 2 === 0) piece1.classList.add("white_square");
        // else piece1.classList.add("black_square"); 
        // alert('hello');
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
            // console.log(`turn is ${turn}`);
            // **************************************** 
            // Incase history is trying to be rewritten
            for (let i = turn + 1; i < moves.length; i++) {
                moves[i] = null;
            }
            // **************************************** 

            // **************************************** IF square2 IS ATTACKING
            let temp = document.getElementById((8 * row2) + col2);
            moves[turn]['pieceCode'] = temp.textContent;
            moves[turn]['square1'] = chessboard[row1][col1];
            moves[turn]['square2'] = chessboard[row2][col2];
            moves[turn]['hasPieceMoved'] = chessboard[row1][col1].hasPieceMoved;
            // **************************************** IF square2 IS ATTACKING

            // **************************************** CHESS HISTORY            
            // **************************************** EMPASSANT
            // if a pawn is moving to a different column && destination is empty, 
            // What if it's black??? wouldn't it be row - 1?
            // if (square1.piece === PAWN && !square2.piece && col1 != col2) {
            //     chessboard[row2 + 1][col2] = new board(NONE, EMPTY, NO);
            //     let opposingPawn = document.getElementById((8 * (row2 + 1)) + col2);
            //     opposingPawn.textContent = null;
            // }
            // // **************************************** EMPASSANT

            // **************************************** UPDATE CHESSBOARD
            chessboard[row2][col2] = chessboard[row1][col1];
            chessboard[row2][col2].hasPieceMoved = YES;
            chessboard[row1][col1] = new board(NONE, square1.colour, NO);
            
            // **************************************** UPDATE BROWSER BOARD
            document.getElementById(id).innerHTML = piece1.textContent;
            document.getElementById(duplicateId2).innerHTML = piece1.textContent;

            piece1.textContent = null;
            document.getElementById(duplicateId1).innerHTML = null;
            // duplicatePiece1.textContent = null;


            if (colour === WHITE) colour = BLACK;
            else if (colour === BLACK) colour = WHITE;
            turn++; // update turn
            // alert(square1.colour);


        } else {
            alert(`invalid move mate. That piece can't move there`);
        }
        chosenPieceId = null;
        print_debug_chessboard(chessboard);


    } else {
        alert(`Either the square u selected is empty or u clicked the wrong colour`); 
    }



    console.log(`turn: ${turn}`);
}

