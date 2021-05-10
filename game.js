function isValidMove(row1, col1, row2, col2) {
    // console.log(row1, row2, col1, col2);
    let piece = chessboard[row1][col1].piece;
    if (piece === NONE) {
        return false;
    } else if (piece === PAWN) {
        return canPawnMove(row1, col1, row2, col2);
    } else if (piece === ROOK) {
        return canRookMove(row1, col1, row2, col2);
    } else if (piece === KNIGHT) {
        return canKnightMove(row1, col1, row2, col2);
    } else if (piece === BISHOP) {
        return canBishopMove(row1, col1, row2, col2);
    } else if (piece === QUEEN) {
        return canRookMove(row1, col1, row2, col2) ||
        canBishopMove(row1, col1, row2, col2);
    } 
    // else if (piece === KING) {
    //     return canKingMove(row1, col1, row2, col2);
    // }
    return true;

}

function canPawnMove(row1, col1, row2, col2) {
    // if the pawn 
    let position1 = chessboard[row1][col1];
    let position2 = chessboard[row2][col2];
    let hasPieceMoved = position1.hasPieceMoved;
    // var i;
    // if (colour === WHITE) i = - 1;
    // else i = 1;

    // if attempting to empassant
    // ****************************************
    if (position1.empassant.answer === YES) {                      // if it can empassant  
        // alert(`position1 row: ${position1.empassant.withRow} and col: ${position1.empassant.withCol}`);
        // If white is playing, empassant with row will be row2 + 1, col2
        // If black is playing, empassant with row will be row2 - 1, col2
        if (colour === WHITE) i = 1
        else i = -1
        if (position1.empassant.withRow === row2 + i && position1.empassant.withCol === col2) {
            return true;
        }
    // if dest is empty and it's the same column
    // *****************************************
    } else if (position2.piece === NONE && col1 === col2) { 
        // alert('hi');
        if (Math.abs(row2 - row1) === 1) {                                 // if the pawn wants to move up 1 position
            return true;
        } else if (Math.abs(row2 - row1) === 2 && !hasPieceMoved) {       // if the pawn wnats to move up 2 positions
            if (chessboard[row1 - 1][col1].piece === NONE) {         // if the square in front of it is empty
                canAdjacentPawnEmpassant(row2, col2);
                // for (let r = 0; r < 8; r++) {
                //     for (let c = 0; c < 8; c++) {
                //         if (chessboard[r][c].empassant.answer === YES) {
                //             console.log("row and col: " + r + ' ' + c + ' empassant with row: ' + chessboard[r][c].empassant.withRow + ', with col: ' + chessboard[r][c].empassant.withCol);
                //         }
                //     }
                // }
                // print_debug_chessboard(chessboard);
                return true;
            }
        }

    // else if I'm trying to attack a piece
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

// function which checks if a particular column can empassant or not
function canAdjacentPawnEmpassant(row2, col2) {
    let positionL = chessboard[row2][col2 - 1];
    let positionR = chessboard[row2][col2 + 1];
    // If the there's a pawn to the right of the destination
    // of opposite colour
    console.log("what is happening");
    console.log("col2 is ", col2);
    if (col2 < SIZE - 1) {                                                  
        if (positionR.piece === PAWN && positionR.colour != colour) {
            alert("hi")
            chessboard[row2][(col2 + 1)].empassant.answer = YES;
            chessboard[row2][(col2 + 1)].empassant.withRow = row2;
            chessboard[row2][(col2 + 1)].empassant.withCol = col2;
        }
    }
    if (col2 > 0) {
        if (positionL.piece === PAWN && positionL.colour != colour) {
            alert("bye")

            chessboard[row2][(col2 - 1)].empassant.answer = YES;
            chessboard[row2][(col2 - 1)].empassant.withRow = row2;
            chessboard[row2][(col2 - 1)].empassant.withCol = col2;
        }
    }
}

function canRookMove(row1, col1, row2, col2) {
    var row, col;
    if (chessboard[row1][col1].colour != chessboard[row2][col2].colour) {
        if (col1 == col2) {     // if vertical
            if (row2 > row1) {
                for (row = row1 + 1; row < row2; row++) {
                    if (chessboard[row][col1].piece != NONE) {                        // if any of the positions before destination 
                        return false;                                           // is not empty, then return false
                    }       
                }
                return true;
            } else if (row2 < row1) {
                for (row = row1 - 1; row > row2; row--) {
                    if (chessboard[row][col1].piece != NONE) {                        // if any of the positions before destination 
                        return false;                                           // is not empty, then return false
                    }       
                }
                return true;
            }
        } else if (row1 == row2) {  // if horizontal
            if (col2 > col1) {
                for (col = col1 + 1; col < col2; col++) {
                    if (chessboard[row1][col].piece != NONE) {
                        return false;
                    }
                }
                return true;
            } else if (col2 < col1) {
                for (col = col1 - 1; col > col2; col--) {
                    if (chessboard[row1][col].piece != NONE) {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    return false;
}

function canBishopMove(row1, col1, row2, col2) {
    colour1 = chessboard[row1][col1].colour;
    colour2 = chessboard[row2][col2].colour;

    if (colour1 != colour2) {

        if (row2 < row1 && col2 < col1) {
            row1--, col1--;
            while (row2 < row1 && col2 < col1) {
                if (chessboard[row1][col1].piece != 0) {
                    return false;
                }
                row1--, col1--;
            }
        // top right
        } else if (row2 < row1 && col2 > col1) {
            row1--, col1++;
            while (row2 < row1 && col2 > col1) {
                if (chessboard[row1][col1].piece != 0) {
                    return false;
                }
                row1--, col1++;
            }
        // bottom left
        } else if (row2 > row1 && col2 < col1) {
            row1++, col1--;
            while (row2 > row1 && col2 < col1) {
                if (chessboard[row1][col1].piece != 0) { 
                    return false;
                }
                row1++, col1--;
            }

        // bottom right
        } else if (row2 > row1 && col2 > col1) {
            row1++, col1++;
            while (row2 > row1 && col2 > col1) {
                if (chessboard[row1][col1].piece != 0) {
                    return false;
                }
                row1++, col1++;
            }
        } else {
            return false;
        }
        // if (row1 == row2 && col1 == col2) {

        return true;
        // }
    }
    return false;
}

function canKnightMove(row1, col1, row2, col2) {
    if (chessboard[row1][col1].colour == chessboard[row2][col2].colour) {
        return false;
    }
    if (row2 == row1 - 1 && col2 == col1 - 2) {
        return true;
    } else if (row2 == row1 - 2 && col2 == col1 - 1) {
        return true;
    } else if (row2 == row1 - 2 && col2 == col1 + 1) {
        return true;
    } else if (row2 == row1 - 1 && col2 == col1 + 2) {
        return true;
    } else if (row2 == row1 + 1 && col2 == col1 + 2) {
        return true;
    } else if (row2 == row1 + 2 && col2 == col1 + 1) {
        return true;
    } else if (row2 == row1 + 2 && col2 == col1 - 1) {
        return true;
    } else if (row2 == row1 + 1 && col2 == col1 - 2) {
        return true;
    }
    return false;
}

function flipBoard() {
    // change colour
    if (colour === WHITE) colour = BLACK;
    else if (colour === BLACK) colour = WHITE;
    turn++; // update turn
    var row, col;

    // for (let r = 0; r < 8; r++) {
    //     for (let c = 0; c < 8; c++) {
    //         if (chessboard[r][c].empassant.answer === YES) {
    //             console.log("row and col: " + r + ' ' + c + ' empassant with row: ' + chessboard[r][c].empassant.withRow + ', with col: ' + chessboard[r][c].empassant.withCol);
    //         }
    //     }
    // }

    // update the board vertically
    for (row = 0; row < SIZE / 2; row++) {
        for (col = 0; col < SIZE; col++) {
            // update HTML browser
            // let piece1 = document.getElementById((8 * row) + col);
            // let piece2 = document.getElementById(8 * (7 - row) + col);
            // let piece3 = piece1.textContent;
            // piece1.textContent = piece2.textContent;
            // piece2.textContent = piece3;

            // update local chessboard

            // updating empassant.with rows to reflect board flips
            // if (chessboard[row][col].empassant.answer === YES) {
            //     chessboard[7 - row][col].empassant.withRow = 7 - row;
            // } else if (chessboard[7 - row][col].empassant.answer === YES) {
            //     chessboard[7 - row][col].empassant.withRow = row;
            // }
            // if (chessboard[row][col].empassant.answer === YES) {
            //     chessboard[row][col].empassant.withRow = 7 - row;
            //     alert("done")
            // }
            console.log("row and col: " + row + ' ' + col + ' empassant with row: ' + chessboard[row][col].empassant.withRow + ', with col: ' + chessboard[row][col].empassant.withCol);

            temp = chessboard[row][col];
            // temp.empassant.withRow = 7 - chessboard[row][col].empassant.withRow
            // temp.empassant.withCol = 7 - chessboard[row][col].empassant.withCol

            chessboard[row][col] = chessboard[7 - row][7 - col];
            if (7 - row === 4 && 7 - col === 4) {
                console.log("chessboard is ", chessboard);
            }
            chessboard[7 - row][7 - col] = temp;
            console.log("row and col: " + row + ' ' + col + ' empassant with row: ' + chessboard[row][col].empassant.withRow + ', with col: ' + chessboard[row][col].empassant.withCol);




        }
    }

        // update the board horiztonally
    // for (row = 0; row < SIZE; row++) {
    //     for (col = 0; col < SIZE / 2; col++) {
    //         // update HTML browser
    //         // let piece1 = document.getElementById((8 * row) + col);
    //         // let piece2 = document.getElementById(8 * row + (7 - col));
    //         // let piece3 = piece1.textContent;
    //         // piece1.textContent = piece2.textContent;
    //         // piece2.textContent = piece3;

    //         // update local chessboard
    //         // updating empassant.with cols to reflect board flips
    
    //         // } else if (chessboard[7 - row][col].empassant.answer === YES) {
    //         //     chessboard[7 - row][col].empassant.withRow = row;
    //         // }
    //         temp = chessboard[row][col];
    //         chessboard[row][col] = chessboard[row][7 - col];
    //         chessboard[row][7 - col] = temp;
    //         // if (chessboard[row][col].empassant.answer === YES) {
    //         //     chessboard[row][col].empassant.withCol = 7 - col;
    //         //     alert("woo");
    //         // }
    //     }
    // }

    // for (let r = 0; r < 4; r++) {
    //     for (let c = 0; c < 8; c++) {
    //         if (chessboard[r][c].empassant.answer === YES) {
    //             chessboard[r][c].empassant.withRow = r;
    //             // chessboard[r][c].empassant.withCol = 7 - c;
    //             // console.log("row and col: " + r + ' ' + c + ' empassant with row: ' + chessboard[r][c].empassant.withRow + ', with col: ' + chessboard[r][c].empassant.withCol);
    //         }
    //     }
    // }

    // for (let r = 0; r < 8; r++) {
    //     for (let c = 0; c < 4; c++) {
    //         if (chessboard[r][c].empassant.answer === YES) {
    //             chessboard[r][c].empassant.withCol = c;
    //             chessboard[r][c].empassant.withCol = 7 - c;
    //         }
    //     }
    // }

}


function print_debug_chessboard(curr_board) {
    console.log(chessboard);
    var row, col;
    var image;
    image += ("  ABCDEFGH\n");
    // image += ("   ---------------------------------------\n");
    for (row = 0; row < SIZE; row++) {
        for (col = 0; col < SIZE; col++) {
            if (col == 0) {
                image += ("%d ", row + 1);
            }
            image += ("%d ", curr_board[row][col].piece);
        }
        image += ("\n");
    }
    console.log(image);

}

whichTileWasClicked();


function rewind() {
    console.log(`turn is ${turn}`);
    if (turn > 0) {
        // flipBoard();
        // print_debug_chessboard(chessboard);
        turn += -2;
        let col1 = moves[turn]['col1'];
        let col2 = moves[turn]['col2'];
        var row1, row2;
        if (colour === WHITE) {
            row1 = moves[turn]['row1'];
            row2 = moves[turn]['row2'];
        } else {
            row1 = 7 - moves[turn]['row1'];
            row2 = 7 - moves[turn]['row2'];
        }
    
        chessboard[row1][col1] = chessboard[row2][col2];
        chessboard[row1][col1].hasPieceMoved = moves[turn]['hasPieceMoved'];
        chessboard[row2][col2] = moves[turn]['square2'];
    
        let piece1 = document.getElementById(8 * row1 + col1);
        let piece2 = document.getElementById(8 * row2 + col2);
        piece1.textContent = piece2.textContent;
        piece2.textContent = moves[turn]['pieceCode'];
        // print_debug_chessboard(chessboard);
    } else {
        alert("Reached the earliest move");
    }

}

function fastForward() {
    console.log(`fastforward turn = ${turn}`);
    if (moves[turn] != null) {
        flipBoard()
        let col1 = moves[turn - 1]['col1'];
        let col2 = moves[turn - 1]['col2'];
        var row1, row2;
        if (colour === WHITE) {
            row1 = moves[turn - 1]['row1'];
            row2 = moves[turn - 1]['row2'];
        } else {
            row1 = 7 - moves[turn - 1]['row1'];
            row2 = 7 - moves[turn - 1]['row2'];
        }

        chessboard[row2][col2] = chessboard[row1][col1];
        chessboard[row2][col2].hasPieceMoved = YES;
        chessboard[row1][col1] = moves[turn - 1]['square1'];
    
        let piece1 = document.getElementById(8 * row1 + col1);
        let piece2 = document.getElementById(8 * row2 + col2);
        piece2.textContent = piece1.textContent; 
        piece1.textContent = null;
    } else {
        alert("Reached the latest move");
    }

}
