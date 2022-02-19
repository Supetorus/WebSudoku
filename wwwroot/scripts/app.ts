document.getElementById("btn-new-game").addEventListener('click', e => {
	let grid: number[] = GetBoardGrid();
	for (let x = 0; x < boardSize; x++) {
		for (let y = 0; y < boardSize; y++) {
			let num = grid[x + y * boardSize];
			let p = document.getElementById(x.toString() + y.toString());
			p.textContent = num === 0 ? "" : num.toString();
			p.id = x.toString() + y.toString();
			//gameTable.rows[y].cells[x].children[0].appendChild(p);
		}
	}
})

document.getElementById("btn-reset").addEventListener('click', e => {
	// Todo: Get the unsolved grid from the server and fill it in.
	console.log("Clicked Reset")
})

document.getElementById("btn-note").addEventListener('click', e => {
	// Todo: Toggle note entry mode
	console.log("Clicked Note")
})

document.getElementById("btn-hint").addEventListener('click', e => {
	// Todo: Request a hint from the server and fill it in.
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

for (let i = 1; i <= boardSize; i++) {
	document.getElementById("n" + i).addEventListener('click', e => {
		let clicked = e.target as HTMLParagraphElement; // This is the paragraph element which was clicked.
		let num = parseInt(clicked.textContent); // This is the number which was clicked on.

		// Todo: Insert the number at the selected location. Tell the server what
		// number was entered where and find out whether it was correct or not.
		console.log(`Clicked ${num}`)
	})
}