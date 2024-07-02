let board;
let currentPlayer;
let gameOver;

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');

resetButton.addEventListener('click', startGame);

cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
});

function startGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
    message.textContent = Player ${currentPlayer}'s turn;
}

function cellClick(event) {
    const index = event.target.dataset.index;

    if (!gameOver && !board[index]) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            message.textContent = Player ${currentPlayer} wins!;
            gameOver = true;
            highlightWinningCells();
        } else if (board.every(cell => cell)) {
            message.textContent = 'It\'s a draw!';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = Player ${currentPlayer}'s turn;
        }
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function highlightWinningCells() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    winPatterns.forEach(pattern => {
        if (pattern.every(index => board[index] === currentPlayer)) {
            pattern.forEach(index => cells[index].classList.add('win'));
        }
    });
}

// Start the game when the page loads
startGame();