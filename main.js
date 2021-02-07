
let chessboard = [
    [2, 3, 4, 5, 6, 4, 3, 2],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 3, 4, 5, 6, 4, 3, 2]
];
console.log('Start Game');
console.log(chessboard);

// what I understand from this is if any of the squares is clicked, put an alert and return squares id
let chosenPieceId = null;

function whichTileWasClicked() {
    const squares = document.querySelectorAll('.black_square, .white_square');
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', movePiece);
    };
}

const movePiece = (e) => {
    const id = e.target.id;

    let row = Math.floor(chosenPieceId / 8) ;
    let col = chosenPieceId % 8;

    if (!chosenPieceId) {
        chosenPieceId = id;
    } else {
        let piece1 = document.getElementById(chosenPieceId);
        
        e.target.innerText = piece1.textContent;
        piece1.textContent = null;
        chosenPieceId = null;
    }
}

whichTileWasClicked();


// if (chosenPieceId && chosenSquareId) {
//     alert('Trying to move from', chosenPieceId, 'to', chosenSquareId);
// }


// tile = whichTileWasClicked();
// if (tile) {
//     console.log("alright");
//     alert(`The ${square.id} Square Was clicked`);
// }
