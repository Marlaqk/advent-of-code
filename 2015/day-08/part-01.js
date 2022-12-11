const utils = require('../utils');

console.log(utils.getInput().reduce((acc, line) => acc + (line.length - eval(line).length), 0))