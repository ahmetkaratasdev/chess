#ifndef CHESS_H
#define CHESS_H
// A .h file which contains all the prototypes for the functions in chess.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>


#define SIZE 8
#define NO 0
#define YES 1

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
    EMPTY = 0,
    WHITE = 1,
    BLACK = 2,
};

struct canEmpassant {
    int answer;
    int withRow;
    int withCol;
};

struct board {
    enum chessPiece piece;
    enum colour colour;
    int hasPieceMoved;
    struct canEmpassant empassant;
};

struct blackKingPos {
    int row;
    int col;
};

struct whiteKingPos {
    int row;
    int col;
};

// declare the chessboard
struct board chessboard[SIZE][SIZE];
struct whiteKingPos whiteKing;
struct blackKingPos blackKing;

/**
 * initialises the chess board 
**/ 
void initialiseBoard();

/**
 * Prints the chessboard for debugging
**/ 
void print_debug_chessboard(struct board curr_board[SIZE][SIZE]);
/**
 * Finds the piece which corresponds to the value on the square
**/ 
char* findPiece(int num);

void resetPosition(int row, int col);

/**
 * Checks if pawn can move to destination 2.
 * 1. If it hasn't moved before, it can move either 1 or two squares forward depending on
 * whether an opposing piece is blocking the square or not
 * 2. If the opponent moved a PAWN two pieces forward from the start such that it is
 * directly horizontal with the current user's PAWN, then the user's pawn can travel diagonally 
 * behind the opponent pawn, killing the pawn.
 * 3. If an opposing piece is diagonally infront of the pawn by one square, then it may
 * kill the opposing piece and take its spot
**/ 
bool canPawnMove(int row1, int col1, int row2, int col2);
void canAdjacentPawnEmpassant(int colour, int row2, int col2);
void resetEmpassantStruct(int row, int col);

/**
 * checks if the rook can move to row2, col2.
 * 1. Rook can move vertically or horizontally.
 * 2. Rook can castle with King
**/ 
bool canRookMove(int row1, int col1, int row2, int col2);

/**
 * checks if the bishop can move to row2, col2.
 * 1. Bishop can move diagonally
**/ 
bool canBishopMove(int row1, int col1, int row2, int col2);

/**
 * checks if the night can move to row2, col2.
 * 1. Bishop can in an L shape
**/ 
bool canKnightMove(int row1, int col1, int row2, int col2);

// bool canQueenMove(int row1, int col1, int row2, int col2);

bool canKingMove(int row1, int col1, int row2, int col2);

/**
 * Goes through every piece on the board to check if any of the pieces can
 * attack the opposing King with the current board setout
**/ 
int kingIsChecked(int colour);

/**
 * checks if the move is valid 
**/ 
bool isValidMove(int row1, int col1, int row2, int col2);

#endif