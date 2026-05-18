const pieces = {
  king: '♚',
  queen: '♛',
  rook: '♜',
  bishop: '♝',
  knight: '♞',
  pawn: '♟'
};
const board = document.querySelector('.board');
var current = {
  piece: '',
  color: ''
};

//initialize board
const pieceRow = document.querySelectorAll('.pieces');
const pawnRow = document.querySelectorAll('.pawns');

pieceRow.forEach((tr, i) => {
  const rowOfPieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
  const colSquares = [...tr.children].splice(1); // remove th
  colSquares.forEach((td, j) => {
    td.textContent = pieces[rowOfPieces[j]];
    td.classList.add(rowOfPieces[j]);
    td.classList.add(i ? 'white' : 'black'); // first tr.pieces ? 'white' : 'black'
  });
  tr.classList.remove(i ? 'white' : 'black');
});
pawnRow.forEach((tr, i) => {
  const colSquares = [...tr.children].splice(1);
  colSquares.forEach(td => {
    td.textContent = pieces.pawn;
    td.classList.add('pawn', i ? 'white' : 'black');
  });
  tr.classList.remove(i ? 'white' : 'black');
});

// /**
//  * Checks whether a piece is included in `pieces` variable
//  * @param {String} thePiece The piece to be checked
//  * @returns 1 is black, 2 is white, undefined is unknown piece
//  */
// function checkPiece(thePiece) {
//   for (const piece in pieces) {
//     for (const [i, color] of pieces[piece].entries()) {
//       if (thePiece === color) {
//         return i+1;
//       }
//     }
//   }
//   return;
// }
/**
 * Get piece info from a square
 * @param {HTMLElement} square The square to get
 * @returns Object containing the piece's info, undefined for blank
 */
function getPiece(square) {
  return {
    piece: square.classList[0],
    color: square.classList[1]
  };
}
/**
 * Update current piece
 * @param {String} piece Piece
 * @param {String} color Color
 */
function updateCurrent(piece, color) {
  current.piece = piece;
  current.color = color;
}
/**
 * 
 * @param {HTMLElement} square The square's element
 * @param {String} piece Piece class of the square's element, blank to empty out the element
 * @param {*} color Piece class of the square's element, blank to empty out the element
 */
function updateSquare(square, piece, color) {
  if (!piece || !color) {
    square.textContent = '';
    for (const cls of [...square.classList]) { 
      square.classList.remove(cls);
    }
    return;
  }
  square.textContent = pieces[piece];
  square.classList.add(piece, color);
}

board.addEventListener('click', (ev) => {
  if (!ev.target.closest('td')) {
    return;
  }

  const square = ev.target;
  const selected = document.querySelector('.selected');
  const clicked = getPiece(square);

  if (selected && square.classList.contains('selected')) {
    updateCurrent('', '');
    selected.classList.remove('selected');
    return;
  }

  if (current.color) {
    if (clicked.color && clicked.color === current.color) {
      updateCurrent('', '');
      selected.classList.remove('selected');
      return;
    }
    updateSquare(square, current.piece, current.color);
    updateCurrent('', '');
    updateSquare(selected)
  } else if (clicked.color) {
    updateCurrent(clicked.piece, clicked.color);
    square.classList.add('selected');
  }
});
