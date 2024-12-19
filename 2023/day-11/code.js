import { getCharGridInput } from '../../utils.js';

const GRID = getCharGridInput();
const height = GRID.length;
const width = GRID[0].length;
const GALAXIES = new Set();
const GALAXIES_Y = new Set();
const GALAXIES_X = new Set();

for (let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
        if (GRID[y][x] == '#') {
            GALAXIES.add(`${y},${x}`)
            GALAXIES_Y.add(y);
            GALAXIES_X.add(x);
        }
    }
}

const emptyGalaxiesX = []
for(let x = 0; x < width; x++) {
    if (!GALAXIES_X.has(x)) {
        emptyGalaxiesX.push(x);
    }
}
const emptyGalaxiesY = []
for (let y = 0; y < height; y++) {
    if (!GALAXIES_Y.has(y)) {
        emptyGalaxiesY.push(y);
    }
}

function distance(a,b) {
    a = a.split(',').map(v => Number(v));
    b = b.split(',').map(v => Number(v));
    let dist = Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1])
    for (let x of emptyGalaxiesX) {
        if ((a[1] < x && x < b[1]) || (b[1] < x && x < a[1])) {
            dist += 999999;
        }
    }
    for (let y of emptyGalaxiesY) {
        if ((a[0] < y && y < b[0]) || (b[0] < y && y < a[0])) {
            dist += 999999
        }
    }
    return dist
}

let dist = 0;
const galaxies = [...GALAXIES.values()]
for (let i = 0; i < galaxies.length; i++) {
    for(let j = i + 1; j < galaxies.length; j++) {
        dist += distance(galaxies[i],galaxies[j])
    }
}
console.log(dist)
