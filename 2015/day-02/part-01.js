const utils = require('../utils');

console.log(utils.getInput().map(line => {
    let [l, w, h] = line.split('x')
    let sides = [l*w, w*h, h*l]
    return 2*sides.reduce((a,v) => a + v) + Math.min(...sides)
}).reduce((acc, val) => acc + val))
