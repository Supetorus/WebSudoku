﻿let boardSize = 9;
let noteGridSize = 3;
let selected: HTMLTableDataCellElement;
let highlighted: HTMLTableDataCellElement[] = [];

let gameStarted: boolean = false;
let paused: boolean = true;

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

function SetGrid(grid: number[][]): CellInfo[][] {
	let cells: CellInfo[][] = [];
	for (let col = 0; col < grid.length; col++) {
		cells.push([]);
		for (let row = 0; row < grid[col].length; row++) {
			cells[col].push(new CellInfo());
			cells[col][row].n = grid[col][row];
			if (cells[col][row].n != 0) cells[col][row].isCorrect = true;
		}
	}
	return cells;
}