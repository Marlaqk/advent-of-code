const utils = require('../../utils');

const edges = [
    {
        x: -1,
        y: 0,
        z: 0,
    },
    {
        x: +1,
        y: 0,
        z: 0,
    },
    {
        x: 0,
        y: -1,
        z: 0,
    },
    {
        x: 0,
        y: 1,
        z: 0,
    },
    {
        x: 0,
        y: 0,
        z: -1,
    },
    {
        x: 0,
        y: 0,
        z: 1,
    }
]

const cubes = new Set();
const input = utils.getInput();
let max = -Infinity;
let min = Infinity;
input.forEach(line => {
    cubes.add(line);
})

console.log(input.reduce((sum, cube) => {
    const [x, y, z] = cube.split(',').map(v => Number(v));
    max = Math.max(max, x, y, z);
    min = Math.min(min, x, y, z);
    sum += edges.reduce((s, edge) => {
        let xC = x + edge.x;
        let yC = y + edge.y;
        let zC = z + edge.z;
        if (!cubes.has(`${xC},${yC},${zC}`)) {
            return s += 1;
        }
        return s;
    }, 0);
    return sum;
}, 0));

let visited = new Set();
let surfaceArea = 0;
let queue = [{ x: 0, y: 0, z: 0 }];
while (queue.length > 0) {
    let { x, y, z } = queue.shift();
    if (visited.has(`${x},${y},${z}`)
        || cubes.has(`${x},${y},${z}`)
        || (x < min - 1 || y < min - 1 || z < min - 1)
        || (x > max + 1 || y > max + 1 || z > max + 1)) {
        continue;
    }
    visited.add(`${x},${y},${z}`);

    surfaceArea += edges.reduce((s, edge) => {
        let xC = x + edge.x;
        let yC = y + edge.y;
        let zC = z + edge.z;
        if (cubes.has(`${xC},${yC},${zC}`)) {
            return s += 1;
        }
        return s;
    }, 0);;

    queue.push({ x: x + 1, y, z });
    queue.push({ x: x - 1, y, z });
    queue.push({ x, y: y + 1, z });
    queue.push({ x, y: y - 1, z });
    queue.push({ x, y, z: z + 1 });
    queue.push({ x, y, z: z - 1 });
}

console.log(surfaceArea);