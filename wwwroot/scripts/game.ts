import { Board } from "./board.js";

export class Game {
	public board: Board;
	public mistakes: number;
	public hintNum: number = 3;
	public totalHints: number = 3;
	public time: number = 0;

	public incrememtMistakes(): void {
		this.mistakes++;
	}

	public resetMistakes(): void {
		this.mistakes = 0;
	}

	public maxMistakes: number = 5;
}