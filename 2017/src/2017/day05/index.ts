import run from "aoc-automation";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split('\n');
  const numbers = [];
  for (let i = 0; i < lines.length; i++) {
    numbers.push(Number(lines[i].match(/(-?\d+)/)![0]))
  }
  let node = 0;
  let steps = 0;
  while (true) {
    steps++;
    let nextNode = node + numbers[node];
    numbers[node]++;
    if (nextNode < 0 || nextNode >= numbers.length) {
      return steps;
    }
    node = nextNode;
  }
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput).split('\n');
  const numbers = [];
  for (let i = 0; i < lines.length; i++) {
    numbers.push(Number(lines[i].match(/(-?\d+)/)![0]))
  }
  let node = 0;
  let steps = 0;
  while (true) {
    steps++;
    let nextNode = node + numbers[node];
    if (nextNode < 0 || nextNode >= numbers.length) {
      return steps;
    }
    if (numbers[node] >= 3) {
      numbers[node]--;
    } else {
      numbers[node]++;
    }
    node = nextNode;
  }
};

run({
  onlyTests: false,
  part1: {
    tests: [
      // {
      //   input: `(-1)`,
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
