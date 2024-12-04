import run from "aocrunner";
import { match } from "assert";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const matches = input.match(/mul\(\d*,\d*\)/gm);
  return matches?.reduce((sum, m) => {
    const nums = m.match(/\d+/gm)?.map(Number);
    return sum += nums![0] * nums![1]
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const matches = input.match(/mul\(\d*,\d*\)|don\'t\(\)|do\(\)/gm);
  let enabled = true;
  return matches?.reduce((sum, m) => {
    if ("don't()" === m) {
      enabled = false;
    } else if("do()" === m) {
      enabled = true
    } else if (enabled) {
      const nums = m.match(/\d+/gm)?.map(Number);
      return sum += nums![0] * nums![1]
    }
    return sum;
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
