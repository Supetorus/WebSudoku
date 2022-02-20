let boardSize = 9;
// All of the sudoku 'p' elements are contained in this html table.
let gameTable: HTMLTableElement = document.getElementById("gameTable") as HTMLTableElement;

// Sets up the gameTable and gameBoard to be boardSize.
for (let i = 0; i < boardSize; i++) gameTable.appendChild(document.createElement('tr'));
for (let row = 0; row < boardSize; row++) {
	for (let col = 0; col < boardSize; col++) {
		gameTable.rows[row].appendChild(document.createElement('td'));
	}
}

// Create the visual board elements and store them in the gameTable.
for (let col = 0; col < boardSize; ++col) {
	let tr = document.createElement("tr");
	for (let row = 0; row < boardSize; ++row) {
		let p = document.createElement('p');
		p.classList.add("sudoku-square");
		p.id = col.toString() + row.toString();
		p.addEventListener('click', boardClicked);
		gameTable.rows[row].cells[col].appendChild(p);
	}
}

function boardClicked(e: MouseEvent) {
	console.log(`Clicked ${(e.target as HTMLParagraphElement).id}`)
}