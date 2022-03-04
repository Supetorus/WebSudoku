let time = 0;
document.getElementById("btn-new-game").addEventListener('click', e => {
    grid = SetGrid(GenerateNumberGrid());
    SetBoard();
    console.log("new game");
    gameStarted = true;
    paused = false;
    time = 0;
});
document.getElementById("btn-reset").addEventListener('click', e => {
    hints = 3;
    mistakes = 0;
    moves = 0;
    time = 0;
    grid = SetGrid(GetInitialGrid());
    SetBoard();
    console.log("Clicked Reset");
});
document.getElementById("btn-note").addEventListener('click', e => {
    notes = !notes;
    console.log("Clicked Note");
});
document.getElementById("btn-hint").addEventListener('click', e => {
    GetHint();
    console.log("Clicked Hint");
});
document.getElementById("btn-undo").addEventListener('click', e => {
    Undo();
    console.log("Clicked Undo");
});
document.getElementById("btn-pause").addEventListener('click', e => {
    // Todo: Cover the screen with a big pause sign, and pause the timer.
    paused = !paused;
    console.log("Clicked Pause");
});
// Attaches an event listener to each number button.
for (let i = 1; i <= boardSize; i++) {
    document.getElementById("n" + i).addEventListener('click', e => {
        let clicked = e.target; // This is the paragraph element which was clicked.
        let num = parseInt(clicked.textContent); // This is the number which was clicked on.
        if (selected) {
            let col = parseInt(selected.id.slice(0, 1));
            let row = parseInt(selected.id.slice(1));
            if (notes) {
                SetNote(col, row, num);
            }
            else {
                SetCell(col, row, num);
            }
            console.log(`Set cell ${col}-${row} to ${num}`);
        }
        else
            console.log(`Clicked ${num}, No cell selected`);
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
                td.childNodes[0].textContent = cell.n.toString();
                td.childNodes[0].classList.remove("hidden"); // shows the number
                td.childNodes[1].classList.add("hidden"); // hides the notes grid
            }
        }
    }
}
// This function controls showing info.
document.getElementById("btn-info").addEventListener('click', e => {
    let controls = document.getElementById("controls");
    let children = controls.children;
    for (let ch of children) {
        ch.classList.toggle("hidden");
    }
    controls.style.minHeight = "0";
    let info = document.getElementById("info");
    children = info.children;
    for (let ch of children) {
        ch.classList.toggle("hidden");
    }
    info.style.minHeight = "33rem";
});
// This function controls showing controls.
document.getElementById("btn-controls").addEventListener('click', e => {
    let controls = document.getElementById("controls");
    let children = controls.children;
    for (let ch of children) {
        ch.classList.toggle("hidden");
    }
    controls.style.minHeight = "33rem";
    let info = document.getElementById("info");
    children = info.children;
    for (let ch of children) {
        ch.classList.toggle("hidden");
    }
    info.style.minHeight = "0";
});
var timer = setInterval(function () {
    if (!paused) {
        ++time;
        var hours = Math.floor((time % 86400) / 3600);
        var minutes = Math.floor((time % 3600) / 60);
        var seconds = Math.floor(time % 60);
        document.getElementById("timer").innerHTML = (hours > 0 ? `${hours}:` : "") + (minutes < 10 ? "0" : "") + `${minutes}:` + (seconds < 10 ? "0" : "") + seconds;
    }
}, 1000);
var autoSave = setInterval(function () {
    //TODO: save stuff
}, 10000);
//# sourceMappingURL=app.js.map