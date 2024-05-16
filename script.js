let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let winner = null;
let playerXScore = 0;
let playerOScore = 0;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const popup = document.getElementById('popup');
const winnerText = document.getElementById('winner');
const restartBtn = document.getElementById('restartBtn');
const playerXScoreText = document.getElementById('playerXScore');
const playerOScoreText = document.getElementById('playerOScore');

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

function handleClick() {
  const cellIndex = parseInt(this.id.split('-')[1]);
  if (gameBoard[cellIndex] !== '' || !gameActive) return;
  gameBoard[cellIndex] = currentPlayer;
  this.textContent = currentPlayer;
  checkWinner();
  togglePlayer();
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      winner = gameBoard[a];
      updateScoreboard();
      displayPopup(`${winner} wins!`);
      return;
    }
  }
  if (!gameBoard.includes('')) {
    gameActive = false;
    displayPopup("It's a draw!");
  }
}

function displayPopup(message) {
  popup.style.display = 'flex';
  winnerText.textContent = message;
}

function restartGame() {
  popup.style.display = 'none';
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  winner = null;
  cells.forEach(cell => cell.textContent = '');
}

function updateScoreboard() {
  if (winner === 'X') {
    playerXScore++;
    playerXScoreText.textContent = playerXScore;
  } else if (winner === 'O') {
    playerOScore++;
    playerOScoreText.textContent = playerOScore;
  }
}