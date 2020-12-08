// A .h file which contains all the prototypes for the functions in chess.c

// checks if the move from square1 to square2 is a valid move
// int isValidMove(int row1, int col1, int row2, int col2);

/* A pawn can do one of three things:
1. If it hasn't moved before, it can move either 1 or two squares forward depending on
whether an opposing piece is blocking the square or not
2. If the opponent moved a PAWN two pieces forward from the start such that it is
directly horizontal with the current user's PAWN, then the user's pawn can travel diagonally 
behind the opponent pawn, killing the pawn.
3. If an opposing piece is diagonally infront of the pawn by one square, then it may
kill the opposing piece and take its spot
// */
// int canPawnMove(int row1, int col1, int row2, int col2);

// int canRookMove(int row1, int col1, int row2, int col2);

// initialises the chess board
void initialiseBoard();

// Prints the chessboard for debugging
void print_debug_chessboard();

char* findPiece(int num);

bool canPawnMove(int row1, int col1, int row2, int col2);
bool isValidMove(int row1, int col1, int row2, int col2);
