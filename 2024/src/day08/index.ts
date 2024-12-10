import run from "aocrunner";
import { getCharGrid } from "../grid.js";


const part1 = (rawInput: string) => {
  const grid = getCharGrid(rawInput);

  const maxY = grid.length;
  const maxX = grid[0].length;

  const antennas = new Map<string, number[][]>();
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== '.') {
        antennas.set(grid[y][x], [...(antennas.get(grid[y][x]) || []), [y, x]])
      }
    }
  }

  const antinodes = new Set<string>();
  Array.from(antennas.keys()).forEach(key => {
    const antennasWithKey = antennas.get(key) || [];
    antennasWithKey.reduce((pv, v, idx) => {
      let r = 0;
      for (let i = idx + 1; i < antennasWithKey.length; i++) {
        const dist = [v[0] - antennasWithKey[i][0], v[1] - antennasWithKey[i][1]];
        const nDist = dist.map(c => c * -1);

        const antiNodeOne = dist.map((a, c) => a + v[c]);
        const antiNodeTwo = nDist.map((a, c) => a + antennasWithKey[i][c]);
        [antiNodeOne, antiNodeTwo].filter(v => v[0] >= 0 && v[0] < maxY && v[1] >= 0 && v[1] < maxX).forEach(n => {
          antinodes.add(n.map(String).join('-'));
        });
      }
      return pv;
    }, 0);
  }, 0);

  return antinodes.size;
};

const part2 = (rawInput: string) => {
  const grid = getCharGrid(rawInput);

  const maxY = grid.length;
  const maxX = grid[0].length;

  const antennas = new Map<string, number[][]>();
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== '.') {
        antennas.set(grid[y][x], [...(antennas.get(grid[y][x]) || []), [y, x]])
      }
    }
  }

  const antinodes = new Set<string>();
  Array.from(antennas.keys()).forEach(key => {
    const antennasWithKey = antennas.get(key) || [];
    antennasWithKey.reduce((pv, v, idx) => {
      for (let i = idx + 1; i < antennasWithKey.length; i++) {
        const dist = [v[0] - antennasWithKey[i][0], v[1] - antennasWithKey[i][1]];
        const nDist = dist.map(c => c * -1);

        const newAntinodes: number[][] = [v, antennasWithKey[i]];
        let newN = dist.map((a, c) => a + v[c]);
        while (newN[0] >= 0 && newN[0] < maxY && newN[1] >= 0 && newN[1] < maxX) {
          newAntinodes.push(newN);
          newN = dist.map((a, c) => a + newN[c]);
        }
        newN = nDist.map((a, c) => a + antennasWithKey[i][c]);
        while (newN[0] >= 0 && newN[0] < maxY && newN[1] >= 0 && newN[1] < maxX) {
          newAntinodes.push(newN);
          newN = nDist.map((a, c) => a + newN[c]);
        }

        newAntinodes.forEach(n => {
          antinodes.add(n.map(String).join('-'));
        });
        pv += newAntinodes.length;
      }
      return pv;
    }, 0);
  });

  return antinodes.size;
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
