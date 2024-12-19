const { runInThisContext } = require('vm');
const utils = require('../../utils');

const commands = utils.getInput()

const movesDefinition = {
    R: {
        x: 1,
        y: 0,
    },
    L: {
        x: -1,
        y: 0,
    },
    U: {
        x: 0,
        y: 1,
    },
    D: {
        x: 0,
        y: -1,
    },
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(direction) {
        const delta = movesDefinition[direction];
        this.x += delta.x;
        this.y += delta.y;
    }

    follow(knot) {
        const distance = Math.max(
            Math.abs(this.x - knot.x),
            Math.abs(this.y - knot.y)
        );
        if (distance > 1) {
            const directionX = knot.x - this.x;
            this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
            const directionY = knot.y - this.y;
            this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
        }
    }
}

const p1 = new Point(0,0);
const p2 = new Point(0,0);
const visited = new Set()
for (line of commands) {
    let [direction, steps] = line.split(' ')
    for(let i = 0; i < steps; i++) {
        p1.move(direction)
        p2.follow(p1)
        visited.add(`${p2.x}-${p2.y}`);
    }
}
console.log('Part 1: ', visited.size)

const knots = new Array(10).fill(0).map(_ => new Point(0, 0))
visited.clear();
for (line of commands) {
    let [direction, steps] = line.split(' ')
    for (let i = 0; i < (+steps); i++) {
        knots[0].move(direction)
        for (let knot = 1; knot < knots.length; knot++) {
            knots[knot].follow(knots[knot - 1])
        }
        const tail = knots[knots.length - 1]
        visited.add(`${tail.x}-${tail.y}`)
    }
}
console.log('Part 2: ', visited.size)