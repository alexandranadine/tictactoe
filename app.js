const gridCells = document.querySelectorAll("[data-cell]");

const winningMessageModal = document.querySelector(".winning-message");
const winningMessageText = document.querySelector(".winning-message-text");

const overlay = document.querySelector(".overlay");

const p1Moon = document.querySelector(".player1-moon");
const p2Moon = document.querySelector(".player2-moon");

const p1Star = document.querySelector(".player1-star");
const p2Star = document.querySelector(".player2-star");

const playButton = document.querySelector(".play-game");
const restartButton = document.querySelector(".restart");

const starClass = "star";
const moonClass = "moon";

let currentPlayer;

let starTurn;
let moonTurn;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  gridCells.forEach((cell) => {
    cell.classList.remove(starClass); // Resets the board after restart click
    cell.classList.remove(moonClass);
    cell.addEventListener("click", handleClick, { once: true }); // Makes so cells can only be clicked one time
  });
  winningMessageModal.classList.remove("show"); //Closes modal after restart click
  overlay.classList.remove("active");
}

// Places mark, checks for win or draw, switches turns- in that order
function handleClick(e) {
  const cell = e.target; // Selects the target: the cell that gets clicked
  const currentClass = starTurn ? starClass : moonClass; // This is ternary, shorthand for if/else
  placeMarker(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchPlayer();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "It's a tie!";
  } else {
    winningMessageText.innerText = `${starTurn ? "Stars" : "Moons"} Win!`;
  }
  winningMessageModal.classList.add("show");
  overlay.classList.add("active");
  p1Star.classList.remove("select");
  p2Moon.classList.remove("select");
  p2Star.classList.remove("select");
  p1Moon.classList.remove("select");
  playButton.classList.remove("select");
}

function isDraw() {
  // destructre the board into an array so that we can look through to
  // see if each cell is filled
  return [...gridCells].every((cell) => {
    return (
      cell.classList.contains(starClass) || cell.classList.contains(moonClass)
    );
  });
}

function placeMarker(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchPlayer() {
  starTurn = !starTurn;
}

function checkWin(currentClass) {
  return winningCombos.some((combo) => {
    return combo.every((index) => {
      return gridCells[index].classList.contains(currentClass);
    });
  });
}

function choosePlayer() {
  p1Moon.addEventListener("click", () => {
    p1Moon.classList.add("select");
    p2Star.classList.add("select");
    p1Star.classList.remove("select");
    p2Moon.classList.remove("select");
    moonTurn = true;
    starTurn = false;
  });
  p1Star.addEventListener("click", () => {
    p1Star.classList.add("select");
    p2Moon.classList.add("select");
    p1Moon.classList.remove("select");
    p2Star.classList.remove("select");
    starTurn = true;
    moonTurn = false;
  });
  p2Moon.addEventListener("click", () => {
    p2Moon.classList.add("select");
    p1Star.classList.add("select");
    p2Star.classList.remove("select");
    p1Moon.classList.remove("select");

  });
  p2Star.addEventListener("click", () => {
    p2Star.classList.add("select");
    p1Moon.classList.add("select");
    p2Moon.classList.remove("select");
    p1Star.classList.remove("select");

  });
}

choosePlayer();
playButton.addEventListener("click", () => {
  playButton.classList.add("select");
  startGame();
});
restartButton.addEventListener("click", startGame);
