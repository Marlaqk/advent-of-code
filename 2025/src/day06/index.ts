import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  
  let lines = [];
  let sum = 0;
  parseInput(rawInput).split('\n').forEach(line => {
    if (line[0] == '+' || line[0] == '*') {
      const ops = line.replace(/ /g, '').split('');
      for (let i = 0; i < ops.length; i++) {
        let lSum = 0;
        for (let l of lines) {
          if (ops[i] == '+') {
            lSum += l[i];
          } else {
            lSum = Math.max(lSum, 1) * l[i];
          }
        }
        sum += lSum;
      }
    }  else {
      lines.push(Array.from(line.matchAll(/\d+/gm)).map(a => Number(a[0])))
    }
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  
  let sum = 0;
  let numbers = [];
  let op = '';
  for (let i = input[0].length - 1; i >= 0; i--) {
    op = input[input.length - 1][i] ?? ' ';
    let n = '';
    for (let j = input.length - 2; j >= 0; j--) {
      n += input[j][i];
    }
    numbers.push(Number([...n].reverse().join("").trim()))
    if (op != ' ') {
      let lSum = 0
      for (let l of numbers) {
          if (op == '+') {
            lSum += l;
          } else {
            lSum = Math.max(lSum, 1) * l;
          }
        }
      sum += lSum;
      numbers = [];
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   + 
        `,
        expected: 4277556,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   + 
        `,
        expected: 3263827,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
