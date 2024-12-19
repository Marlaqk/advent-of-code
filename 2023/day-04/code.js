import { getInput } from '../../utils.js';

const CARDS = getInput();

function part01(acc, card) {
    const [_, nums] = card.split(': ');
    const [winingNum, myNum] = nums.split(' | ').map(v => v.match(/(\d+)/g).map(v => Number(v)))
    const count = winingNum.filter(value => myNum.includes(value)).length;
    if (count > 0) {
        acc += Math.pow(2, count - 1);
    }
    return acc;
}

const copiesWon = [0];
function part02(acc, card) {
    const [_, nums] = card.split(': ');
    const [winingNum, myNum] = nums.split(' | ').map(v => v.match(/(\d+)/g).map(v => Number(v)))
    const count = winingNum.filter(value => myNum.includes(value)).length;
    const copies = copiesWon.shift() || 0
    for (let idx = 0; idx < count; idx++) {
        if (idx >= copiesWon.length) {
            copiesWon.push(1+copies);
        } else {
            copiesWon[idx] += 1+copies;
        }
    }
    return acc += copies + 1;
}

console.log(CARDS.reduce(part01, 0));
console.log(CARDS.reduce(part02, 0));