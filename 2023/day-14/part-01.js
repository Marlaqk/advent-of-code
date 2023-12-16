import { getCharGridInput, sum } from '../../utils.js';

const GRID = getCharGridInput();

function tiltNorth() {
    for (let x = 0; x < GRID[0].length; x++) {
        let N = 0;
        for (let y = 0; y < GRID.length; y++) {
            if (GRID[y][x] === "#") N = y + 1;
            if (GRID[y][x] === "O") (GRID[y][x] = "."), (GRID[N][x] = "O"), N++;
        }
    }
}

tiltNorth()

console.log(sum(GRID.map((l, idx) => l.filter(v => v == 'O').length * (GRID.length - idx))));