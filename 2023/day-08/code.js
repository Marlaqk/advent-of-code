import { getRawInput, lcm } from '../../utils.js';

class Node {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    getNodeByDirection(direction) {
        return direction == 'R' ? this.right : this.left;
    }
}

const [directions, mapIn] = getRawInput().split('\n\n');

const MAP =  new Map();
for(let line of mapIn.split('\n')) {
    const [node, left, right] = line.match(/[A-Z]+/g);
    MAP.set(node, new Node(node, left, right));
}

let steps = 0;
let node = MAP.get('AAA');
while(node.value !== 'ZZZ') {
    node = MAP.get(node.getNodeByDirection(directions[steps % directions.length]))
    steps++;
}
console.log('Part-1:', steps)

steps = 0;
let nodes = [...MAP.keys()].filter(v => v.slice(-1) == 'A');
let cycles = [];
for(let i = 0; i < nodes.length; i++) {
    steps = 0;
    let node = nodes[i]
    while(node.slice(-1) != 'Z') {
        node = MAP.get(node).getNodeByDirection(directions[steps % directions.length]);
        steps++;
    }
    cycles.push(steps)
}
console.log('Part-2:', lcm(cycles))