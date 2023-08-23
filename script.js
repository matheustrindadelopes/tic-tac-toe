const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

const cells = new Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

function handleCellClick(index) {
    if (!gameActive || cells[index]) {
        return;
    }

    cells[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin() || checkDraw()) {
        gameActive = false;
        status.textContent = checkWin() ? `Jogador ${currentPlayer} venceu!` : 'Empate!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Jogador ${currentPlayer}, é a sua vez.`;
    }
}

function checkWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]           // Diagonais
    ];

    for (const combo of winCombinations) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return cells.every(cell => cell !== null);
}

function initGame() {
    cells.fill(null);
    board.innerHTML = '';
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Jogador ${currentPlayer}, é a sua vez.`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}

resetButton.addEventListener('click', initGame);
initGame();