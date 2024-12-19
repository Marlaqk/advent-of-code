const utils = require('../utils');

const keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
let x = 1;
let y = 1;
let code = '';

utils.getInput().forEach(line => {
    const moves = line.split('');
    moves.forEach(move => moveDir(move));
    code += keypad[x][y];
})
console.log(code);

function moveDir(dir) {
    switch (dir) {
        case 'U': x = Math.max(0, x - 1);
            break;
        case 'D': x = Math.min(2, x + 1);
            break;
        case 'L': y = Math.max(0, y - 1);
            break;
        case 'R': y = Math.min(2, y + 1);
            break;
    }
}