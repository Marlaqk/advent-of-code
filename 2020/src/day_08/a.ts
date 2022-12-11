import { getInput } from '../utils';

class Node {
    instruction: string;
    value: number;
    visited = false;

    constructor(instruction: string, value: number) {
        this.instruction = instruction;
        this.value = value;
    }
}

let entries = getInput()
let nodes: Node[] = [];
entries.forEach(entry => {
    let [instruction, value] = entry.split(' ');
    nodes.push(new Node(instruction, parseInt(value)));
})

let accumulator = 0;
let pointer = 0;
do {
    nodes[pointer].visited = true;
    switch (nodes[pointer].instruction) {
        case 'acc':
            accumulator += nodes[pointer].value;
            pointer++;
            break;
        case 'jmp':
            pointer += nodes[pointer].value;
            break;
        case 'nop':
            pointer++;
            break;
    }


} while (!nodes[pointer].visited)

console.log(accumulator);