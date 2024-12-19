import run from "aoc-automation";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split('\n');
  return lines.reduce((pv: number, line) => {
    const words = line.split(' ');
    return words.length === [...new Set(words)].length ? pv + 1 : pv;
  }, 0);
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput).split('\n');
  return lines.reduce((pv: number, line) => {
    const words = line.split(' ').map(w => w.split('').sort().join(''));
    return words.length === [...new Set(words)].length ? pv + 1 : pv;
  }, 0);
};

run({
  onlyTests: false,
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
    solution: part2,
  },
  trimTestInputs: true,
});
