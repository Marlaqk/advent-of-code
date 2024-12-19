import { getCharGridInput, sum } from '../../utils.js';

let GRID = getCharGridInput();

function tiltNorth() {
    for (let x = 0; x < GRID[0].length; x++) {
        let N = 0;
        for (let y = 0; y < GRID.length; y++) {
            if (GRID[y][x] === "#") N = y + 1;
            if (GRID[y][x] === "O") (GRID[y][x] = "."), (GRID[N][x] = "O"), N++;
        }
    }
}
function tiltWest() {
    for (let y = 0; y < GRID.length; y++) {
        let W = 0;
        for (let x = 0; x < GRID[0].length; x++) {
            if (GRID[y][x] === "#") W = x + 1;
            if (GRID[y][x] === "O") (GRID[y][x] = "."), (GRID[y][W] = "O"), W++;
        }
    }
}
function tiltSouth() {
    for (let x = 0; x < GRID[0].length; x++) {
        let S = GRID.length - 1;
        for (let y = GRID.length - 1; y >= 0; y--) {
            if (GRID[y][x] === "#") S = y - 1;
            if (GRID[y][x] === "O") (GRID[y][x] = "."), (GRID[S][x] = "O"), S--;
        }
    }
}
function tiltEast() {
    for (let y = 0; y < GRID.length; y++) {
        let E = GRID[y].length - 1;
        for (let x = GRID[0].length - 1; x >= 0; x--) {
            if (GRID[y][x] === "#") E = x - 1;
            if (GRID[y][x] === "O") (GRID[y][x] = "."), (GRID[y][E] = "O"), E--;
        }
    }
}

function cycle() {
    tiltNorth();
    tiltWest();
    tiltSouth();
    tiltEast();
}


function processGrid(grid) {
    const cache = {};
    let i = 0, last = 0, max = 1;
    while (true) {
      const key = grid.map(l => l.join('')).join();
      if (cache[key] === max) {
        if (max > 1) break;
        last = i;
        max++;
      }
      cycle(grid), (cache[key] = (cache[key] || 0) + 1), i++;
    }
    const rest = (1_000_000_000 - last) % (i - last);
    for (i = 0; i < rest; i++) cycle(grid);
    return sum(grid.map((l, idx) => l.filter(v => v == 'O').length * (grid.length - idx)));
  }

console.log(processGrid(GRID))