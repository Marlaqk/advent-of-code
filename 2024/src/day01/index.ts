import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const list1: number[] = [];
  const list2: number[] = [];
  parseInput(rawInput).split('\n').map(line => {
    const [a, b] = line.split('   ');
    list1.push(Number(a));
    list2.push(Number(b));
  });

  list1.sort();
  list2.sort();

  let diffs = 0;
  for(let i = 0; i < list1.length; i++) {
    diffs += Math.abs(list1[i] - list2[i]);
  }

  return diffs;
};

const part2 = (rawInput: string) => {
  const list1: number[] = [];
  const apperances: Map<number,number> = new Map();
  parseInput(rawInput).split('\n').map(line => {
    const [a, b] = line.split('   ').map(Number);
    list1.push(a);
    apperances.set(b, (apperances.get(b) ?? 0) + 1)
  });

  return list1.reduce((pv, v) => {
    return pv + v * (apperances.get(v) ?? 0)
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
