import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isDecreasing = (a: number, b: number) => {
  const c = a - b;
  return c >= 1 && c <= 3;
}

const isIncreasing = (a: number, b: number) => {
  const c = b - a;
  return c >= 1 && c <= 3;
}


const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split('\n');

  return lines.reduce((count, line) => {
    const numbers = line.split(' ').map(Number);
    const fn = numbers[0] > numbers[1] ? isDecreasing : isIncreasing;
    
    for(let i = 0; i < numbers.length - 1; i++) {
      if (!fn(numbers[i], numbers[i+1])) return count;
    }

    return count + 1;
  }, 0);
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput).split('\n');

  return lines.reduce((count, line) => {
    const numbers = line.split(' ').map(Number);

    const configurations = [numbers];
    for(let i = 0; i < numbers.length; i++) {
      const copy = [...numbers];
      copy.splice(i, 1)
      configurations.push(copy);
    }

    for(let conf of configurations) {
      const fn = conf[0] > conf[1] ? isDecreasing : isIncreasing;
    
      let invalid = false;
      for(let i = 0; i < conf.length - 1; i++) {
        if (!fn(conf[i], conf[i+1])) {
          invalid = true;
          break;
        } 
      }

      if (invalid) continue;
  
      return count + 1;
    }

    return count;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
          7 6 4 2 1
          1 2 7 8 9
          9 7 6 2 1
          1 3 2 4 5
          8 6 4 4 1
          1 3 6 7 9
        `,
        expected: "2",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          7 6 4 2 1
          1 2 7 8 9
          9 7 6 2 1
          1 3 2 4 5
          8 6 4 4 1
          1 3 6 7 9
        `,
        expected: "4",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
