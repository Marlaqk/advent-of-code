import run from "aocrunner";
import { getNumberGrid } from "../grid.js";

const parseInput = (rawInput: string) => rawInput;

const MOVES = [[-1, 0], [0, 1], [1, 0], [0, -1]];

interface TrailHead {
  row: number;
  col: number;
  score: number;
  visited: string[];
};

const part1 = (rawInput: string) => {
  const grid = getNumberGrid(rawInput);

  const ROWS = grid.length;
  const COLS = grid[0].length;

  const traisHeads: TrailHead[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 0) {
        traisHeads.push({ row, col, score: 0, visited: [] })
      }
    }
  }

  const climb = (trailHead: TrailHead, row: number, col: number) => {
    trailHead.visited.push(`${row}-${col}`);
    const currentValue = grid[row][col];

    if (currentValue === 9) {
      trailHead.score++;
      return;
    }

    Array.from(MOVES.values()).forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;

      if (!trailHead.visited.includes(`${newRow}-${newCol}`) &&
        newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS &&
        grid[newRow][newCol] - currentValue === 1) {
        climb(trailHead, newRow, newCol);
      }
    });
  }

  let score = 0;
  traisHeads.forEach((trailHead) => {
    climb(trailHead, trailHead.row, trailHead.col);
    score += trailHead.score;
  })

  return score;
};

const part2 = (rawInput: string) => {
  const grid = getNumberGrid(rawInput);

  const ROWS = grid.length;
  const COLS = grid[0].length;

  const traisHeads: TrailHead[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 0) {
        traisHeads.push({ row, col, score: 0, visited: [] })
      }
    }
  }

  const climb = (trailHead: TrailHead, row: number, col: number) => {
    trailHead.visited.push(`${row}-${col}`);
    const currentValue = grid[row][col];

    if (currentValue === 9) {
      trailHead.score++;
      return;
    }

    Array.from(MOVES.values()).forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;

      if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS &&
        grid[newRow][newCol] - currentValue === 1) {
        climb(trailHead, newRow, newCol);
      }
    });
  }

  let score = 0;
  traisHeads.forEach((trailHead) => {
    climb(trailHead, trailHead.row, trailHead.col);
    score += trailHead.score;
  })

  return score;
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
