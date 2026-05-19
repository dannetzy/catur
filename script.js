const game = {
  pieces: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  },
  turn: '',
  /**
   * Get piece info from a square
   * @param {HTMLElement} square The square to get
   * @returns Object containing the piece's info
   */
  getPiece(square) {
    if (!(square instanceof HTMLElement)) {
      return {
        piece: '',
        color: ''
      };
    }
    return {
      piece: square.classList[0],
      color: square.classList[1]
    };
  },
  /**
   * Updates a square
   * @param {HTMLElement} square The square's element
   * @param {String} piece Piece class of the square's element, blank to empty out the square
   * @param {String} color Color class of the square's element, blank to empty out the square
   */
  updateSquare(square, piece, color) {
    // wipe classes
    for (const cls of [...square.classList]) { 
      square.classList.remove(cls);
    }
    if (!piece || !color) {
      square.textContent = '';
      return;
    }
    square.textContent = this.pieces[piece];
    square.classList.add(piece, color);
  },
  /**
   * Set a square as selected
   * @param {HTMLElement} square Square to select
   */
  setSelected(square) {
    square.classList.add('selected');
  },
  /**
   * Clears selected piece
   * @param {Boolean} unselect Truthy to only unselect the selected piece without removing
   */
  clearSelected(unselect) {
    const selected = document.querySelector('.selected');
    if (!selected) {
      return;
    }
    selected.classList.remove('selected');
    if (!unselect) {
      this.updateSquare(selected);
    }
  },
  updateTurn(color, initColor) {
    if (color === 'init' && initColor) {
      this.turn = initColor;
      turnTd.classList.add(initColor);
      turnText.textContent = initColor;
      return;
    }
    this.turn = color === 'white' ? 'black' : 'white';
    turnTd.classList.remove(color);
    turnTd.classList.add(this.turn);
    turnText.textContent = this.turn;
  },
  isTurn(color) {
    return color === this.turn;
  }
}

//initialize board
const board = document.querySelector('.board');
const pieceRow = document.querySelectorAll('.pieces');
const pawnRow = document.querySelectorAll('.pawns');

pieceRow.forEach((tr, i) => {
  const rowOfPieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  const colSquares = [...tr.children].splice(1); // remove th
  colSquares.forEach((td, j) => {
    game.updateSquare(td, rowOfPieces[j], i ? 'white' : 'black') // 0: first = black, 1: last = white
  });
});
pawnRow.forEach((tr, i) => {
  const colSquares = [...tr.children].splice(1);
  colSquares.forEach(td => {
    game.updateSquare(td, 'pawn', i ? 'white' : 'black');
  });
});

const turnTd = document.querySelector('.turn-td');
const turnText = document.querySelector('.turn-text');
const firstPlayer = 'black';

game.updateTurn('init', firstPlayer);

board.addEventListener('click', (ev) => {
  if (!ev.target.closest('td')) {
    return;
  }

  const square = ev.target;
  const selected = game.getPiece(document.querySelector('.selected'));
  const clicked = game.getPiece(square);

  if (selected.piece) {
    if (clicked.color === selected.color) { //same color taking prevention
      game.clearSelected(true);
      return;
    }
    if (game.isTurn(selected.color)) {
      game.updateSquare(square, selected.piece, selected.color);
      game.clearSelected();
      game.updateTurn(selected.color)
    } else {
      alert('not your turn');
      game.clearSelected(true);
      return;
    }
  } else if (clicked.piece) {
    game.setSelected(square);
  }
});