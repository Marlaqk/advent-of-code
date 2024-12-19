import { getCharGridInput, getNeighbours } from "../../utils.js";

const GRID = getCharGridInput();
let sum = 0;
for (let y = 0; y < GRID.length; y++) {
    for (let x = 0; x < GRID[0].length; x++) {
        const neighbours = [];
        let number = '';
        while(!isNaN(GRID[y][x]) && x < GRID[0].length) {
            neighbours.push(...getNeighbours(GRID, y, x))
            number += GRID[y][x];
            x++;
        }
        if (number.length > 0 && neighbours.some(v => isNaN(v) && v != '.')) {
            sum += Number(number);
        }
    }
}
console.log(sum)