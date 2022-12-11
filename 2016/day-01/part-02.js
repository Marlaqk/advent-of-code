const { exit } = require('process');
const utils = require('../utils');

const COORDINATES = {
    x: 0,
    y: 0,
}
const VISITED = new Set();
VISITED.add(`0-0`)
const INSTRUCTION = /([RL])(\d+)/;
let dir = 'n';
let done = false;

utils.getRawInput().split(', ').forEach(line => {
    if (done) {
        return;
    }
    let [_, direction, step] = INSTRUCTION.exec(line);
    dir = updateDirection(dir, direction);
    updateCoordinate(COORDINATES, dir, parseInt(step));
});

function updateDirection(dir, cmd) {
    switch (dir) {
        case 'e':
            return cmd == 'L' ? 'n' : 's';
        case 's':
            return cmd == 'L' ? 'e' : 'w';
        case 'w':
            return cmd == 'L' ? 's' : 'n';
        case 'n':
        default:
            return cmd == 'L' ? 'w' : 'e';
    }
}

function updateCoordinate(coordinate, dir, distance, visited) {
    switch (dir) {
    case 'e':
        for (let i = 1; i <= distance; i++) {
            updateVisited(coordinate.x + i, coordinate.y);
        }
        coordinate.x += distance; break;
    case 'w':
        for (let i = 1; i <= distance; i++) {
            updateVisited(coordinate.x - i, coordinate.y);
        }
        coordinate.x -= distance; break;
    case 'n':
        for (let i = 1; i <= distance; i++) {
            updateVisited(coordinate.x, coordinate.y + i);
        }
        coordinate.y += distance; break;
    case 's':
        for (let i = 1; i <= distance; i++) {
            updateVisited(coordinate.x, coordinate.y - i);
        }
        coordinate.y -= distance; break;
    default:
        throw new Error('unknow direction:', dir);
    }
}

function updateVisited(x, y) {
    const key = `${x}-${y}`;
    if (VISITED.has(key)) {
        console.log(Math.abs(x) + Math.abs(y))
        done = true;
    } else {
        VISITED.add(key)
    }
}