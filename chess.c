// # Program which implements a chess game
// # Written by Ahmet Karatas
// # In 2020/2021
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "chess.h"
// The size of the starting grid
#define SIZE 8
#define NO 0
#define YES 1
// #define WHITE 1
// #define BLACK 2
// #define NIGHT 3.1
// #define BISHOP 3.2
// #define ROOK 5
// #define PAWN 1
// #define QUEEN 9
// #define KING 3.5

enum chessPiece {
    NONE = 0,
    PAWN,
    ROOK,
    KNIGHT,
    BISHOP,
    QUEEN,
    KING,
};

enum colour {
    ZERO = 0,
    WHITE = 1,
    BLACK = 2,
};


struct board {
    enum chessPiece piece;
    enum colour colour;
    int hasPieceMoved;
    int canEmpassant;
};

struct board chessboard[SIZE][SIZE];

// void initialiseBoard();
// void print_debug_chessboard();
// void diagonal(int row, int col);
// char* findPiece(int num);


int main(void) {
    // int chessboard[SIZE][SIZE];
    // struct board chessboard[SIZE][SIZE];
    initialiseBoard();
    print_debug_chessboard();

    char pos1[4], pos2[4];
    int row1, col1, row2, col2;
    while (1) {
        scanf("%s %s", pos1, pos2);
        col1 = pos1[0] - 'a', row1 = atoi(&pos1[1]) - 1;
        col2 = pos2[0] - 'a', row2 = atoi(&pos2[1]) - 1;
        char colour[10] = "NONE";
        if (chessboard[row1][col1].colour == WHITE) strcpy(colour, "White");
        else if (chessboard[row1][col1].colour == BLACK) strcpy(colour, "Black");
        printf("%s %s to %s\n", colour, findPiece(chessboard[row1][col1].piece), pos2);
        // check if it's a valid move.
        if (isValidMove(row1, col1, row2, col2)) {
            if (chessboard[row1][col1].canEmpassant) {
                int i = 0;
                if (chessboard[row1][col1].colour == WHITE) i = 1;
                else if (chessboard[row1][col1].colour == BLACK) i = -1;
                chessboard[row2 - i][col2].piece = NONE;
                chessboard[row2 - i][col2].colour = ZERO;
                chessboard[row2 - i][col2].canEmpassant = NO;
                chessboard[row2 - i][col2].hasPieceMoved = NO;
            }
            chessboard[row2][col2] = chessboard[row1][col1];
            chessboard[row2][col2].hasPieceMoved = YES;
            chessboard[row1][col1].piece = NONE;
            chessboard[row1][col1].colour = ZERO;
            chessboard[row1][col1].hasPieceMoved = NO;


        } else {
            printf("The attempted move is not allowed\n");

        }
        print_debug_chessboard();

    }

    
    
    // printf("%d %d\n", row1, row1);
    // int bishopFound = 0;
    // for (int row = 0; row < SIZE && !bishopFound; row++) {
    //     for (int col = 0; col < SIZE && !bishopFound; col++) {
    //         if (chessboard[row][col].piece == BISHOP) {
    //             diagonal(row, col);
    //             bishopFound = 1;
    //         }
    //     }
    // }
    
}
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
/* A pawn can do one of three things:
1. If it hasn't moved before, it can move either 1 or two squares forward depending on
whether an opposing piece is blocking the square or not
1. If 1he opponent moved a PAWN two pieces forward from the start such that it is
1irect1y horizontal with the current user's PAWN, then the user's pawn can travel diagonally 
behind the opponent pawn, killing the pawn.
3. If an opposing piece is diagonally infront of the pawn by one square, then it may
kill the opposing piece and take its spot
*/
bool canPawnMove(int row1, int col1, int row2, int col2) {
    // if the pawn 
    int colour = chessboard[row1][col1].colour;
    int hasPieceMoved = chessboard[row1][col1].hasPieceMoved;
    int i = 0;
    
    if (colour == WHITE) i = 1;
    else if (colour == BLACK) i = -1;

    // if dest is empty and it's the same column
    if (chessboard[row1][col1].canEmpassant) {                      // if it can empassant
        return true;
    } else if (chessboard[row2][col2].piece == NONE && col1 == col2) { 
        if (abs(row2 - row1) == 1) {                                 // if the pawn wants to move up 1 position
            chessboard[row1][col1].canEmpassant = NO;
            return true;
        } else if (abs(row2 - row1) == 2 && !hasPieceMoved) {       // if the pawn wnats to move up 2 positions
            if (chessboard[row1 + i][col1].piece == NONE) {
                // check if it's adjacent squares are pawns which can empassant
                // if the piece to its right is a pawn of the opposite colour
                if (colour == WHITE) {
                    if (col2 < SIZE - 1 && chessboard[row2][col2 + 1].colour == BLACK) {
                        chessboard[row2][col2 + 1].canEmpassant = YES;
                    } else if (col2 > 0 && chessboard[row2][col2 - 1].colour == BLACK) {
                        chessboard[row2][col2 - 1].canEmpassant = YES;
                    }
                } else if (colour == BLACK) {
                    if (col2 < SIZE - 1 && chessboard[row2][col2 + 1].colour == WHITE) {
                        chessboard[row2][col2 + 1].canEmpassant = YES;
                    } else if (col2 > 0 && chessboard[row2][col2 - 1].colour == WHITE) {
                        chessboard[row2][col2 - 1].canEmpassant = YES;
                    }
                }
                // if the piece to its left is a pawn of the opposite colour
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
// Initialise the entire board positions to zero's 
void initialiseBoard() {
    printf("Position: %d\n", chessboard[0][0].piece);
    int matrix[SIZE][SIZE] = {
        {2,3,4,5,6,4,3,2},
        {1,1,1,1,1,1,1,1},
        {0,0,0,0,0,0,0,0},
        {0,0,0,0,0,0,0,0},
        {0,0,0,0,0,0,0,0},
        {0,0,0,0,0,0,0,0},
        {1,1,1,1,1,1,1,1},
        {2,3,4,5,6,4,3,2}
    };
    
    for (int row = 0; row < SIZE; row++) {
        for (int col = 0; col < SIZE; col++) {
            chessboard[row][col].piece = matrix[row][col];
            if (row == 0 || row == 1) {
                chessboard[row][col].colour = WHITE;
            } else if (row == SIZE - 2 || row == SIZE - 1) {
                chessboard[row][col].colour = BLACK;
            } else {
                chessboard[row][col].colour = ZERO;
            }
            chessboard[row][col].hasPieceMoved = NO;
            chessboard[row][col].canEmpassant = NO;
        }
    }
    // memcpy(chessboard, initial_board, SIZE * SIZE * sizeof(struct board));
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

// int checkmate() {

// }

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
