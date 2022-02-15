let boardSize = 9;

let sudokuBoard: HTMLDivElement = document.getElementById("sudoku-board") as HTMLDivElement;

let gameBoard: HTMLDivElement[][] = [];

let gameTable: HTMLTableElement = document.createElement("table")

// Create the visual board elements.
for (let x = 0; x < boardSize; x++) {
	gameBoard.push([]);
	let tr = document.createElement("tr");
	for (let y = 0; y < boardSize; y++) {
		let td = document.createElement('td');
		let div = document.createElement('div');
		div.classList.add("sudoku-square");
		td.appendChild(div);
		tr.appendChild(td);
		gameBoard[x].push(div);
	}
	gameTable.appendChild(tr);
}
sudokuBoard.appendChild(gameTable);