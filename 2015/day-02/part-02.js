const utils = require('../utils');

console.log(utils.getInput().map(line => {
    let [a, b, c] = line.split('x').map(x => parseInt(x)).sort((a,b) => a - b)
    return a*b*c + (a + a + b + b)
}).reduce((acc, val) => acc + val))
