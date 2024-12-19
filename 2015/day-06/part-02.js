const utils = require('../utils');

const parseCommand = _command => {
    let command = _command.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);
    return { command: command[1], x1: +command[2], y1: +command[3], x2: +command[4], y2: +command[5] };
};

let LIGHTS = new Uint8Array(1000 * 1000);
utils.getInput().forEach(_command => {
    let command = parseCommand(_command);

    for (let x = command.x1; x <= command.x2; x++) {
        for (let y = command.y1; y <= command.y2; y++) {
            let index = 1000 * x + y;

            if (command.command === 'turn on') LIGHTS[index] += 1;
            if (command.command === 'turn off') LIGHTS[index] = LIGHTS[index] === 0 ? 0 : LIGHTS[index] - 1;;
            if (command.command === 'toggle') LIGHTS[index] += 2
        }
    }
});

const result = LIGHTS.reduce((brightness, light) => brightness + light, 0);
console.log(result);