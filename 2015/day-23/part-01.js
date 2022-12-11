const utils = require('../utils');

const INSTRUCTIONS = utils.getInput();
const SIMPLE_INSTRUCTION = /(hlf|tpl|inc) (\w+)/;
const SIMPLE_JUMP_INSTRUCTION = /(jmp) ([+-]\d+)/;
const CONDITIONAL_JUMP_INSTRUCTION = /(jie|jio) (\w+), ([+-]\d+)/;
const REGISTERS = new Map([
  ['a', 0],
  ['b', 0]
])

const MACRO_ASSEMBLER = {
  hlf: (_, value) => value / 2,
  tpl: (_, value) => value * 3,
  inc: (_, value) => value + 1,
  jmp: offset => +offset,
  jie: (offset, register) => register % 2 === 0 ? +offset : 1,
  jio: (offset, register) => register === 1 ? +offset : 1
};

function instructionParser(instruction) {
  let parsed;

  [SIMPLE_INSTRUCTION, SIMPLE_JUMP_INSTRUCTION, CONDITIONAL_JUMP_INSTRUCTION]
    .filter(instr => instr.test(instruction))
    .forEach(instr => parsed = instr.exec(instruction));

  return {
    instruction: parsed[1],
    register: isNaN(parseInt(parsed[2])) ? parsed[2] : null,
    offset: typeof parsed[3] === 'undefined' && parsed[1] === 'jmp' ? parsed[2] : parsed[3]
  }
}

let pointer = 0;
while (INSTRUCTIONS[pointer]) {
  const parsed = instructionParser(INSTRUCTIONS[pointer]);
  if (['jmp', 'jie', 'jio'].indexOf(parsed.instruction) !== -1) {
    pointer += MACRO_ASSEMBLER[parsed.instruction](parsed.offset, REGISTERS.get(parsed.register));
  } else {
    REGISTERS.set(parsed.register, MACRO_ASSEMBLER[parsed.instruction](parsed.offset, REGISTERS.get(parsed.register)));
    pointer++;
  }
}

console.log(REGISTERS.get('b'))