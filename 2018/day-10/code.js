import { getInput } from '../../utils.js';

const plot = (array) => {
    const minX = Math.min(...array.map((s) => s.x));
    const maxX = Math.max(...array.map((s) => s.x));
    const minY = Math.min(...array.map((s) => s.y));
    const maxY = Math.max(...array.map((s) => s.y));

    const grid = Array
        .from({ length: Math.abs(minY - maxY) + 1 })
        .map(() => {
            return Array
                .from({ length: Math.abs(minX - maxX) + 1 })
                .map(() => '.');
        });

    array.forEach((star) => {
        grid[star.y - minY][star.x - minX] = '#';
    });

    const constellation = grid.map((s) => s.join('')).join('\n');

    return constellation;
};

function tick(points, direction = 1) {
    points.forEach(p => {
        p.x = p.x + (direction * p.vX);
        p.y = p.y + (direction * p.vY);
    });
}

function getDistance(points) {
    const xPoints = points.map(p => p.x);
    const yPoints = points.map(p => p.y);
    return Math.max(...xPoints) - Math.min(...xPoints) + Math.max(...yPoints) - Math.min(...yPoints);
}

const lights = getInput();
const points = lights.map(v => {
    const [x, y, vX, vY] = v.match(/(-?\d+)/g).map(v => parseInt(v));
    return { x, y, vX, vY };
})

let minDist = Infinity;
let count = 0;
while (true) {
    tick(points);
    const newDist = getDistance(points);
    if (minDist < newDist) {
        console.log('solution')
        tick(points, -1);
        break;
    } else {
        minDist = newDist
        count++;
    }
}



console.log(plot(points))
console.log(count)
