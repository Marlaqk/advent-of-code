import run from "aoc-automation";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const regs = new Map<string,number>();

  function getRegistry(key: string) {
    const reg = regs.get(key);
    if (!reg) {
      regs.set(key, 0);
      return 0;
    }
    return reg;
  }

  function checkCondition(cond: string, condA: string, condB: string) {
    switch (cond) {
      case '>':
        return getRegistry(condA) > Number(condB);
      case '<':
        return getRegistry(condA) < Number(condB);
      case '<=':
        return getRegistry(condA) <= Number(condB);
      case '>=':
        return getRegistry(condA) >= Number(condB);
      case '==':
        return getRegistry(condA) == Number(condB);
      case '!=':
        return getRegistry(condA) != Number(condB);
    }
  }

  parseInput(rawInput).split('\n').forEach(line => {
    const [reg, instruction, instructionValue, _, condA, cond, condB] = line.split(' ');

    if (checkCondition(cond, condA, condB)) {
      if (instruction == 'inc') {
        regs.set(reg, getRegistry(reg) + Number(instructionValue));
      } else {
        regs.set(reg, getRegistry(reg) - Number(instructionValue));
      }
    }
  });

  return Math.max(...regs.values())
};

const part2 = (rawInput: string) => {
  const regs = new Map<string,number>();

  function getRegistry(key: string) {
    const reg = regs.get(key);
    if (!reg) {
      regs.set(key, 0);
      return 0;
    }
    return reg;
  }

  function checkCondition(cond: string, condA: string, condB: string) {
    switch (cond) {
      case '>':
        return getRegistry(condA) > Number(condB);
      case '<':
        return getRegistry(condA) < Number(condB);
      case '<=':
        return getRegistry(condA) <= Number(condB);
      case '>=':
        return getRegistry(condA) >= Number(condB);
      case '==':
        return getRegistry(condA) == Number(condB);
      case '!=':
        return getRegistry(condA) != Number(condB);
    }
  }

  let max = 0;
  parseInput(rawInput).split('\n').forEach(line => {
    const [reg, instruction, instructionValue, _, condA, cond, condB] = line.split(' ');

    if (checkCondition(cond, condA, condB)) {
      if (instruction == 'inc') {
        const newValue = getRegistry(reg) + Number(instructionValue);
        regs.set(reg, newValue);
        if (newValue > max) {
          max = newValue;
        }
      } else {
        regs.set(reg, getRegistry(reg) - Number(instructionValue));
      }
    }
  });

  return max;
};

run({
  onlyTests: false,
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
    solution: part2,
  },
  trimTestInputs: true,
});
