import { getCharGridInput, getNeighboursIndex } from "../../utils.js";

const GRID = getCharGridInput();
let sum = 0;
for (let y = 0; y < GRID.length; y++) {
    for (let x = 0; x < GRID[0].length; x++) {
        if (GRID[y][x] == '*') {
            const neighbors = getNeighboursIndex(GRID, y, x);
            const neighborsNum = neighbors.filter(v => !isNaN(GRID[v.y][v.x]))
            const yIdx = new Set(neighborsNum.map(v => v.y));
            const xIdx = new Set(neighborsNum.map(v => v.x));
            if (yIdx.size == 2 || (yIdx.size == 1 && xIdx.size == 2 && Math.abs([...xIdx][0] - [...xIdx][1]) == 2)) {
                const numbers = new Set();
                neighborsNum.forEach(v => {
                    let num = GRID[v.y][v.x];
                    let xx = v.x - 1;
                    while(xx >= 0 && !isNaN(GRID[v.y][xx])) {
                        num = GRID[v.y][xx] + num;
                        xx--;
                    }
                    xx = v.x + 1;
                    while(xx <= GRID[0].length && !isNaN(GRID[v.y][xx])) {
                        num += GRID[v.y][xx];
                        xx++;
                    }
                    numbers.add(parseInt(num))
                })
                const num = [...numbers];
                if (numbers.size == 1) {
                    sum += num[0] * num[0]
                } else {
                    sum += num[0] * num[1]
                }
            }
        }
    }
}
console.log(sum)