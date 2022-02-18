var xhttp = new XMLHttpRequest();

xhttp.onload = function () {
	if (xhttp.readyState === XMLHttpRequest.DONE) {
		var status = xhttp.status;
		if (status === 0 || (status >= 200 && status < 400)) {
			//All Good
			//console.log(xhttp.responseText);
		}
		else {
			console.error("Failed to retrieve data from server, ${xhttp.responseText}");
		}
	}
}

//repeat this for any boiler-plate code you need
function GetBoardGrid() {
	xhttp.open("GET", "WebSudoku/DAController/GetBoard", false);
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}

function SetNum(x: number, y: number, value: number) {
	gameTable.rows[y].cells[x].children[0].textContent = value.toString();
	xhttp.open("POST", 'WebSudoku/DAController/SetNum/' + x + '/' + y + '/' + value, false);
	xhttp.send();
	return JSON.parse(xhttp.responseText);
}