const utils = require('../utils');

console.log(decompressLength(utils.getRawInput()));

function decompressLength(input) {
    let output = 0
    let i = 0
    while (i < input.length) {
        const ch = input[i++]

        if (ch !== '(') {
            output += 1
            continue
        }
        
        let endIdxMarker = i + parseInt(input.substring(i).indexOf(')'));
        let [length, times] = input.substring(i, endIdxMarker).split('x').map(e => parseInt(e));
        endIdxMarker++;
        
        const rawData = input.slice(endIdxMarker, endIdxMarker + length)
        output += times * decompressLength(rawData);

        i = endIdxMarker + length
    }
    return output
}