// # Program which implements a chess game
// # Written by Ahmet Karatas
// # In 2020/2021
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "chess.h" // The reason we need this is because 
// we need to put the function declarations at the top. However
// it needs to 
// The size of the starting grid

bool isValidMove(int row1, int col1, int row2, int col2) {
    int piece = chessboard[row1][col1].piece;
    if (piece == PAWN) {
        return canPawnMove(row1, col1, row2, col2);
    }
    return false;
    // } else if (piece == ROOK) {
    //     return canRookMove();
    // } else if (piece == 3) {
    //     return canKnightMove();
    // } else if (piece == 4) {
    //     return canBishopMove();
    // } else if (piece == 5) {
    //     return canQueenMove();
    // } else if (piece == 6) {
    //     return canKingMove();
    // } else {
    //     return 0;
    // }
}

bool canPawnMove(int row1, int col1, int row2, int col2) {
    // if the pawn 
    struct board position1 = chessboard[row1][col1];
    struct board position2 = chessboard[row2][col2];
    int colour = position1.colour;
    int hasPieceMoved = position1.hasPieceMoved;
    int i = 0;
    if (colour == WHITE) i = 1;
    else if (colour == BLACK) i = -1;

    // if attempting to empassant
    // struct canEmpassant empassant = chessboard[row1][col1].empassant;
    if (position1.empassant.answer == YES) {                      // if it can empassant  
        return true;
    // if dest is empty and it's the same column
    } else if (position2.piece == NONE && col1 == col2) { 
        if (abs(row2 - row1) == 1) {                                 // if the pawn wants to move up 1 position
            return true;
        } else if (abs(row2 - row1) == 2 && !hasPieceMoved) {       // if the pawn wnats to move up 2 positions
            if (chessboard[row1 + i][col1].piece == NONE) {         // if the square in front of it is empty
                canAdjacentPawnEmpassant(position1.colour, row2, col2);
                return true;
            }
        }
        return false;
    } else if (row2 == row1 + i && col2 == col1 + i) {             // if it wants to kill an opponent
        return true;
    } else if (row2 == row1 + i && col2 == col1 - i) {             // if it wants to kill an opponent
        return true;
    } else {
        return false;
    }
    return false;
}
void canAdjacentPawnEmpassant(int colour, int row2, int col2) {
    struct board position1 = chessboard[row2][col2 + 1];
    struct board position2 = chessboard[row2][col2 - 1];
    if (col2 < SIZE - 1) {
        if (position1.piece == PAWN && position1.colour != colour) {
            position1.empassant.answer = YES;
            position1.empassant.empassantWithRow = row2;
            position1.empassant.empassantWithCol = col2;
        }
    }

    if (col2 > 0) {
        if (position2.piece == PAWN && position2.colour != colour) {
            position2.empassant.answer = YES;
            position2.empassant.empassantWithRow = row2;
            position2.empassant.empassantWithCol = col2;
        }
    }

}
// bool canRookMove(int row1, int col1, int row2, int col2) {
//     // if the rook wants to travel vertically
//     int row, col;
//     if (col1 == col2) {     // if vertical
//         if (row2 > row1) {
//             for (row = row1; row < row2; row++) {
//                 if (chessboard[row][col1].piece != NONE) {                        // if any of the positions before destination 
//                     return false;                                           // is not empty, then return false
//                 }       
//             }
//             return true;
//         } else if (row2 < row1) {
//             for (row = row2; row > row1; row--) {
//                 if (chessboard[row][col1].piece != NONE) {                        // if any of the positions before destination 
//                     return false;                                           // is not empty, then return false
//                 }       
//             }
//             return true;
//         }
//     } else if (row1 == row2) {  // if horizontal
//         if (col2 > col1) {
//             for (col = col1; col < col2; col++) {
//                 if (chessboard[row1][col].piece != NONE) {
//                     return false;
//                 }
//             }
//             return true;
//         } else if (col2 < col1) {
//             for (col = col1; col > col2; col++) {
//                 if (chessboard[row1][col].piece != NONE) {
//                     return false;
//                 }
//             }
//             return true;
//         }
//     } else if (chessboard[row2][col2].piece == KING && !chessboard[row2][col2].KingHasMoved) {
//         if (col2 > col1) {
//             for (col = col1 + 1; col < col2; col++) {
//                 if (chessboard[row1][col].piece != 0) {
//                     return false;
//                 }
//             }
//             return true;
//         } else if (col2 < col1) {
//             for (col = col1 - 1; col > col2; col--) {
//                 if (chessboard[row1][col].piece != 0) {
//                     return false;
//                 }
//             }
//             return true;
//         } else {
//             return false;
//         }
//     }
//     return true;
// }
// Initialise the entire board positions to zero's and the rest of the struct
void initialiseBoard() {
    // printf("Position: %d\n", chessboard[0][0].piece);
    // int matrix[SIZE][SIZE] = {
    //     {2,3,4,5,6,4,3,2},
    //     {1,1,1,1,1,1,1,1},
    //     {0,0,0,0,0,0,0,0},
    //     {0,0,0,0,0,0,0,0},
    //     {0,0,0,0,0,0,0,0},
    //     {0,0,0,0,0,0,0,0},
    //     {1,1,1,1,1,1,1,1},
    //     {2,3,4,5,6,4,3,2}
    // };
    for (int row = 0; row < SIZE; row++) {
        for (int col = 0; col < SIZE; col++) {
            struct board* position = &chessboard[row][col];
            if (row == 0 || row == SIZE - 1) {
                if (col <= 4) position->piece = col + 2;
                else if (col > 4) position->piece = SIZE - col + 1;
                
                if (row == 0) position->piece = WHITE;
                else if (row == SIZE - 1) position->piece = BLACK;
            } else if (row == 1 || row == SIZE - 2) {
                position->piece = 1;
                if (row == 1) position->colour = WHITE;
                else if (row == SIZE - 2) position->colour = BLACK;
            } else {
                position->piece = 0;
                position->colour = ZERO;
            }
            printf("%d ", position->piece);
            position->hasPieceMoved = NO;
            position->empassant.answer = NO;
            position->empassant.empassantWithRow = -1;
            position->empassant.empassantWithCol = -1;
        }
        printf("\n");
    }
}
// reset the memory at a specific square
void resetPosition(int row, int col) {
    chessboard[row][col].piece = NONE;
    chessboard[row][col].colour = ZERO;
    chessboard[row][col].empassant.answer = NO;
    chessboard[row][col].empassant.empassantWithRow = -1;
    chessboard[row][col].empassant.empassantWithCol = -1;
    chessboard[row][col].hasPieceMoved = NO;
}


