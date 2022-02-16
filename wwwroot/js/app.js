import { Game } from "./game";
let game;
document.getElementById("btn-new-game").addEventListener('click', e => {
    game = new Game();
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            let p = document.createElement('p');
            p.textContent = game.board.getNum(x, y).toString();
            gameTable[x][y].appendChild(p);
        }
    }
});
//# sourceMappingURL=app.js.map