import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function calculateStones(stones: Map<number,number>): Map<number,number> {
  let newStones = new Map<number, number>();
  Array.from(stones.entries()).forEach(([key, count]) => {
    if (key === 0) {
      newStones.set(1, (newStones.get(1) || 0) + count);
    } else if (key.toString().length % 2 === 0) {
      const numberStr = String(key);
      const one = Number(numberStr.slice(0, numberStr.length / 2))
      const two = Number(numberStr.slice(numberStr.length / 2, numberStr.length))
      newStones.set(one, (newStones.get(one) || 0) + count);
      newStones.set(two, (newStones.get(two) || 0) + count);
    } else {
      const newKey = key * 2024;
      newStones.set(newKey, (newStones.get(newKey) || 0) + count);
    }
  })
  return newStones;
}

const part1 = (rawInput: string) => {
  let stones = new Map<number, number>();
  parseInput(rawInput).split(' ').map(Number).forEach(n => {
    stones.set(n, 1);
  });

  for (let i = 0; i < 25; i++) {
    stones = calculateStones(stones);
  }

  return Array.from(stones.values()).reduce((pv, v) => pv + v, 0);
};

const part2 = (rawInput: string) => {
  let stones = new Map<number, number>();
  parseInput(rawInput).split(' ').map(Number).forEach(n => {
    stones.set(n, 1);
  });

  for (let i = 0; i < 75; i++) {
    stones = calculateStones(stones);
  }

  return Array.from(stones.values()).reduce((pv, v) => pv + v, 0);
};

run({
  part1: {
    tests: [ 
      // {
      //   input: `0 1 10 99 999`,
      //   expected: 55312,
      // },
      {
        input: `125 17`,
        expected: 55312,
      },
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