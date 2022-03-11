let boardSize = 9;
let noteGridSize = 3;
let selected: HTMLTableDataCellElement;
let highlighted: HTMLTableDataCellElement[] = [];

let gameStarted: boolean = false;
let paused: boolean = true;
let notes: boolean = false;

// All of the sudoku 'p' elements are contained in this html table.
let gameTable: HTMLTableElement = document.getElementById("game-table") as HTMLTableElement;

let grid: CellInfo[][];

function SetCell(x: number, y: number, value: number, undo: boolean = false) {
	let cell = gameTable.rows[y].cells[x];

	if (grid && grid[x][y].n != value) {
		if (value == 0) {
			cell.childNodes[0].textContent = "";
			(cell.childNodes[0] as HTMLElement).classList.add("hidden");
			(cell.childNodes[1] as HTMLElement).classList.remove("hidden");
			cell.classList.remove("correct");
			cell.classList.remove("incorrect");
			grid[x][y].n = value;
			grid[x][y].isCorrect = false;
		}
		else if (!grid[x][y].isCorrect || undo) {
			cell.childNodes[0].textContent = value.toString();
			(cell.childNodes[0] as HTMLElement).classList.remove("hidden");
			(cell.childNodes[1] as HTMLElement).classList.add("hidden");
			grid[x][y].n = value;
			grid[x][y].isCorrect = false;
			if (!undo) {
				grid[x][y].isCorrect = SetNum(x, y, value)
				//TODO: remove note in row/col/box
			}

			if (grid[x][y].isCorrect) {
				cell.classList.add("correct");
				cell.classList.remove("incorrect");
			}
			else {
				cell.classList.add("incorrect");
				cell.classList.remove("correct");
			}
		}
	}
}

function SetNote(x: number, y: number, value: number) {
	let cell = gameTable.rows[y].cells[x];
	let note = (gameTable.rows[y].cells[x].childNodes[1] as HTMLTableElement).rows[Math.floor((value-1) / 3)].cells[(value-1) % 3];

	if (cell.childNodes[0].textContent == "") {
		if (note.textContent != "") {
			note.textContent = "";
		}
		else {
			note.textContent = value.toString();
		}

		SetNoteData(x, y, value);
	}
}

function SetGrid(grid: number[][]): CellInfo[][] {
	let notes: number[][][][] = GetNotes();
	let cells: CellInfo[][] = [];
	for (let col = 0; col < grid.length; col++) {
		cells.push([]);
		for (let row = 0; row < grid[col].length; row++) {
			cells[col].push(new CellInfo());
			cells[col][row].n = grid[col][row];
			if (cells[col][row].n != 0 && GetCorrectNum(col, row) == cells[col][row].n) {
				cells[col][row].isCorrect = true;
				gameTable.rows[row].cells[col].classList.add("correct");
				gameTable.rows[row].cells[col].classList.remove("incorrect");
			}
			else if (cells[col][row].n != 0) {
				cells[col][row].isCorrect = false;
				gameTable.rows[row].cells[col].classList.add("incorrect");
				gameTable.rows[row].cells[col].classList.remove("correct");
			}

			let cell = (gameTable.rows[row].cells[col].childNodes[1] as HTMLTableElement);

			for (let k: number = 0; k < 3; ++k) {
				for (let l: number = 0; l < 3; ++l) {
					let note = cell.rows[k].cells[l];
					note.textContent = notes[col][row][k][l] != 0 ? notes[col][row][k][l].toString() : "";
				}
			}
		}
	}

	return cells;
}