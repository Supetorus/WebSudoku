let time: number = 0;

if (Load()) {
	grid = SetGrid(GetCurrentGrid());
	SetBoard();
	gameStarted = true;
	paused = false;
	time = GetTime();
	mistakes = GetMistakes();
	hints = GetHints();
	moves = GetMoves();
	let notes: number[][][][] = GetNotes();

	for (let i: number = 0; i < boardSize; ++i) {
		for (let j: number = 0; j < boardSize; ++j) {
			let cell = (gameTable.rows[j].cells[i].childNodes[1] as HTMLTableElement);

			for (let k: number = 0; k < 3; ++k) {
				for (let l: number = 0; l < 3; ++l) {
					let note = cell.rows[l].cells[k];
					note.textContent = notes[i][j][k][l] != 0 ? notes[i][j][k][l].toString() : "";
				}
			}
		}
	}
}
else {
	grid = SetGrid(GenerateNumberGrid());
	SetBoard();
	gameStarted = true;
	paused = false;
	time = 0;
}

document.getElementById("btn-new-game").addEventListener('click', e => {
	hints = 3;
	mistakes = 0;
	moves = 0;
	time = 0;
	gameStarted = true;
	paused = false;
	document.getElementById("mistakes").innerHTML = `Mistakes: ${0}`;
	document.getElementById("hints").innerHTML = `Hints: ${0}`;
	document.getElementById("timer").innerHTML = "00:00"
	grid = SetGrid(GenerateNumberGrid());
	SetBoard();
})

document.getElementById("btn-reset").addEventListener('click', e => {
	hints = 3;
	mistakes = 0;
	moves = 0;
	time = 0;
	document.getElementById("mistakes").innerHTML = `Mistakes: ${0}`;
	document.getElementById("hints").innerHTML = `Hints: ${0}`;
	document.getElementById("timer").innerHTML = "00:00"
	grid = SetGrid(GetInitialGrid());
	SetBoard();
})

document.getElementById("btn-note").addEventListener('click', e => {
	notes = !notes;
	document.getElementById("btn-note").classList.toggle("selected");
	console.log("Clicked Note")
})

document.getElementById("btn-hint").addEventListener('click', e => {
	GetHint();
	console.log("Clicked Hint")
})

document.getElementById("btn-undo").addEventListener('click', e => {
	Undo();
	console.log("Clicked Undo")
})

document.getElementById("btn-pause").addEventListener('click', e => {
	// Todo: Cover the screen with a big pause sign, and pause the timer.
	paused = !paused;
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
			if (notes) { SetNote(col, row, num); }
			else { SetCell(col, row, num); }
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
	if (gameStarted) { Save(time); }
}, 10000);