let boardSize = 9;
let noteGridSize = 3;
// All of the sudoku 'p' elements are contained in this html table.
let gameTable = document.getElementById("gameTable");
gameTable.id = "game-table";
// Sets up the gameTable and gameBoard to be boardSize.
for (let row = 0; row < boardSize; row++) {
    gameTable.appendChild(document.createElement('tr'));
    for (let col = 0; col < boardSize; col++) {
        let td = document.createElement('td');
        td.classList.add("sudoku-square");
        td.id = col.toString() + row.toString();
        gameTable.rows[row].appendChild(td);
        let p = document.createElement('p');
        p.classList.add("sudoku-square");
        //p.id = col.toString() + row.toString();
        td.addEventListener('click', boardClicked);
        gameTable.rows[row].cells[col].appendChild(p);
        // This is a table of the notes in this cell.
        let noteTable = document.createElement('table');
        noteTable.classList.add("note-table");
        //noteTable.classList.add("hidden");
        // Sets up the noteTable.
        for (let nRow = 0; nRow < noteGridSize; nRow++) {
            noteTable.appendChild(document.createElement('tr'));
            for (let nCol = 0; nCol < noteGridSize; nCol++) {
                let nTd = document.createElement('td');
                nTd.classList.add("note-square");
                noteTable.rows[nRow].appendChild(nTd);
                let p = document.createElement('p');
                //p.id = col.toString() + row.toString() + nCol.toString() + nRow.toString();
                p.classList.add("note-square");
                //p.textContent = "0";
                noteTable.rows[nRow].cells[nCol].appendChild(p);
            }
        }
        gameTable.rows[row].cells[col].appendChild(noteTable);
    }
}
function boardClicked(e) {
    console.log(`Clicked Cell ${e.target.parentElement.closest("td").id}`);
}
//# sourceMappingURL=sudokuPageSetup.js.map