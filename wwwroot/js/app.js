document.getElementById("btn-new-game").addEventListener('click', e => {
    grid = GenerateGrid();
    SetBoard();
    console.log("new game");
});
document.getElementById("btn-reset").addEventListener('click', e => {
    grid = GetInitialGrid();
    SetBoard();
    console.log("Clicked Reset");
});
document.getElementById("btn-note").addEventListener('click', e => {
    // Todo: Toggle note entry mode
    console.log("Clicked Note");
});
document.getElementById("btn-hint").addEventListener('click', e => {
    //I think the best way to do this is to get a random unfilled position and ask the server for the correct number at that spot
    // Todo: Request a hint from the server and fill it in.
    console.log("Clicked Hint");
});
document.getElementById("btn-undo").addEventListener('click', e => {
    // Todo: Request the server do an undo and get the board at previous state
    console.log("Clicked Undo");
});
document.getElementById("btn-pause").addEventListener('click', e => {
    // Todo: Cover the screen with a big pause sign, and pause the timer.
    // Todo: implement a timer...
    console.log("Clicked Pause");
});
// Attaches an event listener to each number button.
for (let i = 1; i <= boardSize; i++) {
    document.getElementById("n" + i).addEventListener('click', e => {
        let clicked = e.target; // This is the paragraph element which was clicked.
        let num = parseInt(clicked.textContent); // This is the number which was clicked on.
        let col = parseInt(selected.id.slice(0, 1));
        let row = parseInt(selected.id.slice(1));
        if (!grid[col][row].isCorrect) {
            selected.childNodes[0].textContent = num.toString();
            selected.childNodes[0].classList.remove("hidden");
            selected.childNodes[1].classList.add("hidden");
            grid[col][row].n = num;
            grid[col][row].isCorrect = SetNum(col, row, num);
            if (grid[col][row].isCorrect) {
                selected.classList.add("correct");
                selected.classList.remove("incorrect");
            }
            else {
                selected.classList.add("incorrect");
                selected.classList.remove("correct");
            }
        }
        console.log(`Clicked ${num}`);
    });
}
// This function puts all the numbers from the grid into the visual board.
function SetBoard() {
    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row < boardSize; row++) {
            let cell = grid[col][row];
            let td = gameTable.rows[row].cells[col];
            if (cell.n === 0) {
                td.childNodes[0].textContent = "";
                td.childNodes[0].classList.add("hidden"); // hides the number
                td.childNodes[1].classList.remove("hidden"); // shows the notes grid
            }
            else {
                td.childNodes[0].textContent = cell.n === 0 ? "" : cell.n.toString();
                td.childNodes[0].classList.remove("hidden"); // shows the number
                td.childNodes[1].classList.add("hidden"); // hides the notes grid
            }
        }
    }
}
//# sourceMappingURL=app.js.map