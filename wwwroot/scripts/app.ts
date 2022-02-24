document.getElementById("btn-new-game").addEventListener('click', e => {
	grid = GenerateGrid();
	SetBoard();
	console.log("new game")
})

document.getElementById("btn-reset").addEventListener('click', e => {
	grid = GetInitialGrid();
	SetBoard();
	console.log("Clicked Reset");
})

document.getElementById("btn-note").addEventListener('click', e => {
	// Todo: Toggle note entry mode
	console.log("Clicked Note")
})

document.getElementById("btn-hint").addEventListener('click', e => {
	GetHint();
	console.log("Clicked Hint")
})

document.getElementById("btn-undo").addEventListener('click', e => {
	// Todo: Request the server do an undo and get the board at previous state
	console.log("Clicked Undo")
})

document.getElementById("btn-pause").addEventListener('click', e => {
	// Todo: Cover the screen with a big pause sign, and pause the timer.
	// Todo: implement a timer...
	console.log("Clicked Pause")
})

// Attaches an event listener to each number button.
for (let i = 1; i <= boardSize; i++) {
	document.getElementById("n" + i).addEventListener('click', e => {
		let clicked = e.target as HTMLParagraphElement; // This is the paragraph element which was clicked.
		let num: number = parseInt(clicked.textContent); // This is the number which was clicked on.
		let col: number = parseInt(selected.id.slice(0, 1));
		let row: number = parseInt(selected.id.slice(1));
		if (!grid[col][row].isCorrect) {
			selected.childNodes[0].textContent = num.toString();
			(selected.childNodes[0] as HTMLElement).classList.remove("hidden");
			(selected.childNodes[1] as HTMLElement).classList.add("hidden");
			grid[col][row].n = num;
			grid[col][row].isCorrect = SetNum(col, row, num)
			if (grid[col][row].isCorrect) {
				selected.classList.add("correct");
				selected.classList.remove("incorrect");
			}
			else {
				selected.classList.add("incorrect");
				selected.classList.remove("correct");
			}
		}
		console.log(`Clicked ${num}`)
	})
}

// This function puts all the numbers from the grid into the visual board.
function SetBoard() {
	for (let col = 0; col < boardSize; col++) {
		for (let row = 0; row < boardSize; row++) {
			let cell = grid[col][row];
			let td = gameTable.rows[row].cells[col] as HTMLTableDataCellElement;
			if (cell.n === 0) {
				(td.childNodes[0] as HTMLParagraphElement).textContent = "";
				(td.childNodes[0] as HTMLParagraphElement).classList.add("hidden"); // hides the number
				(td.childNodes[1] as HTMLTableElement).classList.remove("hidden"); // shows the notes grid
			}
			else {
				td.childNodes[0].textContent = cell.n.toString();
				(td.childNodes[0] as HTMLTableElement).classList.remove("hidden"); // shows the number
				(td.childNodes[1] as HTMLTableElement).classList.add("hidden"); // hides the notes grid
			}
		}
	}
}