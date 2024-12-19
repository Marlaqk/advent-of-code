const utils = require('../utils');

console.log(utils.getInput().reduce(
    (acc, line) => acc + 
    (2 + line.replace(/\\/g, '\\\\').replace(/"/g, '\\"').length- line.length), 0))