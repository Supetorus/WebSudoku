document.getElementById("btn-new-game").addEventListener('click', e => {
	grid = SetGrid(GenerateNumberGrid());
	SetBoard();
	console.log("new game")
})

document.getElementById("btn-reset").addEventListener('click', e => {
	grid = SetGrid(GetInitialGrid());
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
		if (selected) {
			let col: number = parseInt(selected.id.slice(0, 1));
			let row: number = parseInt(selected.id.slice(1));
			SetCell(col, row, num);
			console.log(`Set cell ${col}-${row} to ${num}`);
		}
		else console.log(`Clicked ${num}, No cell selected`)

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
})

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
})