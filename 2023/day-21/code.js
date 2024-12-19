import { getCharGridInput, getNeighboursIndex, getRawInput, sum } from '../../utils.js';

const GRID = getCharGridInput()

const startPosition = [];
for (let y = 0; y < GRID.length; y++) {
    if (GRID[y].indexOf('S') > -1) {
        const x = GRID[y].indexOf('S');
        GRID[y][x] = '.';
        startPosition.push(y, x)
        break;
    }
}

console.log(startPosition)
const posRem = (dividend, divisor) => ((dividend % divisor) + divisor) % divisor;
const key = (pos) => pos.join(',');
const parseKey = (key) => key.split(',').map(Number)

function getNeighbours(y, x) {
    return [[-1, 0], [1, 0], [0, -1], [0, 1]].map(d => [y + d[0], x + d[1]])
        .filter(
            ([row, col]) => {
                return GRID[posRem(row, GRID.length)][posRem(col, GRID[0].length)] !== "#"
            }
        );;
}

function solve(STEPS) {
    const seen = new Set();
    let positions = [startPosition];
    let finalPlots = 0;
    for (let steps = STEPS; steps >= 0; steps--) {
        const newPositions = [];
        for (let pos of positions) {
            const seenKey = key(pos)
            if (seen.has(seenKey)) continue;
            seen.add(seenKey);
            if (steps % 2 === 0) {
                finalPlots += 1;
            }
            newPositions.push(...getNeighbours(pos[0], pos[1]));
        }
        positions = [...new Set(newPositions.map(key))].map(parseKey);
    }
    return finalPlots;
}

console.log('part-1', solve(64));

const solutions = Array.from({ length: 4 }).map((_, i) =>
    solve(Math.floor((i + 1) * GRID.length))
);
console.log(solutions); // 3814, 33952, 94138, 184372 

const fn = (n) => 2 * (7512 * n ** 2 - 7467 * n + 1862);

console.log('part-2', fn(Math.ceil(26501365/GRID.length)))