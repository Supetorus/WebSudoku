// Sets up the gameTable and gameBoard to be boardSize.
for (let row = 0; row < boardSize; row++) {
	gameTable.appendChild(document.createElement('tr'));
	for (let col = 0; col < boardSize; col++) {
		let td = document.createElement('td')
		td.classList.add("sudoku-square")
		td.classList.add("unselected");
		td.id = col.toString() + row.toString();
		gameTable.rows[row].appendChild(td);
		let p = document.createElement('p');
		p.classList.add("sudoku-square");
		//p.id = col.toString() + row.toString();
		td.addEventListener('click', boardClicked);
		gameTable.rows[row].cells[col].appendChild(p);

		// This is a table of the notes in this cell.
		let noteTable: HTMLTableElement = document.createElement('table');
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

function boardClicked(e: MouseEvent) {
	console.log(`Clicked Cell ${(e.target as HTMLElement).parentElement.closest("td").id}`);

	if (selected) {
		selected.classList.add("unselected");
		selected.classList.remove("selected");
	}

	selected = (e.target as HTMLElement).parentElement.closest("td");
	selected.classList.add("selected");
	selected.classList.remove("unselected");
}

// Draw lines
let c = document.getElementById("drawing") as HTMLCanvasElement;
//c.width = 640;
//c.height = 640;
let ctx = c.getContext("2d");
ctx.strokeStyle = "#005b94"
ctx.lineCap = "round";
ctx.lineWidth = 5;
//ctx.scale(1, 0.5);
ctx.beginPath();
// Vertical
ctx.moveTo(215, 8);
ctx.lineTo(215, 632);
ctx.moveTo(424, 8);
ctx.lineTo(424, 632);
// Horizontal
ctx.moveTo(8,   215);
ctx.lineTo(632, 215);
ctx.moveTo(8,   424);
ctx.lineTo(632, 424);
ctx.stroke();