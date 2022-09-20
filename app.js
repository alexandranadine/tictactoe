const gridCells = document.querySelectorAll('[data-cell]')
const winningMessageModal = document.querySelector('.winning-message')
const winningMessageText = document.querySelector('.winning-message-text')
const overlay = document.querySelector('.overlay');
const starClass = 'star'
const moonClass = 'moon'
let starTurn
let moonTurn

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

function startGame() {
// Makes so cells can only be clicked one time
gridCells.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})
})
}


// Places mark, checks for win or draw, switches turns- in that order
function handleClick(e) {
const cell = e.target
const currentClass = starTurn ? starClass : moonClass // This is ternary, shorthand for if/else
placeMarker(cell, currentClass)
if(checkWin(currentClass)) {
    endGame(false)
}
switchPlayer()
}

function endGame(draw) {
    if (draw) {

    } else {
        winningMessageText.innerText = `${starTurn ? 'Stars' : "Moons"} Win!`
    }
    winningMessageModal.classList.add('show')
    overlay.classList.add('active')
}

function placeMarker(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchPlayer() {
    starTurn = !starTurn
}

function checkWin(currentClass) {
return winningCombos.some(combo => {
    return combo.every(index => {
        return gridCells[index].classList.contains(currentClass)
    })
})
}

startGame()