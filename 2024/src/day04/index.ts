import run from "aocrunner";
import { extractFromGrid, getCharGrid } from "../grid.js";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const grid = getCharGrid( parseInput(rawInput));

  const wordStarts: number[][] = [];
  grid.forEach((v, y) => {
    v.forEach((c, x) => {
      if (c == 'X') wordStarts.push([y,x]);
    });
  })

  const blibla = [
    [[0,1],[0,2],[0,3]],
    [[1,0],[2,0],[3,0]],
    [[0,-1],[0,-2],[0,-3]],
    [[-1,0],[-2,0],[-3,0]],
    [[1,1],[2,2],[3,3]],
    [[-1,-1],[-2,-2],[-3,-3]],
    [[1,-1],[2,-2],[3,-3]],
    [[-1,1],[-2,2],[-3,3]],
  ];

  return wordStarts.reduce((count, start) => {
    let c = 0;
    for(let changes of blibla) {
      let w = 'X';
      for(let step of changes) {
        w += extractFromGrid(grid, start, step) ?? '';
      }
      if (w === 'XMAS') {
        c++;
      }
    }
    return count + c;
  }, 0);
};

const part2 = (rawInput: string) => {
  const grid = getCharGrid( parseInput(rawInput));

  const wordStarts: number[][] = [];
  grid.forEach((v, y) => {
    v.forEach((c, x) => {
      if (c == 'A') wordStarts.push([y,x]);
    });
  })

  const blibla = [
    [-1,1],[1,1],[1,-1],[-1,-1]
  ];

  return wordStarts.reduce((count, start) => {
    let w = '';
    for(let change of blibla) {
      w += extractFromGrid(grid, start, change) ?? '';
    }
    if (w != 'SMSM' && w != 'MSMS' && w.match(/S/g)?.length === 2 && w.match(/M/g)?.length == 2) {
      console.log(w)
      return count + 1;
    }
    return count;
  }, 0);
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
