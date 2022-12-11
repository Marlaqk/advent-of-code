import { getInput } from "../utils";
import {cloneDeep} from 'lodash';

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

let pointer = 0;
let accumulator = 0;
do {
    nodes[pointer].visited = true;
    let copyNodes;
    switch (nodes[pointer].instruction) {
        case 'acc':
            accumulator += nodes[pointer].value;
            pointer++;
            break;
        case 'jmp':
            copyNodes = cloneDeep(nodes);
            copyNodes[pointer].instruction = 'nop';
            runCode(accumulator, pointer, copyNodes);
            pointer += nodes[pointer].value;
            break;
        case 'nop':
            copyNodes = cloneDeep(nodes);
            copyNodes[pointer].instruction = 'jmp';
            runCode(accumulator, pointer, copyNodes);
            pointer++;
            break;
    }
} while (!nodes[pointer].visited);

function runCode(accumulator: number = 0, pointer: number = 0, nodes: Node[]) {
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
    } while (pointer < nodes.length && !nodes[pointer].visited)
    
    if (pointer >= nodes.length) {
        console.log('no finit loop: ', accumulator);
    }
}
