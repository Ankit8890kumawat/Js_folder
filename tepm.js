const canvas = document.getElementById("chessBoard");
const ctx = canvas.getContext("2d");

const boardSize = 8;
const tileSize = canvas.width / boardSize;

const lightColor = '#f0d9b5';
const darkColor = '#b58863';
const highlightColor = 'rgba(186, 202, 68, 0.7)';

const pieceImages = {
  wP: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
  wR: "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
  wN: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
  wB: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
  wQ: "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
  wK: "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",

  bP: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",
  bR: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
  bN: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
  bB: "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
  bQ: "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",
  bK: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"
};

let loadedImagesCount = 0;
const images = {};








for (const key in pieceImages) {
  images[key] = new Image();
  images[key].src = pieceImages[key];
  images[key].onload = () => {
    loadedImagesCount++;
    if (loadedImagesCount === Object.keys(pieceImages).length) {
      init();
    }
  };
}


let board = [
  ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
];



let selectedPiece = null;
let validMoves = [];
let turn = 'white';

function drawBoard() {
  for(let row=0; row<boardSize; row++) {
    for(let col=0; col<boardSize; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      const isLight = (row + col) % 2 === 0;
      ctx.fillStyle = isLight ? lightColor : darkColor;
      ctx.fillRect(x, y, tileSize, tileSize);

      if(selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {

     
        ctx.fillStyle = highlightColor;
        ctx.fillRect(x, y, tileSize, tileSize);
      }

      for(const move of validMoves) {
        if(move[0] === row && move[1] === col) {
          ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
          ctx.beginPath();
          ctx.arc(x + tileSize/2, y + tileSize/2, tileSize/4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
}

function drawPieces() {
  for(let row=0; row<boardSize; row++) {
    for(let col=0; col<boardSize; col++) {
      const pieceCode = board[row][col];
      if(pieceCode) {
        ctx.drawImage(images[pieceCode], col*tileSize, row*tileSize, tileSize, tileSize);
      }
    }
  }
}

function onBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function pieceColor(row, col) {
  const piece = board[row][col];
  if(!piece) return null;
  return piece[0] === 'w' ? 'white' : 'black';
}

function getValidMoves(row, col) {
  const piece = board[row][col];
  if(!piece) return [];

  const color = piece[0] === 'w' ? 'white' : 'black';
  const type = piece[1];

  let moves = [];
  const directions = {
    R: [[1,0], [-1,0], [0,1], [0,-1]],
    B: [[1,1], [1,-1], [-1,1], [-1,-1]],
    Q: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    K: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]]
  };

  function addMove(r, c) {
    if(onBoard(r,c)) {
      if(!board[r][c] || pieceColor(r,c) !== color) {
        moves.push([r,c]);
      }
    }
  }

  if(type === 'P') {
    const dir = color === 'white' ? -1 : 1;
    const startRow = color === 'white' ? 6 : 1;

    if(onBoard(row+dir, col) && !board[row+dir][col]) {
      moves.push([row+dir, col]);
      if(row === startRow && !board[row+2*dir][col]) {
        moves.push([row+2*dir, col]);
      }
    }
    for(let dc of [-1,1]) {
      const r = row + dir;
      const c = col + dc;
      if(onBoard(r,c) && board[r][c] && pieceColor(r,c) !== color) {
        moves.push([r,c]);
      }
    }
  }
  else if(['R','B','Q'].includes(type)) {
    const dirs = directions[type];
    for(const [dr, dc] of dirs) {
      let r = row + dr;
      let c = col + dc;
      while(onBoard(r,c)) {
        if(!board[r][c]) {
          moves.push([r,c]);
        } else {
          if(pieceColor(r,c) !== color) moves.push([r,c]);
          break;
        }
        r += dr;
        c += dc;
      }
    }
  }
  else if(type === 'N') {
    const knightMoves = [
      [row+2, col+1], [row+2, col-1], [row-2, col+1], [row-2, col-1],
      [row+1, col+2], [row+1, col-2], [row-1, col+2], [row-1, col-2]
    ];
    for(const [r,c] of knightMoves) {
      if(onBoard(r,c)) {
        if(!board[r][c] || pieceColor(r,c) !== color) {
          moves.push([r,c]);
        }
      }
    }
  }
  else if(type === 'K') {
    const kingMoves = directions.K;
    for(const [dr, dc] of kingMoves) {
      const r = row + dr;
      const c = col + dc;
      if(onBoard(r,c)) {
        if(!board[r][c] || pieceColor(r,c) !== color) {
          moves.push([r,c]);
        }
      }
    }
  }
  return moves;
}

function getSquareFromCoords(x, y) {
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);
  if(row < 0 || row >= boardSize || col < 0 || col >= boardSize) return null;
  return {row, col};
}

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

console.log("this is a rect ="+rect);
console.log("this is a Rect left="+rect.left);
console.log("this is a rect top="+rect.top);
  console.log("this is a cleintX="+e.clientX);
  console.log("this is a clientY="+e.clientY);
  console.log("this is a x="+x);
  console.log("this is a y="+y);
  

  const sq = getSquareFromCoords(x, y);
  if(!sq) return;

  const piece = board[sq.row][sq.col];

  if(selectedPiece === null) {
    if(piece && pieceColor(sq.row, sq.col) === turn) {
      selectedPiece = sq;
      validMoves = getValidMoves(sq.row, sq.col);
      draw();
    }
  }
  else {
    if(validMoves.some(m => m[0] === sq.row && m[1] === sq.col)) {
      board[sq.row][sq.col] = board[selectedPiece.row][selectedPiece.col];
      board[selectedPiece.row][selectedPiece.col] = null;
      turn = turn === 'white' ? 'black' : 'white';
    }
    selectedPiece = null;
    validMoves = [];
    draw();
  }
});

function draw() {
  drawBoard();
  drawPieces();
}

function init() {
  draw();
}