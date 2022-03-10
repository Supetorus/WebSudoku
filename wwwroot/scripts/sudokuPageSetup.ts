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
		p.classList.add("hidden");
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

	highlighted.forEach(td => {
		td.classList.remove("highlighted");
		td.classList.add("unselected");
	})

	selected = (e.target as HTMLElement).parentElement.closest("td");
	let col: number = parseInt(selected.id.slice(0, 1));
	let row: number = parseInt(selected.id.slice(1));

	// Highlight row
	for (let x = 0; x < boardSize; x++) {
		highlighted.push(gameTable.rows[row].cells[x]);
		gameTable.rows[row].cells[x].classList.remove("unselected");
		gameTable.rows[row].cells[x].classList.add("highlighted");
	}
	// Highlight column
	for (let y = 0; y < boardSize; y++) {
		highlighted.push(gameTable.rows[y].cells[col]);
		gameTable.rows[y].cells[col].classList.remove("unselected");
		gameTable.rows[y].cells[col].classList.add("highlighted");
	}
	//Highlight box
	for (let x = col - (col % 3); x < col - (col % 3) + 3; ++x) {
		for (let y = row - (row % 3); y < row - (row % 3) + 3; ++y) {
			highlighted.push(gameTable.rows[y].cells[x]);
			gameTable.rows[y].cells[x].classList.remove("unselected");
			gameTable.rows[y].cells[x].classList.add("highlighted");
		}
	}
	selected.classList.add("selected");
	selected.classList.remove("unselected");
	selected.classList.remove("highlighted");
}

// Draw lines
let c = document.getElementById("drawing") as HTMLCanvasElement;
//c.width = 640; // This is set in the index.cshtml, but could be set here instead.
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
ctx.moveTo(8, 215);
ctx.lineTo(632, 215);
ctx.moveTo(8, 424);
ctx.lineTo(632, 424);
ctx.stroke();
