export class Board {
    constructor() {
        this.size = 9;
        this.difficulty = 1;
        this.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
            40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
            50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
            60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
            70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80];
    }
    board(difficulty) {
        this.difficulty = difficulty;
    }
    generate() {
        while (!this.fillGrid()) {
            this.clearGrid(this.solved);
        }
        do {
            this.copyGrid(this.solved, this.unsolved);
            this.removeNums();
        } while (!this.solveGrid() && !this.compareGrids(this.solved, this.current));
        this.copyGrid(this.unsolved, this.current);
    }
    getNum(x, y) {
        return this.current[x][y];
    }
    getCorrectNum(x, y) {
        return this.solved[x][y];
    }
    getUnsolvedNum(x, y) {
        return this.unsolved[x][y];
    }
    clearGrid(grid) {
        for (let x; x < this.size; ++x) {
            for (let y; y < this.size; ++y) {
                grid[x][y] = 0;
            }
        }
    }
    compareGrids(g1, g2) {
        for (let x; x < this.size; ++x) {
            for (let y; y < this.size; ++y) {
                if (g1[x][y] == g2[x][y])
                    return false;
            }
        }
        return true;
    }
    copyGrid(g1, g2) {
        for (let x; x < this.size; ++x) {
            for (let y; y < this.size; ++y) {
                g2[x][y] = g1[x][y];
            }
        }
        return true;
    }
    fillGrid() {
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
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // I don't know how this works
        }
        return array;
    }
    removeNums() {
        this.indexes = this.shuffleArray(this.indexes);
        for (let i = 0; i < this.difficulty * 21; ++i) {
            this.unsolved[this.indexes[i] / 9][this.indexes[i] % 9] = 0;
        }
    }
    solveGrid() {
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
    checkSafety(x, y, i, grid = this.current) {
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
//# sourceMappingURL=Board.js.map