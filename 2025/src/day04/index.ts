import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function createGrid(rawInput: string) {
  const gridInput = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""));

  const grid = new Set<string>();
  for (let y = 0; y < gridInput.length; y++) {
    for (let x = 0; x < gridInput[y].length; x++) {
      if (gridInput[y][x] == "@") {
        grid.add(`${y}_${x}`);
      }
    }
  }
  return grid;
}

const part1 = (rawInput: string) => {
  const grid = createGrid(rawInput);

  let count = 0;
  grid.forEach((p) => {
    const [y_pos, x_pos] = p.split("_").map(Number);
    let neighbours = 0;
    for (let y = y_pos - 1; y <= y_pos + 1; y++) {
      for (let x = x_pos - 1; x <= x_pos + 1; x++) {
        if (x == x_pos && y == y_pos) continue;
        if (grid.has(`${y}_${x}`)) neighbours++;
      }
    }
    if (neighbours < 4) {
      count++;
    }
  });

  return count;
};

const part2 = (rawInput: string) => {
  const grid = createGrid(rawInput);

  let count = 0;
  let oldCount = -1;
  while (oldCount != count) {
    oldCount = count;
    grid.forEach((p) => {
      const [y_pos, x_pos] = p.split("_").map(Number);
      let neighbours = 0;
      for (let y = y_pos - 1; y <= y_pos + 1; y++) {
        for (let x = x_pos - 1; x <= x_pos + 1; x++) {
          if (x == x_pos && y == y_pos) continue;
          if (grid.has(`${y}_${x}`)) neighbours++;
        }
      }
      if (neighbours < 4) {
        count++;
        grid.delete(p);
      }
    });
  }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
        `,
        expected: 43,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
