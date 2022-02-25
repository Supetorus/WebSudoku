let boardSize = 9;
let noteGridSize = 3;
let selected: HTMLTableDataCellElement;

// All of the sudoku 'p' elements are contained in this html table.
let gameTable: HTMLTableElement = document.getElementById("game-table") as HTMLTableElement;

let grid: CellInfo[][];