import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n\n');
  const presentSize = input.splice(0, 6).map(l => l.split('').filter(c => c == '#').length);

  let sum = 0;
  for (let line of input[0].split('\n')) {
    const [square, p] = line.split(': ');
    const [x, y] = square.split('x').map(Number);
    const squareSize = x * y;

    const pC = p.split(' ').map(Number);
    const totalPc = pC.reduce((pv, c) => pv += c * 9, 0);

    if (totalPc > squareSize) continue;

    sum++;
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
