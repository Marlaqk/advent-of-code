import run from "aoc-automation";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  return rawInput.split('\n').reduce((pv, line) => {
    const numbers = line.split('\t').map(Number);
    return pv + Math.max(...numbers) - Math.min(...numbers);

  }, 0);
};

const part2 = (rawInput: string) => {
  return rawInput.split('\n').reduce((pv, line) => {
    const numbers = line.split('\t').map(Number);
    const divisibles = numbers.reduce((acc: number[], val) => {
      const divisibles = numbers.filter(v => val !== v && val % v === 0).map(v => val / v);
      return [...acc, ...divisibles];
    }, []);
    return pv + divisibles[0];
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
    tests: [
      {
        input: "5\t9\t2\t8",
        expected: 4
      }
    ]
  },
  trimTestInputs: true,
});
