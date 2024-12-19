import run from "aoc-automation";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const searchNum = Number(parseInput(rawInput));

  let odd = 1;
  let highestNumLevel = 1;
  let count = 0;
  while (highestNumLevel <= searchNum) {
    odd += 2;
    count++;
    // console.log(odd)
    highestNumLevel = odd * odd;
    // console.log(highestNumLevel)
  }
  const smallerOdd = odd - 2;
  let start = highestNumLevel
  let dist = count;
  while(start > searchNum) {
    if (dist < -count) {
      dist = count;
    }
    start--;
    dist--
  }
  // console.log(count, searchNum - square, ((odd - 1)/ 2), (searchNum - ((odd - 1)/ 2)) % count)
  console.log(count, dist)
  return count + Math.abs(dist)
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
};

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: `23`,
        expected: 2,
      },
      {
        input: `1024`,
        expected: 31,
      },
      {
        input: `12`,
        expected: 3,
      },
      {
        input: `25`,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
});


// 1
// 8
// 16
// 27