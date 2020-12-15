// # Program which implements a chess game
// # Written by Ahmet Karatas
// # In 2020/2021
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "chess.h" 
// The reason we need this is because 
// we need to put the function declarations at the top. However
// it needs to 
// The size of the starting grid

bool isValidMove(int row1, int col1, int row2, int col2) {
    int piece = chessboard[row1][col1].piece;
    if (piece == NONE) {
        return false;
    } else if (piece == PAWN) {
        return canPawnMove(row1, col1, row2, col2);
    } else if (piece == ROOK) {
        return canRookMove(row1, col1, row2, col2);
    } else if (piece == KNIGHT) {
        return canKnightMove(row1, col1, row2, col2);
    } else if (piece == BISHOP) {
        return canBishopMove(row1, col1, row2, col2);
    } else if (piece == QUEEN) {
        return canRookMove(row1, col1, row2, col2) ||
        canBishopMove(row1, col1, row2, col2);
    } else if (piece == KING) {
        return canKingMove(row1, col1, row2, col2);
    }
    return false;
}

bool canPawnMove(int row1, int col1, int row2, int col2) {
    // if the pawn 
    struct board* position1 = &chessboard[row1][col1];
    struct board* position2 = &chessboard[row2][col2];
    int colour = position1->colour;
    int hasPieceMoved = position1->hasPieceMoved;
    int i = 0;
    if (colour == WHITE) i = 1;
    else if (colour == BLACK) i = -1;
    // if attempting to empassant
    if (position1->empassant.answer == YES) {                      // if it can empassant  
        if (position1->empassant.withRow == row2 && position1->empassant.withCol == col2) {
            return true;
        }
    // if dest is empty and it's the same column
    } else if (position2->piece == NONE && col1 == col2) { 
        if (abs(row2 - row1) == 1) {                                 // if the pawn wants to move up 1 position
            return true;
        } else if (abs(row2 - row1) == 2 && !hasPieceMoved) {       // if the pawn wnats to move up 2 positions
            if (chessboard[row1 + i][col1].piece == NONE) {         // if the square in front of it is empty
                canAdjacentPawnEmpassant(position1->colour, row2, col2);
                return true;
            }
        }
    } else if (position2->piece != NONE) {
        if (colour != position2->colour && row2 == row1 + i && col2 == col1 + i) {             // if it wants to kill an opponent
            return true;
        } else if (colour != position2->colour && row2 == row1 + i && col2 == col1 - i) {             // if it wants to kill an opponent
            return true;
        }
    }
    return false;
}
void canAdjacentPawnEmpassant(int colour, int row2, int col2) {
    struct board* positionL = &chessboard[row2][col2 - 1];
    struct board* positionR = &chessboard[row2][col2 + 1];
    // If the there's a pawn to the right of the destination
    // of opposite colour
    if (col2 < SIZE - 1) {                                                  
        if (positionR->piece == PAWN && positionR->colour != colour) {
            positionR->empassant.answer = YES;
            positionR->empassant.withRow = row2;
            positionR->empassant.withCol = col2;
        }
    }
    if (col2 > 0) {
        if (positionL->piece == PAWN && positionL->colour != colour) {
            positionL->empassant.answer = YES;
            positionL->empassant.withRow = row2;
            positionL->empassant.withCol = col2;
        }
    }
}
bool canRookMove(int row1, int col1, int row2, int col2) {
    int row, col;
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

bool canBishopMove(int row1, int col1, int row2, int col2) {
    int colour1 = chessboard[row1][col1].colour;
    int colour2 = chessboard[row2][col2].colour;
    if (colour1 != colour2) {
        // top left
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
        }
        if (row1 == row2 && col1 == col2) {
            return true;
        }
    }
    return false;
}

