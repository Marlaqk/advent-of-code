import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const [ranges, ingredients] = parseInput(rawInput).split('\n\n');

  const freshProduce = new Map<number, number>();
  ranges.split('\n').forEach(r => {
    const [from, to] = r.split('-').map(Number);
    if (freshProduce.has(from)) {
      freshProduce.set(from, Math.max(freshProduce.get(from), to))
    } else {
      freshProduce.set(from, to);
    }
  })

  const froms = Array.from(freshProduce.keys()).sort((a, b) => b - a);
  return ingredients.split('\n').map(Number).reduce((pv, c) => {

    let i = 0;
    while(i < froms.length && (froms[i] > c || freshProduce.get(froms[i]) < c)) {
      i++;

    }
    if (i < froms.length && freshProduce.get(froms[i]) >= c) {
      return pv + 1;
    }
    return pv
  }, 0)
};

const part2 = (rawInput: string) => {
  const [ranges, ingredients] = parseInput(rawInput).split('\n\n');

  const freshProduce = new Map<number, number>();
  ranges.split('\n').forEach(r => {
    const [from, to] = r.split('-').map(Number);
    if (freshProduce.has(from)) {
      freshProduce.set(from, Math.max(freshProduce.get(from), to))
    } else {
      freshProduce.set(from, to);
    }
  })

  const froms = Array.from(freshProduce.keys()).sort((a, b) => a -b);
  let end = 0;
  let sum = 0;
  for (let i = 0; i < froms.length; i++) {
    if (end >= froms[i]) {
      sum += Math.max(0, freshProduce.get(froms[i]) - end);
      end = Math.max(end, freshProduce.get(froms[i]))
    } else {
      sum += freshProduce.get(froms[i]) - froms[i] + 1;
      end = freshProduce.get(froms[i]);
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `
5-7
4-9

8
        `,
        expected: 1,
      },
      {
        input: `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
        `,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
5-10
4-9
10-12

8
        `,
        expected: 9,
      },
      {
        input: `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
        `,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
