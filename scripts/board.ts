class Board {
	size: number = 9;
	difficulty: number = 1;

	solved: number[][];
	unsolved: number[][];
	current: number[][];

	nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	indexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
		10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
		20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
		30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
		40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
		50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
		60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
		70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80];

	board(difficulty: number): void {
		this.difficulty = difficulty;
	}

	public generate(): void {
		while (!this.fillGrid()) {
			this.clearGrid(this.solved);
		}

		do {
			this.copyGrid(this.solved, this.unsolved);
			removeNums();
		} while (!this.solveGrid() && !this.compareGrids(this.solved, this.current));

		this.copyGrid(this.unsolved, this.current);
	}

	public getNum(x: number, y: number): number {
		return this.current[x][y];
	}

	public getCorrectNum(x: number, y: number): number {
		return this.solved[x][y];
	}

	public getUnsolvedNum(x: number, y: number): number {
		return this.unsolved[x][y];
	}

	clearGrid(grid: number[][]) {
		for (let x: number; x < this.size; ++x) {
			for (let y: number; y < this.size; ++y) {
				grid[x][y] = 0;
			}
		}
	}

	compareGrids(g1: number[][], g2: number[][]): boolean {
		for (let x: number; x < this.size; ++x) {
			for (let y: number; y < this.size; ++y) {
				if (g1[x][y] == g2[x][y]) return false;
			}
		}
		return true;
	}

	copyGrid(g1: number[][], g2: number[][]): boolean {
		for (let x: number; x < this.size; ++x) {
			for (let y: number; y < this.size; ++y) {
				g2[x][y] = g1[x][y];
			}
		}
		return true;
	}

	fillGrid(): boolean {
		for (let x = 0; x < 9; ++x) {
			for (let y = 0; y < 9; ++y) {
				let flag = false;
				//nums = nums.OrderBy(x => r.Next()).ToArray();
				this.nums = this.shuffleArray(this.nums);

				for (let i in this.nums) {
					if (this.checkSafety(x, y, parseInt(i), this.solved)) {
						this.solved[x][y] = parseInt(i);
						flag = true;
						break;
					}
				}

				if (!flag) {
					return false;
				}
			}
		}

		return true;
	}

	shuffleArray(array: number[]): number[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]; // I don't know how this works
		}
		return array;
	}

	RemoveNums(): void {
		this.indexes = this.shuffleArray(this.indexes);

		for (let i = 0; i < this.difficulty * 21; ++i) {
			this.unsolved[this.indexes[i] / 9][this.indexes[i] % 9] = 0;
		}
	}

	solveGrid(): boolean {
		this.copyGrid(this.unsolved, this.current);

		for (let x = 0; x < this.size; ++x) {
			for (let y = 0; y < this.size; ++y) {
				if (this.unsolved[x][y] == 0) {
					let flag = false;

					for (let i = 1; i < 10; ++i) {
						if (this.checkSafety(x, y, i, this.current)) {
							this.current[x][y] = i;
							flag = true;
						}
					}

					if (!flag) {
						return false;
					}
				}
			}
		}

		return true;
	}

	//public checkSafety(x: number, y: number, i: number): boolean {
	//	return this.checkSafety(x, y, i, this.current);
	//}

	private checkSafety(x: number, y: number, i: number, grid: number[][] = this.current): boolean {
		//Check Row
		for (let gx = 0; gx < this.size; ++gx) {
			if (grid[gx][y] == i) {
				return false;
			}
		}

		//Check Column
		for (let gy = 0; gy < this.size; ++gy) {
			if (grid[x][gy] == i) {
				return false;
			}
		}

		//Check Box
		for (let bx = x - (x % 3); bx < x - (x % 3) + 3; ++bx) {
			for (let by = y - (y % 3); by < y - (y % 3) + 3; ++by) {
				if (grid[bx][by] == i) {
					return false;
				}
			}
		}

		return true;
	}
}

function removeNums() {
    throw new Error("Function not implemented.");
}
