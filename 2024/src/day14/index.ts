import run from "aocrunner";
import { writeFileSync } from "fs";

const parseInput = (rawInput: string) => rawInput;

interface Robot {
  x: number,
  y: number,
  moveX: number,
  moveY: number,
}

const MAX_X = 101;
const MAX_Y = 103;

const part1 = (rawInput: string) => {
  let positions = new Map<string, Robot[]>();
  parseInput(rawInput).split('\n').forEach(line => {
    const [x, y, moveX, moveY] = line.match(/-?\d+/gm)!.map(Number);

    const key = `${y}-${x}`;
    positions.set(key, [...(positions.get(key) || []), { x, y, moveX, moveY }])
  });

  for (let turn = 0; turn < 100; turn++) {
    let newPositions = new Map<string, Robot[]>();

    positions.forEach((robots) => {
      robots.forEach((robot) => {
        let newX = (robot.x + robot.moveX) % MAX_X;
        newX = newX < 0 ? MAX_X + newX : newX;
        let newY = (robot.y + robot.moveY) % MAX_Y;
        newY = newY < 0 ? MAX_Y + newY : newY;
        const key = `${newY}-${newX}`;
        newPositions.set(key, [...(newPositions.get(key) || []), { x: newX, y: newY, moveX: robot.moveX, moveY: robot.moveY }])
      });
    })

    positions = newPositions;
  }

  return [{ xs: 0, xe: 51, ys: 0, ye: 50 }, { xs: 0, xe: 51, ys: 51, ye: 101 }, { xs: 52, xe: 103, ys: 0, ye: 50 }, { xs: 52, xe: 103, ys: 51, ye: 101 }].reduce((sum, q) => {
    let s = 0;
    for (let x = q.xs; x < q.xe; x++) {
      for (let y = q.ys; y < q.ye; y++) {
        s += positions.get(`${x}-${y}`)?.length || 0
      }
    }
    return sum * s;
  }, 1);
};

const part2 = (rawInput: string) => {
  let positions = new Map<string, Robot[]>();
  parseInput(rawInput).split('\n').forEach(line => {
    const [x, y, moveX, moveY] = line.match(/-?\d+/gm)!.map(Number);

    const key = `${y}-${x}`;
    positions.set(key, [...(positions.get(key) || []), { x, y, moveX, moveY }])
  });

  const scores = new Map<number, number>();
  for (let turn = 0; turn < 100_000; turn++) {
    let newPositions = new Map<string, Robot[]>();

    positions.forEach((robots) => {
      robots.forEach((robot) => {
        let newX = (robot.x + robot.moveX) % MAX_X;
        newX = newX < 0 ? MAX_X + newX : newX;
        let newY = (robot.y + robot.moveY) % MAX_Y;
        newY = newY < 0 ? MAX_Y + newY : newY;
        const key = `${newY}-${newX}`;
        newPositions.set(key, [...(newPositions.get(key) || []), { x: newX, y: newY, moveX: robot.moveX, moveY: robot.moveY }])
      });
    })

    positions = newPositions;

    let shouldPrint = false;
    let lines = 'Turn ' + turn;
    for (let y = 0; y < MAX_Y; y++) {
      let line = '';
      for (let x = 0; x < MAX_X; x++) {
        if (positions.get(`${y}-${x}`)) {
          line += '#';
        } else {
          line += '.'
        }
      }
      if (line.includes('###############################')) {
        shouldPrint = true;
      }
      lines += `\n${line}`

    }
    if (shouldPrint) {
      writeFileSync("src/day14/images.txt", lines, {
        flag: "a+"
      })
      return turn + 1;
    }
    scores.set(turn, positions.size);
  }

  return Infinity;
};

run({
  part1: {
    tests: [
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
