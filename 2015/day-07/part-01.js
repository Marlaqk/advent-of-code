const utils = require('../utils');

const WIRES = new Map();
const COMMAND_REGEX = /[A-Z]+/g;
const ARGS_REGEX = /[a-z0-9]+/g;
const BITWISE_METHODS = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    NOT: a => ~a,
    LSHIFT: (a, b) => a << b,
    RSHIFT: (a, b) => a >> b
};

function parseInstruction(instruction) {
    const command = instruction.match(COMMAND_REGEX)
    const args = instruction.match(ARGS_REGEX)
    const destination = args.pop();

    return {
        command: command && command[0],
        args: args.map(arg => isNaN(Number(arg)) ? arg : Number(arg)),
        destination: destination
    };
}

function calculateWire(wire) {
    const instruction = WIRES.get(wire);
    if (typeof wire === 'number') return wire;
    if (typeof instruction === 'number') return instruction;
    if (!instruction.command) {
        WIRES.set(wire, calculateWire(instruction.args[0]));
    } else {
        WIRES.set(wire, BITWISE_METHODS[instruction.command](...instruction.args.map(e => calculateWire(e))))
    }
    return WIRES.get(wire)
}

utils.getInput().forEach(instruction => {
    const parsed = parseInstruction(instruction)
    WIRES.set(parsed.destination, parsed)
});

console.log(calculateWire('a'));