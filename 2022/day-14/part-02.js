const utils = require('../../utils');

const INPUT = utils.getInput().map(l => l.split(' -> ').map(cords => cords.split(',').map(v => Number(v))));
const GRID = new Map();
let lowestDepth = -Infinity;
for (line of INPUT) {
    for(let i = 0; i < line.length - 1; i++) {
        for (let x = Math.min(line[i][1], line[i+1][1]); x <= Math.max(line[i][1], line[i+1][1]); x++) {
            for (let y = Math.min(line[i][0], line[i+1][0]); y <= Math.max(line[i][0], line[i+1][0]); y++) {
                lowestDepth = Math.max(lowestDepth,x)
                GRID.set(`${x}-${y}`, '#')
            }
        }
    }
}

lowestDepth += 2;
for (let y = 0; y <= 1000; y++) {
    GRID.set(`${lowestDepth}-${y}`, '#')
}

const SAND_START = [500,0];
let [y_drop, x_drop] = SAND_START;
let count = 0;
while(true) {
    if (!GRID.has(`${x_drop+1}-${y_drop}`)) {
        x_drop++;
        continue;
    }
    if (!GRID.has(`${x_drop+1}-${y_drop-1}`)) {
        x_drop++;
        y_drop--;
        continue;
    }
    if (!GRID.has(`${x_drop+1}-${y_drop+1}`)) {
        x_drop++;
        y_drop++;
        continue;
    }
    if (GRID.has(`${x_drop}-${y_drop}`)) {
        console.log(count)
        return;
    }
    GRID.set(`${x_drop}-${y_drop}`, 'o');
    count++;
    [y_drop,x_drop] = SAND_START;
}