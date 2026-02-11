const container = document.getElementById('game-container');
const statusDisplay = document.getElementById('status');
const shuffleBtn = document.getElementById('shuffle-btn');

let tiles = [];
const size = 4;

function initGame() {
    tiles = Array.from({ length: size * size - 1 }, (_, i) => i + 1);
    tiles.push(null); // Das leere Feld
    renderBoard();
}

function renderBoard() {
    container.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        if (tile === null) {
            tileDiv.classList.add('empty');
            tileDiv.textContent = '';
        } else {
            tileDiv.textContent = tile;
            tileDiv.addEventListener('click', () => moveTile(index));
        }
        container.appendChild(tileDiv);
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(null);
    if (isAdjacent(index, emptyIndex)) {
        swapTiles(index, emptyIndex);
        renderBoard();
        checkWin();
    }
}

function isAdjacent(idx1, idx2) {
    const row1 = Math.floor(idx1 / size);
    const col1 = idx1 % size;
    const row2 = Math.floor(idx2 / size);
    const col2 = idx2 % size;

    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);

    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function swapTiles(idx1, idx2) {
    const temp = tiles[idx1];
    tiles[idx1] = tiles[idx2];
    tiles[idx2] = temp;
}

function shuffle() {
    statusDisplay.textContent = '';
    statusDisplay.style.color = '';
    
    let shuffleMoves = 200;
    while (shuffleMoves > 0) {
        const emptyIndex = tiles.indexOf(null);
        const neighbors = getNeighbors(emptyIndex);
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        swapTiles(emptyIndex, randomNeighbor);
        shuffleMoves--;
    }
    renderBoard();
}

function getNeighbors(index) {
    const neighbors = [];
    const row = Math.floor(index / size);
    const col = index % size;

    if (row > 0) neighbors.push(index - size);
    if (row < size - 1) neighbors.push(index + size);
    if (col > 0) neighbors.push(index - 1);
    if (col < size - 1) neighbors.push(index + 1);
    
    return neighbors;
}

function checkWin() {
    const isWin = tiles.slice(0, -1).every((tile, i) => tile === i + 1);
    if (isWin && tiles[tiles.length - 1] === null) {
        statusDisplay.textContent = 'Herzlichen Glückwunsch! Gewonnen!';
        statusDisplay.style.color = 'var(--success-color)';
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(t => t.style.pointerEvents = 'none');
    }
}

shuffleBtn.addEventListener('click', () => {
    initGame();
    shuffle();
});

initGame();
shuffle();
