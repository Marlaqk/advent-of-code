const utils = require('../../utils');

const INPUT = utils.getInput();
const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

function solve(grid, starts, end) {
    const queue = starts.map(start => ({ pos: start, steps: 0 }));
    const seen = [];
    while (queue.length) {
        const {
            pos: [x, y],
            steps,
        } = queue.shift();
        if (seen[x]?.[y]) {
            continue;
        }
        if (x === end[0] && y === end[1]) {
            console.log(steps);
            break;
        }
        for (const [dx, dy] of dirs) {
            if (
                grid[x + dx]?.[y + dy] === undefined ||
                grid[x + dx][y + dy] > grid[x][y] + 1 ||
                seen[x + dx]?.[y + dy]
            ) {
                continue;
            }
            queue.push({ pos: [x + dx, y + dy], steps: steps + 1 });
        }
        seen[x] = seen[x] ?? [];
        seen[x][y] = 1;
    }
}

let p1_start, end;
const grid = INPUT.map((line, x) => {
    return line.split('').map((v, y) => {
        if (v == 'S') {
            p1_start = [x, y];
            return 0;
        }
        if (v == 'E') {
            end = [x, y]
            return 26;
        }
        return v.charCodeAt(0) - 97;
    })
});
let p2_starts = [];
grid.forEach((l,x) => l.forEach((v,y) => {
    if (v == 0) {
        p2_starts.push([x,y])
    }
}))

solve(JSON.parse(JSON.stringify(grid)), [p1_start], end)
solve(JSON.parse(JSON.stringify(grid)), p2_starts, end)