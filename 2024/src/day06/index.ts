import run from "aocrunner";
import { extractFromGrid, findPosition, getCharGrid, getValue, newPosition, printGrid } from "../grid.js";

const parseInput = (rawInput: string) => rawInput;

enum DIRECTION {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

const MOVES = new Map<DIRECTION, number[]>([
  [DIRECTION.UP, [-1, 0]],
  [DIRECTION.RIGHT, [0, 1]],
  [DIRECTION.DOWN, [1, 0]],
  [DIRECTION.LEFT, [0, -1]],
])


const part1 = (rawInput: string) => {
  const grid = getCharGrid(parseInput(rawInput));
  const walked = structuredClone(grid);
  let position = findPosition(grid, '^');
  grid[position[0]][position[1]] = '.'
  console.log(position)
  let seen = new Set<string>();
  seen.add(position.map(String).join('-'))
  let newPos;
  let direction = DIRECTION.UP;
  while (newPos = newPosition(position, MOVES.get(direction)!)) {
    const v = getValue(grid, newPos);
    if (!v) break;
    if (v === '.') {
      seen.add(newPos.map(String).join('-'));
      walked[newPos[0]][newPos[1]] = 'X'
      // console.log(newPos)
      position = newPos;
    } else if (v === '#') {
      direction = (direction + 1) % 4
    }
  }

  printGrid(walked)
  return seen.size;
};

const part2 = (rawInput: string) => {
  const grid = getCharGrid(parseInput(rawInput));
  const walked = structuredClone(grid);
  let position = findPosition(grid, '^');
  grid[position[0]][position[1]] = '.'
  console.log(position)
  let seen = new Set<string>();
  seen.add(position.map(String).join('-'))
  let newPos;
  let direction = DIRECTION.UP;
  while (newPos = newPosition(position, MOVES.get(direction)!)) {
    const v = getValue(grid, newPos);
    if (!v) break;
    if (v === '.') {
      seen.add(newPos.map(String).join('-'));
      grid[newPos[0]][newPos[1]] = 'X'
      // console.log(newPos)
      position = newPos;
    } else if (v === '#') {
      direction = (direction + 1) % 4
    } else if (v === 'X') {
      console.log('seen');
    }
  }

  printGrid(walked)
  return seen.size;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
