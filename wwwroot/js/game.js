export class Game {
    constructor() {
        this.hintNum = 3;
        this.totalHints = 3;
        this.time = 0;
        this.maxMistakes = 5;
    }
    incrememtMistakes() {
        this.mistakes++;
    }
    resetMistakes() {
        this.mistakes = 0;
    }
}
//# sourceMappingURL=game.js.map