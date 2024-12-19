const utils = require('../../utils');

const [ARRANGEMENT, MOVES] = utils.getRawInput().split('\n\n');
const NUMBERS = /(\d+)/g

const containers = new Map();
for(let row of ARRANGEMENT.split('\n').slice(0, -1)) {
    let stack = 1
    for(let i = 1; i < row.length; i+=4) {
        if (row[i] !== ' ') {
            if (containers.has(stack)) {
                containers.get(stack).push(row[i])
            } else {
                containers.set(stack, [row[i]])
            }
        }
        stack++
    }
}

function getTopOfStack(containers) {
    let topOfStack = ''
    for(let i = 1; containers.has(i); i++) {
        topOfStack += containers.get(i).splice(0, 1)
    }
    return topOfStack;
}

function part01(containers) {
    for (move of MOVES.split('\n')) {
        let [count, from, to] = move.match(NUMBERS).map(v => parseInt(v));
        let onTheMove = containers.get(from).splice(0, count)
        onTheMove.forEach(c => containers.get(to).unshift(c))
    } 
    return getTopOfStack(containers)
}

function part02(containers) {
    for (move of MOVES.split('\n')) {
        let [count, from, to] = move.match(NUMBERS).map(v => parseInt(v));
        let onTheMove = containers.get(from).splice(0, count)
        onTheMove.reverse().forEach(c => containers.get(to).unshift(c))
    } 
    return getTopOfStack(containers)
}

console.log(part01(utils.deepCopyMap(containers)))
console.log(part02(utils.deepCopyMap(containers)))