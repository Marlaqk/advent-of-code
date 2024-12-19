import { getCharGridInput, getRawInput, sum } from '../../utils.js';

const GRID = getCharGridInput()

const left = (pos) => ({ ...pos, x: pos.x - 1 });
const right = (pos) => ({ ...pos, x: pos.x + 1 });
const up = (pos) => ({ ...pos, y: pos.y - 1 });
const down = (pos) => ({ ...pos, y: pos.y + 1 });

const DIRECTIONS = new Map([[left, 'L'], [right, 'R'], [up, 'U'], [down, 'D']])

const verticalSplitterMapping = new Map([[right, [up, down]], [left, [up, down]], [down, [down]], [up, [up]]])
const horizontalSplitterMapping = new Map([[down, [left, right]], [up, [left, right]], [left, [left]], [right, [right]]])
const mirrorLeft = new Map([[right, up], [up, right], [left, down], [down, left]])
const mirrorRight = new Map([[right, down], [down, right], [left, up], [up, left]])

function getMoves(pos, direction) {
    switch (GRID[pos.y][pos.x]) {
        case '.':
            return [direction];
        case '|':
            return verticalSplitterMapping.get(direction);
        case '-':
            return horizontalSplitterMapping.get(direction);
        case '/':
            return [mirrorLeft.get(direction)];
        case '\\':
            return [mirrorRight.get(direction)];
    }
}

function beam(startPos, startDir) {
    let stack = [{pos: startPos, dir: startDir}], energized = {}, seen = {};

    let cur;
    while (cur = stack.pop()) {
        let k = `${cur.pos.y}-${cur.pos.x}-${DIRECTIONS.get(cur.dir)}`;
        if (seen[k] !== undefined) continue;

        if (!GRID[cur.pos.y] || !GRID[cur.pos.y][cur.pos.x]) continue;
        
        seen[k] = 1;
        energized[`${cur.pos.y}-${cur.pos.x}`] = 1;

        getMoves(cur.pos, cur.dir).forEach(dir => stack.push({
            dir: dir,
            pos: dir(cur.pos),
        }))
    }

    return Object.keys(energized).length;
}

console.log('part-01', beam({ x: 0, y: 0 }, right));

const startPoints = [];
for (let x = 0; x < GRID[0].length; x++) {
    startPoints.push({pos: { y: 0, x }, dir: down});
    startPoints.push({pos: { y: GRID.length -1, x }, dir: up});
}
for (let y = 0; y < GRID.length; y++) {
    startPoints.push({pos: { y, x: 0 }, dir: right});
    startPoints.push({pos: { y, x: GRID[0].length - 1 }, dir: left});
}

console.log('part-02', Math.max(...startPoints.map(start => beam(start.pos, start.dir))))