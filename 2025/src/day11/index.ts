import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const nodes = new Map<string, string[]>();
  parseInput(rawInput).split('\n').forEach(line => {
    const [from, connections] = line.split(': ');
    nodes.set(from, connections.split(' '))
  });

  function countPaths(node: string) {
    if (node == 'out')  return 1;
    if (!nodes.get(node)) return 0;

    return nodes.get(node).reduce((sum, n) => sum + countPaths(n) , 0);
  }

  return countPaths('you');
};

const part2 = (rawInput: string) => {
  const nodes = new Map<string, string[]>();
  parseInput(rawInput).split('\n').forEach(line => {
    const [from, connections] = line.split(': ');
    nodes.set(from, connections.split(' '))
  });

  const countPaths = memoize((node: string, dac: boolean, fft: boolean) => {
    if (node == 'out')  {
      return dac && fft ? 1 : 0;
    }

    if (node == 'fft') {
      fft = true;
    }

    if (node == 'dac') {
      dac = true;
    }

    return nodes.get(node).reduce((sum, n) => sum + countPaths(n, dac, fft) , 0);
  })

  function memoize(fn: Function) {
    const cache = {};
    return (...args) => {
      const stringArgs = JSON.stringify(args);
      const result = (cache[stringArgs] = typeof cache[stringArgs] === 'undefined' ? fn(...args) : cache[stringArgs]);
      return result;
    }
  }

  return countPaths('svr', false, false);
};

run({
  part1: {
    tests: [
      {
        input: `
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out
        `,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out
        `,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
