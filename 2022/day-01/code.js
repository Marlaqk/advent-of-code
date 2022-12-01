const utils = require('../../utils');

let [a,b,c] = utils.getRawInput()
    .split('\n\n')
    .map(x => utils.sum(x.split('\n').map(v => +v)))
    .sort((a,b) => b - a)
console.log(a)
console.log(a+b+c)