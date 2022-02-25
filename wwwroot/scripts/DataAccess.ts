﻿class CellInfo {
	n: number;
	isCorrect: boolean = false;
}

var xhttp = new XMLHttpRequest();

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
	xhttp.open("GET", "WebSudoku/DAController/GetHint", false);
	xhttp.send();

	let info: number[] = xhttp.responseText.split(",").map(Number);

	SetCell(info[0], info[1], info[2]);
}
