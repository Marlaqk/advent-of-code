import run from "aoc-automation";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const allChildren = new Set();
  const allKeys = new Set();

  parseInput(rawInput)
    .split("\n")
    .map((row) => {
      const [k, c] = row.split(" -> ");
      const [key, w] = k.split(" (");
      const o = {
        key,
        weight: Number(w.substring(0, w.length - 1)),
        children: c ? new Set(c.split(", ")) : new Set(),
      };
      allKeys.add(key);
      o.children.forEach(allChildren.add, allChildren);
      return o;
    });

  return [...allKeys.values()].filter((x) => !allChildren.has(x))[0];
};

const part2 = (rawInput: string) => {
  const topNode = part1(rawInput);
  const nodes = new Map();
  parseInput(rawInput)
    .split("\n")
    .forEach((row) => {
      const [k, c] = row.split(" -> ");
      const [key, w] = k.split(" (");
      const o = {
        childWeight: 0,
        weight: Number(w.substring(0, w.length - 1)),
        children: c ? c.split(", ") : [],
      };
      nodes.set(key, o);
    });

  function calculateWeight(n: string) {
    if (nodes.get(n).children.length == 0) {
      return nodes.get(n).weight;
    } else {
      nodes.get(n).childWeight = nodes
        .get(n)
        .children.reduce((acc, c) => acc + calculateWeight(c), 0);
    }
    return nodes.get(n).weight + nodes.get(n).childWeight;
  }

  function findUnique(arr) {
    const [a, b, c] = arr;
    const majority = a === b || a === c ? a : b;
    return arr.indexOf(arr.find((x) => x !== majority));
  }

  calculateWeight(topNode);

  let expectedWeight;
  let startNode = nodes.get(topNode);
  while (startNode) {
    const sums = startNode.children.map(
      (c) => nodes.get(c).childWeight + nodes.get(c).weight,
    );
    const idx = findUnique(sums);
    if (idx >= 0) {
      expectedWeight = sums[(idx + 1) % sums.length];
      startNode = nodes.get(startNode.children[idx]);
    } else {
      return expectedWeight - startNode.childWeight;
    }
  }
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
