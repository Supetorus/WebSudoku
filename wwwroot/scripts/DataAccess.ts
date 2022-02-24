var xhttp = new XMLHttpRequest();

class GridNum {
	x: number;
	y: number;
	value: number;
}

xhttp.onload = function () {
	if (xhttp.readyState === XMLHttpRequest.DONE) {
		var status = xhttp.status;
		if (status === 0 || (status >= 200 && status < 400)) {
			//All Good
			//console.log(xhttp.responseText);
		}
		else {
			console.error(`Failed to retrieve data from server, ${xhttp.response}`);
		}
	}
}

//Returns the initial (unsolved) grid
function GetInitialGrid() {
	xhttp.open("GET", "WebSudoku/DAController/GetInitialGrid", false);
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

//Returns the current grid
function GetCurrentGrid() {
	//uses the GetCurrentGrid route in DAController
}

function GetCorrectNum(x: number, y: number) {
	//uses the GetCorrectNum route in DAController
}

//Sets client and server grid at (x, y) to value
//Returns true if the value is correct
function SetNum(x: number, y: number, value: number) {
	xhttp.open("POST", `WebSudoku/DAController/SetNum/${x}/${y}/${value}`, false); // this string uses back ticks (`) and ${} to insert values into it
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

//Returns a new sudoku board of numbers.
function GenerateNumberGrid(): number[][] {
	//Todo make this function take in a difficulty and return a board of difficulty.
	xhttp.open("POST", "WebSudoku/DAController/Generate", false);
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

function GetHint() {
	xhttp.open("GET", "", false);
	xhttp.send();
	let info = new GridNum();
	Object.assign(info, xhttp.responseText);

	grid[info.x][info.y].n = info.value;
	let td = gameTable.rows[info.x].cells[info.y] as HTMLTableDataCellElement;

	td.childNodes[0].textContent = info.value.toString();
	(td.childNodes[0] as HTMLTableElement).classList.remove("hidden"); // shows the number
	(td.childNodes[1] as HTMLTableElement).classList.add("hidden"); // hides the notes grid

	return info;
}

// Returns a new sudoku board of CellInfo
function GenerateGrid(): CellInfo[][] {
	let numGrid: number[][] = GenerateNumberGrid();
	let cells: CellInfo[][] = [];
	for (let col = 0; col < numGrid.length; col++) {
		cells.push([]);
		for (let row = 0; row < numGrid[col].length; row++) {
			cells[col].push(new CellInfo());
			cells[col][row].n = numGrid[col][row];
			if (cells[col][row].n != 0) cells[col][row].isCorrect = true;
		}
	}
	return cells;
}

class CellInfo {
	n: number;
	isCorrect: boolean = false;
}