const utils = require('../utils');

const ROUNDS = 100;
const LAMP_ON = '#';
const LAMP_OFF = '.';

let grid = [];
for (let line of utils.getInput()) {
  grid.push(line.split(''))
}

const round = grid => {
  const newGrid = JSON.parse(JSON.stringify(grid)); ;
  for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
      let countNeighbours = utils.getNeighbours(grid, y, x).filter(x => x == LAMP_ON).length;
      newGrid[y][x] = LAMP_OFF;
      if (grid[y][x] == LAMP_ON && [2,3].indexOf(countNeighbours) > -1) {
        newGrid[y][x] = LAMP_ON;
      } else if (grid[y][x] == LAMP_OFF && countNeighbours == 3) {
        newGrid[y][x] = LAMP_ON;
      }
    }
  }
  return newGrid;
}

for(let i = 1; i <= ROUNDS; i++) {
  grid = round(grid);
}

console.log(grid.reduce((currentCount, row) => currentCount + row.filter(x => x == LAMP_ON).length, 0))