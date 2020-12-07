// # Program which implements a chess game
// # Written by Ahmet Karatas
// # In 2020/2021
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
// The size of the starting grid
#define SIZE 8
#define BLACK 1
#define WHITE 2
// #define NIGHT 3.1
// #define BISHOP 3.2
// #define ROOK 5
// #define PAWN 1
// #define QUEEN 9
// #define KING 3.5

enum type {
    NONE = 0,
    PAWN,
    ROOK,
    KNIGHT,
    BISHOP,
    QUEEN,
    KING,
};

struct board {
    int piece;
    int colour;
};
struct board chessboard[SIZE][SIZE];

void initialiseBoard(struct board[SIZE][SIZE]);
void print_debug_chessboard(struct board[SIZE][SIZE]);

int main(void) {
    // int chessboard[SIZE][SIZE];
    // struct board chessboard[SIZE][SIZE];
    initialiseBoard(chessboard);
    print_debug_chessboard(chessboard);
    printf("Bishop: %d\n", BISHOP);
    // while (!checkmate(chessboard)) {

    // }
}

// Initialise the entire board positions to zero's 
void initialiseBoard(struct board[SIZE][SIZE]) {
    static int initial_board[SIZE][SIZE] = {
        {2,3,4,5,6,4,3,2},
        {1,1,1,1,1,1,1,1},
        {0,0,0,0,0,0,0,0},
        {0,0,0,0,0,0,0,0},
        {0,0,0,0,0,0,0,0},
        {0,0,0,0,0,0,0,0},
        {1,1,1,1,1,1,1,1},
        {2,3,4,5,6,4,3,2}
    };
    memcpy(chessboard, initial_board, SIZE * SIZE * sizeof(int));
}

// prints chessboard for debug
void print_debug_chessboard(struct board[SIZE][SIZE]) {
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