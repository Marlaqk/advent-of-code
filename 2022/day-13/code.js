const utils = require('../../utils');
const PACKETS = utils.getRawInput().split('\n\n').map(l => l.split('\n').map(v => JSON.parse(v)));

function isEqual(left, right) {
    if (!Array.isArray(left) && !Array.isArray(right)) {
        return left - right
    }
    if (!Array.isArray(left)) left = [left]
    if (!Array.isArray(right)) right = [right]
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
        if ((res = isEqual(left[i], right[i])) != 0) return res
    }
    return left.length - right.length
}

const rightOrder = PACKETS.reduce((acc, l, idx) => {
    let [p1, p2] = l;
    if (isEqual(p1, p2) <= 0) {
        return acc += idx + 1;
    }
    return acc;
}, 0)
console.log(rightOrder)

PACKETS.push([[[2]]], [[[6]]]);
const sortedPackages = PACKETS.flat()
    .sort((left, right) => isEqual(left, right))
    .map(v => v.toString());
console.log((sortedPackages.indexOf('2') + 1) * (sortedPackages.indexOf('6') + 1))