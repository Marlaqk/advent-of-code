import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");

  let sum = 0;
  for (let line of lines) {
    const input = Array.from(
      line.matchAll(/\[(.*?)\]|\((\d+(?:,\d+)*)\)/gm),
    ).map((v) => v[1] ?? v[2]);
    const targetState = input.shift();
    const buttons = input.map((v) => v.split(",").map(Number));

    const queue = [".".repeat(targetState.length)];
    const knownStates = new Map<string, number>();
    knownStates.set(queue[0], 0);
    while (queue.length > 0) {
      let state = queue.shift();

      if (state === targetState) {
        sum += knownStates.get(state);
        break;
      }

      for (let btn of buttons) {
        let toggled = state
          .split("")
          .map((y, i) => {
            if (btn.includes(i)) {
              return y === "#" ? "." : "#";
            } else {
              return y;
            }
          })
          .join("");

        if (!knownStates.has(toggled)) {
          knownStates.set(toggled, knownStates.get(state) + 1);
          queue.push(toggled);
        }
      }
    }
  }

  return sum;
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
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
        `,
        expected: 7,
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
