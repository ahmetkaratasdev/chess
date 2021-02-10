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
    let hasPieceMoved = position1.hasPieceMoved;

    // if attempting to empassant
    console.log(position1);
    console.log(chessboard[row2][col2]);
    // ****************************************
    if (position1.empassant.answer === YES) {                      // if it can empassant  
        // console.log(`position1 row: ${position1.empassant.withRow} and col: ${position1.empassant.withCol}`);
        if (position1.empassant.withRow === row2 + 1 && position1.empassant.withCol === col2) {
            return true;
        }
    // if dest is empty and it's the same column
    // *****************************************
    } else if (position2.piece === NONE && col1 === col2) { 
        if (row1 - row2 === 1) {                                 // if the pawn wants to move up 1 position
            return true;
        } else if (row1 - row2 === 2 && !hasPieceMoved) {       // if the pawn wnats to move up 2 positions
            if (chessboard[row1 - 1][col1].piece === NONE) {         // if the square in front of it is empty
                canAdjacentPawnEmpassant(row2, col2);
                return true;
            }
        }
    } else if (position2.piece != NONE) {
        console.log(`colour 1 and position2.colour: ${colour} and ${position2.colour}`);
        // print_debug_chessboard(chessboard);
        if (colour != position2.colour && row2 === row1 - 1 && col2 === col1 - 1) {             // if it wants to kill an opponent
            return true;
        } else if (colour != position2.colour && row2 === row1 - 1 && col2 === col1 + 1) {             // if it wants to kill an opponent
            return true;
        }
    }
    return false;
}

function canAdjacentPawnEmpassant(row2, col2) {
    let positionL = chessboard[row2][col2 - 1];
    let positionR = chessboard[row2][col2 + 1];
    // If the there's a pawn to the right of the destination
    // of opposite colour
    if (col2 < SIZE - 1) {                                                  
        if (positionR.piece === PAWN && positionR.colour != colour) {
            chessboard[row2][col2 + 1].empassant.answer = YES;
            chessboard[row2][col2 + 1].empassant.withRow = row2;
            chessboard[row2][col2 + 1].empassant.withCol = col2;
        }
    }
    if (col2 > 0) {
        if (positionL.piece === PAWN && positionL.colour != colour) {
            chessboard[row2][col2 - 1].empassant.answer = YES;
            chessboard[row2][col2 - 1].empassant.withRow = row2;
            chessboard[row2][col2 - 1].empassant.withCol = col2;
        }
    }
}

function flipBoard() {
    // change colour
    if (colour === WHITE) colour = BLACK;
    else if (colour === BLACK) colour = WHITE;
    turn++; // update turn

    for (let row = 0; row < SIZE / 2; row++) {
        for (let col = 0; col < SIZE; col++) {
            // update HTML browser
            let piece1 = document.getElementById((8 * row) + col);
            let piece2 = document.getElementById(8 * (7 - row) + col);
            let piece3 = piece1.textContent;
            piece1.textContent = piece2.textContent;
            piece2.textContent = piece3;

            // update local chessboard

            // updating empassant.with rows to reflect board flips
            // if (chessboard[row][col].empassant.answer === YES) {
            //     chessboard[row][col].empassant.withRow = 7 - row;
            // } else if (chessboard[7 - row][col].empassant.answer === YES) {
            //     chessboard[7 - row][col].empassant.withRow = row;
            // }
            temp = chessboard[row][col];
            chessboard[row][col] = chessboard[7 - row][col];
            chessboard[7 - row][col] = temp;
        }
    }
}


function print_debug_chessboard(curr_board) {
    console.log(chessboard);
    var row, col;
    var image;
    image += ("  ABCDEFGH\n");
    // image += ("   ---------------------------------------\n");
    for (row = 0; row < SIZE; row++) {
        for (col = 0; col < SIZE; col++) {
            console.log(`row and col: ${row} ${col}`);
            if (col == 0) {
                image += ("%d ", row + 1);
            }
            image += ("%d ", curr_board[row][col].piece);
        }
        image += ("\n");
    }
    console.log(image);

    // let BOB = ("  ABCDEFGH\n");
    // // BOB += ("   ---------------------------------------\n");
    // for (row = 0; row < SIZE; row++) {
    //     for (col = 0; col < SIZE; col++) {
    //         if (col == 0) {
    //             BOB += ("%d ", row + 1);
    //         }
    //         // if (row === 3 && col === 4) {
    //         //     BOB += ("%d", curr_board[row][col].piece,
    //         //     curr_board[row][col].empassant.withRow, 
    //         //     curr_board[row][col].empassant.withCol);

    //         // }
    //         BOB += ("%d ", curr_board[row][col].colour);
    //     }
    //     BOB += ("\n");
    // }
    // console.log(BOB);
}

whichTileWasClicked();


function rewind() {
    flipBoard();
    turn += -2;
    // alert(turn);
    print_debug_chessboard(chessboard);
    console.log(moves[turn]);
    let col1 = moves[turn]['col1'];
    let col2 = moves[turn]['col2'];
    var row1, row2;
    console.log(colour);
    if (colour === WHITE) {
        row1 = moves[turn]['row1'];
        row2 = moves[turn]['row2'];
    } else {
        row1 = 7 - moves[turn]['row1'];
        row2 = 7 - moves[turn]['row2'];
    }

    // *********************************** Get the most recent
    // *********************************** move and reverse it
    chessboard[row1][col1] = chessboard[row2][col2];
    let piece1 = document.getElementById(8 * row1 + col1);
    let piece2 = document.getElementById(8 * row2 + col2);
    piece1.textContent = piece2.textContent;
    piece2.textContent = moves[turn]['pieceCode'];
    if (turn === 1) {
        let initialBoard = new newBoard();
        console.log(chessboard);
        chessboard[row2][col2].piece = initialBoard[row2][col2].piece;
    } else {
        chessboard[row2][col2] = moves[turn]['square'];
    }
    // if (!chessboard[row2][col2].piece) {
    //     chessboard[row2][col2].piece = NONE;
    // }

    // print_debug_chessboard(chessboard);

    // *********************************** Get the most recent
    // *********************************** move and reverse it

}

// function fastForward() {
// }


// if (chosenPieceId && chosenSquareId) {
//     alert('Trying to move from', chosenPieceId, 'to', chosenSquareId);
// }


// tile = whichTileWasClicked();
// if (tile) {
//     console.log("alright");
//     alert(`The ${square.id} Square Was clicked`);
// }
