// # Program which implements a chess game
// # Written by Ahmet Karatas
// # In 2020/2021
#include <stdio.h>
#include <stdlib.h>

// The size of the starting grid
#define SIZE 8
#define NIGHT 3.1
#define BISHOP 3.2
#define ROOK 5
#define PAWN 1
#define QUEEN 9
#define KING 3.5

// Board representation
typedef struct Board {
    int **positions;    // positions on the board
    int row;                
    int column;
} Board;

void initialiseBoard(int chessboard[SIZE][SIZE]);
void print_debug_chessboard(int chessboard[SIZE][SIZE]);


int main(void) {
    int chessboard[SIZE][SIZE];
    initialiseBoard(chessboard);
    print_debug_chessboard(chessboard);
}

// Initialise the entire board positions to zero's 
void initialiseBoard(int chessboard[SIZE][SIZE]) {
    for (int row = 0; row < SIZE; row++) {
        for (int col = 0; col < SIZE; col++) {
            chessboard[row][col] = 0;
        }
    }
}

void print_debug_chessboard(int chessboard[SIZE][SIZE]) {
    int row, col;
    printf("   A B C D E F G H\n");
    printf("   ---------------\n");
    for (row = 0; row < SIZE; row++) {
        for (col = 0; col < SIZE; col++) {
            if (col == 0) {
                printf("%d| ", row);
            }
            printf("%d ", chessboard[row][col]);
        }
        printf("\n");
    }
}