// prints chessboard for debug
void print_debug_chessboard() {
    int row, col;
    printf("    A    B    C    D    E    F    G    H\n");
    printf("   ---------------------------------------\n");
    for (row = 0; row < SIZE; row++) {
        for (col = 0; col < SIZE; col++) {
            if (col == 0) {
                printf("%d| ", row + 1);
            }
            printf("%d->%d ", chessboard[row][col].colour, chessboard[row][col].piece);
        }
        printf("\n");
    }
}
// void diagonal(int row, int col) {
//     int i, topRight = 0, topLeft = 0, bottomRight = 0, bottomLeft = 0;
//     // top left
//     printf("Row, col: %d %d\n", row, col);
//     for (i = 1; row - i >= 0 && col - i >= 0; i++) {
//         if (chessboard[row - i][col - i].piece != 0) {
//             printf("Row, col: %d %d\n", row - i, col - i);        
//             topLeft = 1;
//            printf("topLeft: %d\n", topLeft);
//            break;
//         }
//     }
//     // top right
//     for (i = 1; row - i >= 0 && col + i >= 0; i++) {
//         if (chessboard[row - i][col + i].piece != 0) {
//             // bottom right diagonal can attack a piece
//             topRight = 1;
//             printf("topRight: %d\n", topRight);
//             break;

//         }
//     }
//     // bottom left
//     for (i = 1; row + i >= 0 && col - i >= 0; i++) {
//         if (chessboard[row + i][col - i].piece != 0) { 
//             // bottom right diagonal can attack a piece
//             bottomLeft = 1;
//             printf("bottomLeft: %d\n", bottomLeft);
//             break;

//         }
//     }
//     // bottom right
//     for (i = 1; row + i >= 0 && col + i >= 0; i++) {
//         if (chessboard[row + i][col + i].piece != 0) {
//             // bottom right diagonal can attack a piece
//             bottomRight = 1;
//             printf("bottomRight: %d\n", bottomRight);
//             break;
//         }
//     }

// }

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
