const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");
const drawsText = document.getElementById("draws");
const restartRoundButton = document.getElementById("restartRound");
const resetGameButton = document.getElementById("resetGame");

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let scores = { X: 0, O: 0, draws: 0 };

function handleCellClick(event) {
  const index = Number(event.currentTarget.dataset.index);

  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  event.currentTarget.textContent = currentPlayer;
  event.currentTarget.classList.toggle("player-o", currentPlayer === "O");
  event.currentTarget.disabled = true;

  const winningCombo = winningCombos.find(combo =>
    combo.every(cellIndex => board[cellIndex] === currentPlayer)
  );

  if (winningCombo) {
    gameActive = false;
    winningCombo.forEach(cellIndex => cells[cellIndex].classList.add("winner"));
    scores[currentPlayer]++;
    updateScores();
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    return;
  }

  if (board.every(cell => cell !== "")) {
    gameActive = false;
    scores.draws++;
    updateScores();
    statusText.textContent = "It's a draw! 🤝";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function updateScores() {
  scoreXText.textContent = scores.X;
  scoreOText.textContent = scores.O;
  drawsText.textContent = scores.draws;
}

function restartRound() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("player-o", "winner");
  });

  statusText.textContent = "Player X's turn";
}

function resetGame() {
  scores = { X: 0, O: 0, draws: 0 };
  updateScores();
  restartRound();
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartRoundButton.addEventListener("click", restartRound);
resetGameButton.addEventListener("click", resetGame);
