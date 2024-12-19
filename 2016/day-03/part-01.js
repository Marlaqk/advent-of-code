const utils = require('../utils');

const reg = /(\d+)\s+(\d+)\s+(\d+)/;

console.log(utils.getInput().reduce((val, line) => {
    const matches = reg.exec(line);
    const numbers = [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];
    
    if (isTriangle(numbers)) {
        return val + 1;
    }

    return val;
}, 0))

function isTriangle(numbers) {
    const combination = utils.combine(numbers, 2);
    return combination.reduce((i, combination) => {
        const thirdNum = numbers.filter(n => combination.indexOf(n) < 0)[0];
        if (utils.sum(combination) <= thirdNum) {
            return false;
        }
        return i;
    }, true)
}