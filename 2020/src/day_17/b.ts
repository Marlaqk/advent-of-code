import { getRawInput } from "../utils";

let cube = new Set();
const input = getRawInput().split('\n').map(line => [...line]);
input.forEach((row, rowIdx) => {
  row.forEach((el, colIdx) => {
    if (el == '#') cube.add([colIdx, rowIdx, 0, 0].toString())
  })
})

const MAX_STEPS = 6;

for (let i = 1; i <= MAX_STEPS; i++) {
  let newCube = new Set();
  cube.forEach(cubeEl => {
    // @ts-ignore
    const [x, y, z, w] = cubeEl.split(',').map(x => Number(x));
    simulateElements(newCube, cube, x, y, z, w);
  })
  cube = newCube;
}

console.log(cube.size)

function simulateElements(newCube, cube, x, y, z, w) {
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      for (let zOffset = -1; zOffset <= 1; zOffset++) {
        for (let wOffset = -1; wOffset <= 1; wOffset++) {
          const newX = x + xOffset;
          const newY = y + yOffset;
          const newZ = z + zOffset;
          const newW = w + wOffset;
          const position = [newX, newY, newZ, newW].toString();
          const neighbours = countNeighbours(cube, newX, newY, newZ, newW);
          if (cube.has(position) && (neighbours == 2 || neighbours == 3)) {
            newCube.add(position)
          } else if (!cube.has(position) && neighbours == 3) {
            newCube.add(position)
          }
        }
      }
    }
  }
}

function countNeighbours(cube, x, y, z, w): number {
  let count = 0;

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      for (let zOffset = -1; zOffset <= 1; zOffset++) {
        for (let wOffset = -1; wOffset <= 1; wOffset++) {
          if (!(wOffset === xOffset && xOffset === yOffset && yOffset === zOffset && xOffset === 0)) {
            if (cube.has([x + xOffset, y + yOffset, z + zOffset, w + wOffset].toString())) count++;
          }
        }
      }
    }
  }

  return count;
}