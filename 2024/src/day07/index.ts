import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split('\n');

  return lines.reduce((sum, line) => {
    const [a, b] = [...line.split(': ')];
    const search = Number(a);
    const numbers = b.split(' ').map(Number);
    let calcs = numbers.splice(0, 1);
    for (let n of numbers) {
      let newCalcs = [];
      for (let c of calcs) {
        let plus = c + n;
        let mult = c * n;
        if (plus <= search) {
          newCalcs.push(plus);
        }
        if (mult <= search) {
          newCalcs.push(mult);
        }
      }
      calcs = newCalcs;
    }
    if (calcs.filter(v => v === search).length > 0) {
      return sum + search;
    }
    return sum;
  }, 0);
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput).split('\n');

  return lines.reduce((sum, line) => {
    const [a, b] = [...line.split(': ')];
    const search = Number(a);
    const numbers = b.split(' ').map(Number);
    let calcs = numbers.splice(0, 1);
    for (let n of numbers) {
      let newCalcs = [];
      for (let c of calcs) {
        let plus = c + n;
        let mult = c * n;
        let concat = Number(String(c) + String(n));
        if (plus <= search) {
          newCalcs.push(plus);
        }
        if (mult <= search) {
          newCalcs.push(mult);
        }        
        if (concat <= search) {
          newCalcs.push(concat);
        }
      }
      calcs = newCalcs;
    }
    if (calcs.filter(v => v === search).length > 0) {
      return sum + search;
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
