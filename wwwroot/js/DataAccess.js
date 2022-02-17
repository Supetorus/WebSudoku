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
};
//repeat this for any boiler-plate code you need
function GetBoardGrid() {
    xhttp.open("GET", "WebSudoku/DAController/GetBoard", false);
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}
//Does not work
function SetNum(x, y, value) {
    gameTable.rows[y].cells[x].textContent = value.toString();
    xhttp.open("POST", 'WebSudoku/DAController/SetNum/${x}/${y}/${value}', false);
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}
//# sourceMappingURL=DataAccess.js.map