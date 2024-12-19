import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const machines = parseInput(rawInput).split('\n\n');

  let sum = 0;
  for (let machine of machines) {
    const [x0, y0, x1, y1, xf, yf] = machine.match(/\d+/gm)!.map(Number);

    let b = (y0 * xf - x0 * yf) / (y0 * x1 - x0 * y1);
    let a = (yf - y1 * b) / y0;
    if (b % 1 == 0 && a % 1 == 0) {
      sum += a * 3 + b;
    }
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const machines = parseInput(rawInput).split('\n\n');

  let sum = 0;
  for (let machine of machines) {
    let [x0, y0, x1, y1, xf, yf] = machine.match(/\d+/gm)!.map(Number);

    xf += 10000000000000;
    yf += 10000000000000;
    let b = (y0 * xf - x0 * yf) / (y0 * x1 - x0 * y1);
    let a = (yf - y1 * b) / y0;
    if (b % 1 == 0 && a % 1 == 0) {
      sum += a * 3 + b;
    }
  }
  
  return sum;
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
