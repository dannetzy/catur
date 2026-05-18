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
    updateSquare(td, rowOfPieces[j], i ? 'white' : 'black') // 0: first = black, 1: last = white
  });
  tr.classList.remove(i ? 'white' : 'black');
});
pawnRow.forEach((tr, i) => {
  const colSquares = [...tr.children].splice(1);
  colSquares.forEach(td => {
    updateSquare(td, 'pawn', i ? 'white' : 'black');
  });
  tr.classList.remove(i ? 'white' : 'black');
});

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
 * Updates current piece global variable. Pass nothing or falsy values to empty it.
 * @param {String} piece Piece
 * @param {String} color Color
 */
function updateCurrent(piece, color) {
  if (!piece || !color) {
    current.piece = '';
    current.color = '';
  }
  current.piece = piece;
  current.color = color;
}
/**
 * Updates a square
 * @param {HTMLElement} square The square's element
 * @param {String} piece Piece class of the square's element, blank to empty out the element
 * @param {String} color Piece class of the square's element, blank to empty out the element
 */
function updateSquare(square, piece, color) {
  // wipe classes regardless
  for (const cls of [...square.classList]) { 
    square.classList.remove(cls);
  }
  if (!piece || !color) {
    square.textContent = '';
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

  if (selected === square) {
    updateCurrent();
    selected.classList.remove('selected');
    return;
  }

  if (current.color) {
    if (clicked.color && clicked.color === current.color) {
      updateCurrent();
      selected.classList.remove('selected');
      return;
    }
    updateSquare(square, current.piece, current.color);
    updateCurrent();
    updateSquare(selected);
  } else if (clicked.color) {
    updateCurrent(clicked.piece, clicked.color);
    square.classList.add('selected');
  }
});
