const utils = require('../utils');

const INPUT = utils.getRawInput().split('')
const santaDirections = INPUT.filter((item, index) => index % 2 === 0)
const roboSantaDirections = INPUT.filter((item, index) => index % 2 === 1)

function traverse(directions) {
    const houses = new Set();
    houses.add(`0,0`)
    let x = 0, y = 0
    const fn = {
        '^': () => y += 1,
        '>': () => x += 1,
        'v': () => y -= 1,
        '<': () => x -= 1,
    }
    for (d of directions) {
        fn[d]()
        houses.add(`${x},${y}`)
    }
    return houses
}

console.log(new Set([...traverse(santaDirections), ...traverse(roboSantaDirections)]).size)