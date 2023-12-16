import { getRawInput, sum } from '../../utils.js';

const INSTRUCTIONS = getRawInput().split(',')

const hash = (instr) => instr.split('').reduce((pv, c) => ((pv + c.charCodeAt(0)) * 17) % 256, 0)

console.log(INSTRUCTIONS.reduce((acc, instr) => {
    return acc + hash(instr)
}, 0))


const BOXES = new Map();
for (let i = 0; i < 256; i++) {
    BOXES.set(i, new Map())
}
for (let inst of INSTRUCTIONS) {
    const slot = inst.slice(-1)
    let sign = inst.slice(-2, -1)
    if (slot == '-') sign = '-'
    const label = inst.slice(0, inst.indexOf(sign));
    const sequenceHash = hash(label)
    if (sign == '-') {
        BOXES.get(sequenceHash).delete(label)
    } else if (sign == '=') {
        BOXES.get(sequenceHash).set(label, slot)
    }
}

console.log(sum([...BOXES.values()].map((v, idx) => [...v.values()].reduce((acc, v, currIdx) => acc + (idx + 1) * (currIdx + 1) * v, 0))))

