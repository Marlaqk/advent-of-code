const utils = require('../../utils');

const INPUT = utils.getInput();
let sum = 0;
for(let i = 0; i < INPUT.length; i += 3) {
    let c = findCommonChar(INPUT[i], INPUT[i+1], INPUT[i+2]);
    sum += c.charCodeAt(0) < 96 ? c.charCodeAt(0) - 38 : c.charCodeAt(0) - 96;
    console.log(i)
}

console.log(sum)

function findCommonChar(s1, s2, s3) {
    const chars = new Map();
    s1.split('').forEach(c => chars.set(c, 0));
    s2.split('').forEach(c => chars.has(c) ? chars.set(c, 1) : null)
    const commonS1S2 = new Map([...chars].filter(([k, v]) => v == 1 ));
    for (let i = 0; i <= s3.length; i++) {
        if (commonS1S2.has(s3[i])) {
            return s3[i];
        }
    }
}
