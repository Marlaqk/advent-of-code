import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {

  const splitter = new Set<string>();
  const lines = parseInput(rawInput).split('\n');
  let beams = [];
  for (let x = 0; x < lines.length; x++) {
    for (let y = 0; y < lines[0].length; y++) {
      if (lines[x][y] == '^') {
        splitter.add(`${x}_${y}`);
      } else if (lines[x][y] == 'S') {
        beams.push(y)
      }
    }
  }


  const collisions = new Set();
  for (let lvl = 1; lvl < lines.length; lvl++) {
    let newBeams = new Set();
    let beam = beams.shift();
    while (beam) {
      if (splitter.has(`${lvl}_${beam}`) && !collisions.has(`${lvl}_${beam}`)) {
        collisions.add(`${lvl}_${beam}`)
        newBeams.add(beam - 1)
        newBeams.add(beam + 1)
      } else {
        newBeams.add(beam)
      }
      beam = beams.shift();
    }
    beams = Array.from(newBeams);
  }

  return collisions.size;
};

const part2 = (rawInput: string) => {
  const splitter = new Set<string>();
  const lines = parseInput(rawInput).split('\n');
  let beams = new Map<string, number>();
  let sY = 0;
  for (let x = 0; x < lines.length; x++) {
    for (let y = 0; y < lines[0].length; y++) {
      if (lines[x][y] == '^') {
        splitter.add(`${y}_${x}`);
      } else if (lines[x][y] == 'S') {
        beams.set(`${y}_${x}`, 1)
        sY = y;
      }
    }
  }

  for (let y = 1; y < lines.length; y++) {
    const newBeams = new Map<string, number>();

    for (const [positionKey, timelineCount] of beams.entries()) {
      const [positionKeyX] = positionKey.split("_");
      if (positionKeyX === undefined) {
        continue;
      }

      const x = Number.parseInt(positionKeyX, 10);
      if (splitter.has(positionKey)) {
          const leftKey = `${x - 1}_${y}`;
          newBeams.set(leftKey, (newBeams.get(leftKey) ?? 0) + timelineCount);
          const rightKey = `${x + 1}_${y}`;
          newBeams.set(rightKey, (newBeams.get(rightKey) ?? 0) + timelineCount);
      } else {
        const downKey = `${x}_${y}`;
        newBeams.set(downKey, (newBeams.get(downKey) ?? 0) + timelineCount);
      }
    }

    beams = newBeams;
    if (beams.size === 0) {
      break;
    }
  }

  let totalTimelines = 0;
  for (const count of beams.values()) {
    totalTimelines += count;
  }

  return totalTimelines;
};

run({
  part1: {
    tests: [
      {
        input: `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
        `,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
        `,
        expected: 40,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
