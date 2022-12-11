const utils = require('../utils');

const keypad = [
    ['', '', 1, '', ''],
    ['', 2, 3, 4, ''],
    [5, 6, 7, 8, 9],
    ['', 'A', 'B', 'C', ''],
    ['', '', 'D', '', ''],
]
let x = 2;
let y = 0;
let code = '';

utils.getInput().forEach(line => {
    const moves = line.split('');
    moves.forEach(move => moveDir(move));
    code += keypad[x][y];
})
console.log(code);

function moveDir(dir) {
    let x_new = x, y_new = y;
    switch (dir) {
        case 'U': x_new = Math.max(0, x - 1);
            break;
        case 'D': x_new = Math.min(4, x + 1);
            break;
        case 'L': y_new = Math.max(0, y - 1);
            break;
        case 'R': y_new = Math.min(4, y + 1);
            break;
    }
    if (keypad[x_new][y_new] !== '') {
        x = x_new;
        y = y_new;
    }
}