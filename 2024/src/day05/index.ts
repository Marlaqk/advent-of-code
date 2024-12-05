import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;


const rules = new Map<string,string[]>();
const invalidLines: string[] = [];

const part1 = (rawInput: string) => {
  const [r, lines] = [...parseInput(rawInput).split('\n\n')];
  r.split('\n').forEach(c => {
    const [before, after] = [...c.split('|')];
    
    rules.set(before, [...(rules.get(before) ?? []), after]);
  })

  return lines.split('\n').reduce((sum, line) => {
    const numbers = line.split(',');
    const seen: string[] = [];
    for (let n of numbers) {
      if ((rules.get(n) ?? []).some(rule => seen.includes(rule))) {
        invalidLines.push(line);
        return sum;
      }
      seen.push(n);
    }
    return sum + Number(numbers[Math.floor((numbers.length - 1) / 2)]);
  }, 0);
};

const part2 = (rawInput: string) => {
  return invalidLines.reduce((sum, line) => {
    const numbers = line.split(',');
    const ordered = numbers.toSorted((a, b) => rules.get(a)?.includes(b) ? -1 : 1);
    return sum + Number(ordered[Math.floor((ordered.length - 1) / 2)]);
  }, 0);
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
