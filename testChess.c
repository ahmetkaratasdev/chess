#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "chess.h"

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


