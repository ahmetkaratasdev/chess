// Going to represent a single game of Chess
export default class Game {
    constructor() {
        // What happens when you start a new game of chess?
        this.turn = "X";
        this.board = new Array(9).fill(null);        // an array of 9 elements

    }

    nextTurn() {
        // if the current turn is X then make it O,
        // if the current turn is O then make it X
        this.turn = this.turn === "X" ? "O" : "X"
    }

    makeMove(i) {
        if (!this.isInProgress()) {
            return;
        }

        if (this.board[i]) {
            return;
        }
        this.board[i] = this.turn;

        if (!this.findWinningComb()) {
            this.nextTurn();
        }
    
    }

    findWinningComb() {
        const winningComb = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8]
            [2, 4, 6]

        ];
        for (const comb of winningComb) {
            const [a, b, c] = comb;
            if (this.board[a] && (this.board[a] === this.board[b]) && (this.board[a] === this.board[c])) {
                return comb;
            }
        
        }
        return null;
    }

    isInProgress() {
        // if there is no winning combination, the game is currently in progress
        return !this.findWinningComb() && this.board.includes(null);
    }

    // if they want to make a move at index 6 twice,
    // we don't want it to override what's already there
}