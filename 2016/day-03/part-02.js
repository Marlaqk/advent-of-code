const utils = require('../utils');

const reg = /(\d+)\s+(\d+)\s+(\d+)/;

const triangles = [];
let offSet = 0;
utils.getInput().forEach(line => {
    const matches = reg.exec(line);
    if (offSet == 0) {
        triangles.push([]);
        triangles.push([]);
        triangles.push([]);
    }
    const rowIdx = triangles.length - 3;
    triangles[rowIdx].push(parseInt(matches[1]))
    triangles[rowIdx+1].push(parseInt(matches[2]))
    triangles[rowIdx+2].push(parseInt(matches[3]))
    offSet++;
    if (offSet == 3) {
        offSet = 0;
    }
});

console.log(triangles.reduce((val, numbers) => {
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