bool canKnightMove(int row1, int col1, int row2, int col2) {
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

bool canKingMove(int row1, int col1, int row2, int col2) {
    int colour1 = chessboard[row1][col1].colour;
    int colour2 = chessboard[row2][col2].colour;
    if ((abs(col2 - col1) <= 1) && (abs(row2 - row1) <= 1)) {
        if (row1 == row2 && col1 == col2) {
            return false;
        } else if (colour1 != colour2) {
            return true;
        }
    // if king attempts to castle
    } else if (row1 == row2 && abs(col2 - col1) == 2) {
        struct board* position1 = &chessboard[row1][col1];
        if (col2 < col1) {
            for (int col = col1 - 1; col > col2; col--) {
                if (chessboard[row1][col].piece != NONE) {
                    return false;
                }
            }
            struct board* position2 = &chessboard[row1][0];
            if (!position1->hasPieceMoved && !position2->hasPieceMoved) {
                return true;
            }
        } else if (col2 > col1) {
            for (int col = col1 + 1; col < col2; col++) {
                if (chessboard[row1][col].piece != NONE) {
                    return false;
                }
            }
            struct board* position2 = &chessboard[row1][SIZE - 1];
            if (!position1->hasPieceMoved && !position2->hasPieceMoved) {
                return true;
            }
        }
    }
    return false;
}

bool isKingChecked(int colour) {
    for (int row = 0; row < SIZE; row++) {
        for (int col = 0; col < SIZE; col++) {
            if (colour == WHITE) {
                if (isValidMove(row, col, blackKing.row, blackKing.col)) {
                    return true;
                }
            
            } else if (colour == BLACK) {
                if (isValidMove(row, col, whiteKing.row, whiteKing.col)) {
                    return true;
                    
                }
            }
        }
    }
    return false;
}

// Initialise the entire board positions to EMPTY's and the rest of the struct
void initialiseBoard() {
    for (int row = 0; row < SIZE; row++) {
        for (int col = 0; col < SIZE; col++) {
            struct board* position = &chessboard[row][col];
            if (row == 0 || row == SIZE - 1) {
                if (col <= 4) position->piece = col + 2;
                else if (col > 4) position->piece = SIZE - col + 1;
                
                if (row == 0) position->colour = WHITE;
                else if (row == SIZE - 1) position->colour = BLACK;
            } else if (row == 1 || row == SIZE - 2) {
                position->piece = 1;
                if (row == 1) position->colour = WHITE;
                else if (row == SIZE - 2) position->colour = BLACK;
            } else {
                position->piece = 0;
                position->colour = EMPTY;
            }
            position->hasPieceMoved = NO;
            position->empassant.answer = NO;
            position->empassant.withRow = -1;
            position->empassant.withCol = -1;
        }
    }
    whiteKing.row = 0;
    whiteKing.col = 4;
    blackKing.row = SIZE - 1;
    blackKing.col = 4;
}
// reset the memory at a specific square
void resetPosition(int row, int col) {
    chessboard[row][col].piece = NONE;
    chessboard[row][col].colour = EMPTY;
    resetEmpassantStruct(row, col);
    chessboard[row][col].hasPieceMoved = NO;
}

void resetEmpassantStruct(int row, int col) {
    chessboard[row][col].empassant.answer = NO;
    chessboard[row][col].empassant.withRow = -1;
    chessboard[row][col].empassant.withCol = -1;
}

// prints chessboard for debug
void print_debug_chessboard(struct board curr_board[SIZE][SIZE]) {
    int row, col;
    printf("    A    B    C    D    E    F    G    H\n");
    printf("   ---------------------------------------\n");
    for (row = 0; row < SIZE; row++) {
        for (col = 0; col < SIZE; col++) {
            if (col == 0) {
                printf("%d| ", row + 1);
            }
            printf("%d->%d ", curr_board[row][col].colour, curr_board[row][col].piece);
        }
        printf("\n");
    }
}

char* findPiece(int num) {
    if (num == 0) {
        return "none";
    } else if (num == 1) {
        return "pawn";
    } else if (num == 2) {
        return "rook";
    } else if (num == 3) {
        return "knight";
    } else if (num == 4) {
        return "bishop";
    } else if (num == 5) {
        return "queen";
    } else if (num == 6) {
        return "king";
    }
    return "none";
}
