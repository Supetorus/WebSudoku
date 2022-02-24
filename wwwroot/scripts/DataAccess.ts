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
	grid[x][y] = value;
	gameTable.rows[y].cells[x].children[0].textContent = value.toString();
	xhttp.open("POST", `WebSudoku/DAController/SetNum/${x}/${y}/${value}`, false); // this string uses back ticks (`) and ${} to insert values into it
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

//Generates a new board and returns it
function GenerateBoard() {
	xhttp.open("POST", "WebSudoku/DAController/Generate", false);
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

function GetHint() {
	xhttp.open("GET", "", false);
	xhttp.send();
	let info = new GridNum();
	Object.assign(info, xhttp.responseText);
	//grid[info.x][info.y] = info.value;
	gameTable.rows[info.y].cells[info.x].children[0].textContent = info.value.toString();
	return info;
}