const utils = require('../utils');

const houses = new Set();
houses.add(`0,0`)
let x = 0, y = 0

let fn = {
    '^': () => y += 1,
    '>': () => x += 1,
    'v': () => y -= 1,
    '<': () => x -= 1,
}

for(let direction of utils.getRawInput().split('')) {
    fn[direction]()
    houses.add(`${x},${y}`)
}

console.log(houses.size)
