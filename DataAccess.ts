﻿class CellInfo {
	n: number;
	isCorrect: boolean = false;
}

var xhttp = new XMLHttpRequest();

//TODO: get this info at start
let moves: number = 0;
let hints: number = 3;
let mistakes: number = 0;

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

//Get Solved Board
function GetSolvedGrid() {
	xhttp.open("GET", "WebSudoku/DAController/GetSolvedGrid");
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

//isBoard Solved
function isBoardSolved() {
	xhttp.open("GET", "WebSudoku/DAController/isBoardSolved");
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

//Returns the current grid 
function GetCurrentGrid() {
	xhttp.open("GET", "WebSudoku/DAController/GetCurrentGrid", false);
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

function GetCorrectNum(x: number, y: number) {
	xhttp.open("GET", `WebSudoku/DAController/GetCorrectNum/${x}/${y}`, false);
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

//Sets client and server grid at (x, y) to value
//Returns true if the value is correct
function SetNum(x: number, y: number, value: number) {
	xhttp.open("POST", `WebSudoku/DAController/SetNum/${x}/${y}/${value}`, false); // this string uses back ticks (`) and ${} to insert values into it
	xhttp.send();
	++moves;
	let correct: boolean = JSON.parse(xhttp.responseText);
	if (!correct) {
		document.getElementById("Mistakes").innerHTML = `Mistakes: ${++mistakes}`;
	}
	return correct;
}

//Generates a new board and returns it
function GenerateNumberGrid() {
	xhttp.open("POST", "WebSudoku/DAController/Generate", false);
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

function GetHint() {
	if (gameStarted && hints > 0) {
		xhttp.open("GET", "WebSudoku/DAController/GetHint", false);
		xhttp.send();

		let info: number[] = xhttp.responseText.split(",").map(Number);

		SetCell(info[0], info[1], info[2]);
		document.getElementById("Hints").innerHTML = `Hints: ${--hints}`;
	}
}

function Undo() {
	if (moves > 0) {
		xhttp.open("GET", "WebSudoku/DAController/GetUndo", false);
		xhttp.send();

		let info: number[] = xhttp.responseText.split(",").map(Number);

		SetCell(info[0], info[1], info[2], true);
		--moves;
	}
}
function changeColors() {
	xhttp.open("GET", "WebSudoku/DAController/ChangeColor", false);
	xhttp.send();
	var col = document.getElementById("test");
	if (colorIndex >= colors.length) {
		colorIndex = 0;
	}
	col.style.backgroundColor = colors[colorIndex];
	colorIndex++;
}
