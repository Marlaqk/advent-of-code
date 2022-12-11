const utils = require('../utils');

const COORDINATES = {
    x: 0,
    y: 0,
}
const INSTRUCTION = /([RL])(\d+)/;
let dir = 'n';

utils.getRawInput().split(', ').forEach(line => {
    let [_, direction, step] = INSTRUCTION.exec(line);
    dir = updateDirection(dir, direction);
    updateCoordinate(COORDINATES, dir, parseInt(step));
});
console.log(Math.abs(COORDINATES.x) + Math.abs(COORDINATES.y));

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

function updateCoordinate(coordinate, dir, distance) {
    switch (dir) {
        case 'e':
            coordinate.x += distance;
            break;
        case 'w':
            coordinate.x -= distance;
            break;
        case 'n':
            coordinate.y += distance;
            break;
        case 's':
            coordinate.y -= distance;
            break;
        default:
            throw new Error('unknow direction:', dir);
    }
}