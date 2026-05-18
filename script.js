const pieces = {
  king: '♚',
  queen: '♛',
  rook: '♜',
  bishop: '♝',
  knight: '♞',
  pawn: '♟'
};
const board = document.querySelector('.board');

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
  if (!(square instanceof HTMLElement)) {
    return {
      piece: '',
      color: ''
    }
  }
  return {
    piece: square.classList[0],
    color: square.classList[1]
  };
}
/**
 * Updates a square
 * @param {HTMLElement} square The square's element
 * @param {String} piece Piece class of the square's element, blank to empty out the square
 * @param {String} color Color class of the square's element, blank to empty out the square
 */
function updateSquare(square, piece, color) {
  // wipe classes
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
/**
 * Set a square as selected
 * @param {HTMLElement} square Square to select
 */
function setSelected(square) {
  square.classList.add('selected');
}
/**
 * Clears selected piece
 * @param {Boolean} unselect Truthy to only unselect the selected piece without removing
 */
function clearSelected(unselect) {
  const selected = document.querySelector('.selected');
  if (!selected) {
    return;
  }
  selected.classList.remove('selected');
  if (!unselect) {
    updateSquare(selected);
  }
}

board.addEventListener('click', (ev) => {
  if (!ev.target.closest('td')) {
    return;
  }

  const square = ev.target;
  const selected = getPiece(document.querySelector('.selected'));
  const clicked = getPiece(square);

  if (selected === square) {
    clearSelected(true);
    return;
  }

  if (selected.piece) {
    if (clicked.color === selected.color) { //eat same color prevention
      clearSelected(true);
      return;
    }
    updateSquare(square, selected.piece, selected.color);
    clearSelected();
  } else if (clicked.piece) {
    setSelected(square);
  }
});
