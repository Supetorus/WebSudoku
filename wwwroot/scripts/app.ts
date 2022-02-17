var xhttp = new XMLHttpRequest();

document.getElementById("btn-new-game").addEventListener('click', e => {
	let grid: number[];
	xhttp.onload = function () {
		if (xhttp.readyState === XMLHttpRequest.DONE) {
			var status = xhttp.status;
			if (status === 0 || (status >= 200 && status < 400)) {
				console.log(xhttp.responseText);
				grid = JSON.parse(xhttp.responseText);
			}
			else {
				console.log(xhttp.responseText);
			}
		}
	}
	xhttp.open("GET", "WebSudoku/DAController/GetBoard", false);
	xhttp.send();

	for (let x = 0; x < boardSize; x++) {
		for (let y = 0; y < boardSize; y++) {
			let p = document.createElement('p');
			
			p.textContent = grid[x + y * boardSize].toString();
			gameTable.rows[x].cells[y].appendChild(p);
		}
	}
})