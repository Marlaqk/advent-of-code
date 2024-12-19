const utils = require('../../utils');
const INPUT = utils.getInput();

function part1() {
    function tick() {
        cycle++;
        if ((cycle + 20) % 40 === 0) {
            sum += cycle * x;
        }
    }

    let sum = 0
    let x = 1
    let cycle = 0
    for (const command of INPUT) {
        const [ins, value] = command.split(' ')
        if (ins === 'noop') {
            tick();
        } else {
            tick();
            tick();
            x += +value;
        }
    }

    console.log(sum)
}

function part2() {
    function tick() {
        cycle++;
        const ptr = (cycle - 1) % 40;
        display[~~((cycle - 1) / 40)][(cycle - 1) % 40] =
            ptr >= x - 1 && ptr <= x + 1 ? '#' : '.';
    }

    const display = [...Array(6)].map(() => [...Array(40)].fill('.'));
    let x = 1
    let cycle = 0
    for (const command of INPUT) {
        const [ins, value] = command.split(' ')
        if (ins === 'noop') {
            tick();
        } else {
            tick();
            tick();
            x += +value;
        }
    }

    console.log(display.map((line) => line.join('')).join('\n'));
}

part1()
part2()