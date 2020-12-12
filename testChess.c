#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "chess.h"

int main(void) {
    initialiseBoard();
    print_debug_chessboard();

    char pos1[4], pos2[4];
    int row1, col1, row2, col2;
    while (scanf("%s %s", pos1, pos2) != EOF) {
        col1 = pos1[0] - 'a', row1 = atoi(&pos1[1]) - 1;
        col2 = pos2[0] - 'a', row2 = atoi(&pos2[1]) - 1;
        char colour[10] = "NONE";
        struct board* position1 = &chessboard[row1][col1];
        struct board* position2 = &chessboard[row2][col2];
        int colour1 = position1->colour;
        int i = 0;
        if (colour1 == WHITE) {
            i = 1;
            strcpy(colour, "White");
        } else if (colour1 == BLACK) {
            i = -1;
            strcpy(colour, "Black");
        }
        printf("%s %s to %s\n", colour, findPiece(position1->piece), pos2);
        // check if it's a valid move.
        if (isValidMove(row1, col1, row2, col2)) {
            if (position1->empassant.answer == YES) {                              // if the pawn can empassant
                int row = position1->empassant.withRow;
                int col = position1->empassant.withCol;
                if (row == row2 - i && col == col2) { // if it's a valid empassant
                    resetEmpassantStruct(row, col - 1);
                    resetEmpassantStruct(row, col + 1);
                    resetPosition(row1, col2);
                }

            // if it's a castle
            printf("abs(col2 - col1) = %d\n", col2 - col1);
            } else if (position1->piece == KING && abs(col2 - col1) == 2) {
                printf("Goes here");
                if (col2 < col1) {
                    chessboard[row1][col1 - 1] = chessboard[row1][0];
                    chessboard[row1][col1 - 1].hasPieceMoved = YES;
                    resetPosition(row1, 0);
                } else if (col2 > col1) {
                    chessboard[row1][col1 + 1] = chessboard[row1][SIZE - 1];
                    chessboard[row1][col1 + 1].hasPieceMoved = YES;
                    resetPosition(row1, SIZE - 1);
                }
            }
            memcpy(position2, position1, sizeof(struct board));
            position2->empassant.withRow = -1;
            position2->empassant.withCol = -1;
            position2->hasPieceMoved = YES;
            resetPosition(row1, col1);

        } else {
            printf("The attempted move is not allowed\n");

        }
        print_debug_chessboard();
    }
}


