const utils = require('../utils');

const POSITIONS = [];
utils.getInput().forEach(line => {
    const chars = line.split('');
    chars.forEach((c, idx) => {
        if (!POSITIONS[idx]) POSITIONS[idx] = new Map();
        if (!POSITIONS[idx].get(c)) {
            POSITIONS[idx].set(c, 1);
        } else {
            POSITIONS[idx].set(c, POSITIONS[idx].get(c)+1);
        }
    })
})

console.log(POSITIONS.reduce((pv, v) => {
    console.log(v)
   return pv + Object.keys(Object.fromEntries(v)).reduce((a, b) => v.get(a) < v.get(b) ? a : b);
}, ''))