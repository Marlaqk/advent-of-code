'use strict';
const utils = require('../utils');

const COMMANDS = {
    cpy: (reg, x, y) => {
        reg.set(y, value(reg, x))
        return 1;
    },
    inc: (reg, x) => {
        reg.set(x, reg.get(x) + 1);
        return 1;
    },
    dec: (reg, x) => {
        reg.set(x, reg.get(x) - 1);
        return 1;
    },
    jnz: (reg, x, y) => {
        return (value(reg, x) === 0 ? 1 : parseInt(y, 10))
    }
}

function value(memory, ptr) {
    return isNaN(ptr) ? memory.get(ptr) : parseInt(ptr, 10)
}

function runProgramm(registry, instructions) {
    let pointer = 0;
    while (pointer < instructions.length) {
        let [cmd, ...args] = instructions[pointer].split(' ');
        pointer += COMMANDS[cmd](registry, ...args);
    }
    return registry.get('a');
}

const INSTRUCTIONS = utils.getInput();
console.log(runProgramm(new Map(Object.entries({'a': 0, 'b': 0, 'c': 0, 'd': 0})), INSTRUCTIONS))
console.log(runProgramm(new Map(Object.entries({'a': 0, 'b': 0, 'c': 1, 'd': 0})), INSTRUCTIONS))