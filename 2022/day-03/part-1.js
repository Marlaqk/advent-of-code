const utils = require('../../utils');

const prioritySum = utils.getInput()
    .reduce((sum, line) => {
        let halfLength = line.length/2;
        let half1 = line.substring(0, halfLength);
        let half2 = line.substring(halfLength);
        let c = findCommonChar(half1, half2);
        let priorityValue = c.charCodeAt(0) < 96 ? c.charCodeAt(0) - 38 : c.charCodeAt(0) - 96;
        return sum + priorityValue
    }, 0)

console.log(prioritySum)

function findCommonChar(s1, s2) {
    const chars = new Set();
    s1.split('').forEach(c => chars.add(c));
    for (let i = 0; i <= s2.length; i++) {
        if (chars.has(s2[i])) {
            return s2[i];
        }
    }
    return null;
}