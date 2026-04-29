const pieces = {
  rook: '♜',
  knight: '♞',
  bishop: '♝',
  queen: '♛',
  king: '♚',
  pawn: '♟',
};
const board = document.querySelector('.board');
let currentPiece = '';

//initialize board
const pieceRow = document.querySelectorAll('.pieces td');
const pawnRow = document.querySelectorAll('.pawns td');
const rowOfPieces = [pieces.rook, pieces.knight, pieces.bishop, pieces.queen, pieces.king, pieces.bishop, pieces.knight, pieces.rook];

pieceRow.forEach((td, i) => td.textContent = rowOfPieces[i >= rowOfPieces.length ? i-8 : i]);
pawnRow.forEach(td => td.textContent = pieces.pawn);

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
