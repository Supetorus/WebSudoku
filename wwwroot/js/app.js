document.getElementById("btn-new-game").addEventListener('click', e => {
    let grid = GetBoardGrid();
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            let p = document.createElement('p');
            let num = grid[x + y * boardSize];
            p.textContent = num === 0 ? "" : num.toString();
            gameTable.rows[y].cells[x].appendChild(p);
        }
    }
});
//# sourceMappingURL=app.js.map