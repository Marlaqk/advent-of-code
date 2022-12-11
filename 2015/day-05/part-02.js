const utils = require('../utils');

const isContainPair = string => /([a-z][a-z]).*\1/.test(string);
const isContainRepeatLetter = string => /([a-z])[a-z]\1/.test(string);

console.log(utils.getInput().filter(l => !!(isContainPair(l) && isContainRepeatLetter(l))).length)