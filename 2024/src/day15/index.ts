import run from "aocrunner";
import { findPosition, getCharGrid } from "../grid.js";

const MOVES = {
  'v': (p: [number, number]) => [p[0] + 1, p[1]],
  '^': (p: [number, number]) => [p[0] - 1, p[1]],
  '>': (p: [number, number]) => [p[0], p[1] + 1],
  '<': (p: [number, number]) => [p[0], p[1] - 1],
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n\n');
  const grid = getCharGrid(input[0]);
  const moves = input[1].split('').filter(v => v != '\n');
  let robotPosition = findPosition(grid, '@');
  grid[robotPosition[0]][robotPosition[1]] = '.'

  console.log(MOVES[moves[0]](robotPosition));

  for (let move of moves) {
    let newPos = MOVES[move](robotPosition);
    if (grid[newPos[0]][newPos[1]] == '.') {
      robotPosition = newPos;
      continue;
    }
    if (grid[newPos[0]][newPos[1]] == 'O') {
      let boxToMove = newPos;
      while(grid[boxToMove[0]][boxToMove[1]] === 'O') {
        boxToMove = MOVES[move](boxToMove);
      }
      if (grid[boxToMove[0]][boxToMove[1]] === '.') {
        grid[newPos[0]][newPos[1]] = '.';
        grid[boxToMove[0]][boxToMove[1]] = 'O';
        robotPosition = newPos;
      }
    }
  }


  return grid.reduce((sum, line, idxX) => {
    return sum + line.reduce((s, pos, idxY) => {
      if (pos === 'O') {
        s += idxX * 100 + idxY;
      }
      return s;
    }, 0);
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        ##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
        expected: 10092,
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
