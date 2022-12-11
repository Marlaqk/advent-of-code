const utils = require('../utils'); 

const input = utils.getRawInput();

let i = 0;
let length = 0;
while(i < input.length) {
    if (input[i] != '(') {
        i++;
        length++;
    } else {
        const endIdxMarker = i + parseInt(input.substring(i).indexOf(')'));
        const [seq, times] = input.substring(i+1, endIdxMarker).split('x');
        length += parseInt(seq) * parseInt(times);
        i = endIdxMarker + parseInt(seq) + 1;
    }
}

console.log(length)