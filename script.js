const pieces = {
  king: ['♚', '♔'],
  queen: ['♛', '♕'],
  rook: ['♜', '♖'],
  bishop: ['♝', '♗'],
  knight: ['♞', '♘'],
  pawn: ['♟', '♙'],
};
const board = document.querySelector('.board');
let currentPiece = '';

//initialize board
const pieceRow = document.querySelectorAll('.pieces');
const pawnRow = document.querySelectorAll('.pawns');

pieceRow.forEach((tr, i) => {
  const rowOfPieces = [pieces.rook[i], pieces.knight[i], pieces.bishop[i], pieces.queen[i], pieces.king[i], pieces.bishop[i], pieces.knight[i], pieces.rook[i]];
  const colSquares = [...tr.children].splice(1);
  colSquares.forEach((td, i) => td.textContent = rowOfPieces[i]);
});
pawnRow.forEach((tr, i) => {
  const colSquares = [...tr.children].splice(1);
  colSquares.forEach(td => td.textContent = pieces.pawn[i]);
});

/**
 * Checks a piece, duh.
 * @param {String} thePiece The piece to be checked
 * @returns 1 is black, 2 is white, undefined is unknown piece
 */
function checkPiece(thePiece) {
  for (const piece in pieces) {
    for (const [i, color] of pieces[piece].entries()) {
      if (thePiece === color) {
        return i+1;
      }
    }
  }
  return;
}

board.addEventListener('click', (ev) => {
  if (!ev.target.closest('td')) {
    return;
  }

  const square = ev.target;
  const current = document.querySelector('.current');

  if (current && square.classList.contains('current')) {
    currentPiece = '';
    current.classList.remove('current');
    return;
  }

  if (currentPiece !== '') {
    square.textContent = currentPiece;
    currentPiece = '';
    current.textContent = '';
    current.classList.remove('current');
  } else if (square.textContent !== '') {
    currentPiece = square.textContent;
    square.classList.add('current');
  }
});
