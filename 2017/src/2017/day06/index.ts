import run from "aoc-automation";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let blocks = parseInput(rawInput).split('\t').map(Number);
  const seen = new Set();
  
  let count = 0;
  while(count < 10000000) {
    const block_sig = blocks.join('-');
    if (seen.has(block_sig)) {
      return count;
    }
    seen.add(block_sig);

    // redistribute
    const maxIdx = blocks.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    let b = blocks[maxIdx];
    blocks[maxIdx] = 0;
    let s = maxIdx + 1;
    while (b > 0) {
      blocks[s % blocks.length]++;
      s++;
      b--;
    }
    count++;
  }
};

const part2 = (rawInput: string) => {
  let blocks = parseInput(rawInput).split('\t').map(Number);
  const seen = new Map();
  
  let count = 0;
  while(count < 10000000) {
    const block_sig = blocks.join('-');
    if (seen.has(block_sig)) {
      return count - seen.get(block_sig);
    }
    seen.set(block_sig, count);

    // redistribute
    const maxIdx = blocks.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    let b = blocks[maxIdx];
    blocks[maxIdx] = 0;
    let s = maxIdx + 1;
    while (b > 0) {
      blocks[s % blocks.length]++;
      s++;
      b--;
    }
    count++;
  }
};

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: "0\t2\t7\t0",
        expected: "5",
      },
    ],
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
});
