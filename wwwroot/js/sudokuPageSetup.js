let boardSize = 9;
// sudokuBoard is the div element which contains the grid. Think of it as the background.
let sudokuBoard = document.getElementById("sudoku-board");
// gameBoard is a 2D array of all the 'p' elements which compose the sudoku grid.
let gameBoard = [];
// All of the sudoku 'p' elements are contained in this html table.
let gameTable = document.createElement("table");
// Create the visual board elements.
for (let x = 0; x < boardSize; ++x) {
    gameBoard.push([]);
    let tr = document.createElement("tr");
    for (let y = 0; y < boardSize; ++y) {
        let td = document.createElement('td');
        let p = document.createElement('p');
        p.classList.add("sudoku-square");
        p.id = x.toString() + y.toString();
        p.addEventListener('click', boardClicked);
        td.appendChild(p);
        tr.appendChild(td);
        gameBoard[x].push(p);
    }
    gameTable.appendChild(tr);
}
sudokuBoard.appendChild(gameTable);
function boardClicked(e) {
    console.log(`Clicked ${e.target.id}`);
}
//# sourceMappingURL=sudokuPageSetup.js.map