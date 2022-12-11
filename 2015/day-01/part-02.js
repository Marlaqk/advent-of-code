const utils = require('../utils');

const input = utils.getRawInput().split('').map((value) => {
    return (value === '(' ? 1 : -1)
});

let floor = 0;
for (var i = 0; i < input.length; i++) {
    floor += input[i]
    if (floor == -1) {
        console.log(i+1)
        return
    }
}