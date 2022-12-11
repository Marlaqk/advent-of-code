const utils = require('../utils'); 

const RECT_CMD = /^rect (\d+)x(\d+)$/;
const ROTATE_ROW_CMD = /^rotate row y=(\d+) by (\d+)$/;
const ROTATE_COL_CMD = /^rotate column x=(\d+) by (\d+)$/;
const GRID = Array(6).fill(Array(50).fill(0));

utils.getInput().forEach(line => {
    let matches;
    if (matches = RECT_CMD.exec(line)) {
        turnOn(GRID, parseInt(matches[1]), parseInt(matches[2]))
    } else if (matches = ROTATE_ROW_CMD.exec(line)) {
        rotateRow(GRID, parseInt(matches[1]), parseInt(matches[2]))
    } else if (matches = ROTATE_COL_CMD.exec(line)) {
        rotateCol(GRID, parseInt(matches[1]), parseInt(matches[2]))
    }
});
console.log(GRID.reduce((acc, row) => acc + utils.sum(row), 0))
console.log('-------------------')
GRID.forEach(v => console.log(v.join('').replaceAll('0',' ').replaceAll('1', '#')))
console.log('-------------------')

function rotateRow(grid, pos, steps) {
    const arr = grid[pos];
    steps %= arr.length;
    grid[pos] = arr.slice(arr.length - steps).concat(arr.slice(0, arr.length - steps));
}

function rotateCol(grid, pos, steps) {
    const arr = grid.map(l => l[pos]);
    steps %= arr.length;
    for (let i = 0; i < grid.length; i++) {
        grid[i][pos] = arr[i >= steps ? i - steps : i + arr.length - steps];
    }
}

function turnOn(grid, x, y) {
    for(let i = 0; i < y; i++) {
        for(let j = 0; j < x; j++) {
            grid[i][j] = 1;
        }
    }
}