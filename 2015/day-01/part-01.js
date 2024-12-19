const utils = require('../utils');

console.log(utils.getRawInput().split('')
    .reduce((acc, value) => {
        return acc + (value === '(' ? 1 : -1)
    }, 0))