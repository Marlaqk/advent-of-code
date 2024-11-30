import run from "aoc-automation";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const numbers = parseInput(rawInput).split('').map(Number);
  return numbers.reduce((pv, cv, cidx) => { 
    if (cidx + 1 < numbers.length) {
      return cv === numbers[cidx+1] ? pv + cv : pv;
    } else {
      return cv === numbers[0] ? pv + cv : pv;
    }
   }, 0)
};

const part2 = (rawInput: string) => {
  const numbers = parseInput(rawInput).split('').map(Number);
  const half = numbers.length / 2;
  return numbers.reduce((pv, cv, cidx) => { 
      return cv === numbers[(cidx+half) % numbers.length] ? pv + cv : pv;
   }, 0)
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
    tests: [
      {
        input: '12131415',
        expected: 4
      }
    ]
  },
  trimTestInputs: true,
});
