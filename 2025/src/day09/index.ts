import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const points = parseInput(rawInput).split('\n');

  let maxSize = 0;
  for (let pA of points) {
    for (let pB of points) {
      if (pA == pB) continue;

      const [pAx, pAy] = pA.split(',').map(Number);
      const [pBx, pBy] = pB.split(',').map(Number);
      const size = (Math.abs(pAx - pBx) + 1) * (Math.abs(pAy - pBy) + 1);

      if (size > maxSize) {
        maxSize = size;
      }
    }
  }

  return maxSize;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
        `,
        expected: 50,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [

    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
