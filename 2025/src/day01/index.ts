import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let pointingAtZero = 0;
  parseInput(rawInput).split('\n').reduce((pv, line) => {
    const steps = Number(line.substring(1)) % 100;
    let newPos;
    if (line[0] == 'L') {
      let n  = pv - steps;
      if (n < 0) {
        newPos = 100 + n
      } else {
        newPos = n;
      }
    } else {
      newPos = (pv + steps) % 100;
    }
    if (newPos == 0) {
      pointingAtZero++;
    }
    return newPos;
  }, 50);

  return pointingAtZero;
};

const part2 = (rawInput: string) => {
  let totalEndedZeros = 0;
  let totalPassedZeros = 0;

  let current = 50;
  for (let m of rawInput.split('\n')) {

    let distance = Number(m.substring(1));
    // remove full rotations
    let passedZeros = Math.floor(distance / 100);
    distance = Number(m.substring(1)) % 100;

    let previous = current;
    // Get the current position after the move is made
    current += m[0] === "R" ? distance : distance * -1;
    // Correct for a too high position value
    if (current > 99) {
      current = current - 100;
      // If this value ends at 0 then do not count it as a passed 0.
      // Also, if it started at 0 then this may need a correction but will never pass 0.
      if (current != 0 && previous != 0) passedZeros += 1;
    } else if (current < 0) {
      current = current + 100;
      // If this value ends at 0 then do not count it as a passed 0.
      // Also, if it started at 0 then this may need a correction but will never pass 0.
      if (current != 0 && previous != 0) passedZeros += 1;
    }
    if (current === 0) totalEndedZeros += 1;
    totalPassedZeros += passedZeros;
  }

  return totalEndedZeros + totalPassedZeros;
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
