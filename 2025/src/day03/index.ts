import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  return parseInput(rawInput).split('\n').reduce((pv, line) => {
    const nums = line.split('').map(Number);

    let a = 0, b = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > a && i < nums.length - 1) {
        a = nums[i];
        b = nums[i+1];
      } else if (nums[i] > b) {
        b = nums[i];
      }
    }

    return pv + Number(String(a)+String(b));
  }, 0)
};

const part2 = (rawInput: string) => {
  return parseInput(rawInput).split('\n').reduce((pv, line) => {
    const nums = line.split('').map(Number);

    const batteryIndex = [];
    while (batteryIndex.length < 12) {
      const from = batteryIndex.length ? batteryIndex.at(-1)! + 1 : 0;
      const to = nums.length - (12 - batteryIndex.length) + 1;

      let index = from;
      for (let i = from; i < to; i++) {
        if (nums[i]! > nums[index]!) {
          index = i;
        }
      }
      batteryIndex.push(index);
    }

    return pv + Number(batteryIndex.map((i) => nums[i]).join(""));
  }, 0)
};

run({
  part1: {
    tests: [
      {
        input: `
        987654321111111
811111111111119
234234234234278
818181911112111
        `,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        987654321111111
811111111111119
234234234234278
818181911112111
        `,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
