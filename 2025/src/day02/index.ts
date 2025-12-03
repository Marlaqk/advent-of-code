import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const ranges = parseInput(rawInput).split(",");

  let sum = 0;
  for (let range of ranges) {
    const [from, to] = range.split("-").map(Number);

    for (let i = from; i <= to; i++) {
      const s = String(i);
      const half = Math.floor(s.length / 2);
      if (s.length % 2 == 1) continue;
      let isInvalid = false;
      for (let j = 0; j < half; j++) {
        if (s[j] != s[j + half]) {
          isInvalid = true;
        }
      }
      if (!isInvalid) {
        sum += i;
      }
    }
  }

  return sum;
};

function isValidId(id) {
  const idStr = String(id);

  if (idStr.length <= 1) {
    return true;
  }

  // Check for repeated patterns of different lengths
  // We only need to check up to half the string length
  for (let patternLength = 1; patternLength <= Math.floor(idStr.length / 2); patternLength++) {
    const pattern = idStr.substring(0, patternLength);

    if (isRepeatedPattern(idStr, pattern)) {
      return false;
    }
  }
  return true;
}

function isRepeatedPattern(str, pattern) {
  // The string length must be divisible by pattern length
  if (str.length % pattern.length !== 0) {
    return false;
  }

  // Check if repeating the pattern creates the original string
  const repetitions = str.length / pattern.length;

  if (repetitions < 2) {
    return false;
  }

  const repeatedPattern = pattern.repeat(repetitions);
  return str === repeatedPattern;
}

const part2 = (rawInput: string) => {
  const ranges = parseInput(rawInput).split(",");

  let sum = 0;
  for (let range of ranges) {

    const [from, to] = range.split("-").map(Number);

    for (let i = from; i <= to; i++) {
      if (!isValidId(i)) {
        sum += i;
      }
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
