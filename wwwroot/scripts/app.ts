document.getElementById("btn-new-game").addEventListener('click', e => {
	let grid: number[] = GetBoardGrid();
	for (let x = 0; x < boardSize; x++) {
		for (let y = 0; y < boardSize; y++) {
			let num = grid[x + y * boardSize];
			gameTable.rows[y].cells[x].children[0].textContent = num === 0 ? "" : num.toString();
		}
	}
})