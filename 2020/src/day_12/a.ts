import { getInput } from "../utils"

const commands = getInput();

let x = 0, y = 0;
let idxDirection = 0;
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
]

commands.forEach(command => {
  const move = command.substring(0, 1);
  const value = Number(command.slice(1));

  switch (move) {
    case 'N':
      y -= value;
      break;
    case 'S':
      y += value;
      break;
    case 'E':
      x += value;
      break;
    case 'W':
      x -= value;
      break;
    case 'L':
      idxDirection += 4 - value / 90;
      idxDirection %= 4;
      break;
    case 'R':
      idxDirection += value / 90;
      idxDirection %= 4;
      break;
    case 'F':
      y += directions[idxDirection][0] * value;
      x += directions[idxDirection][1] * value;
      break;
  }

});

console.log(Math.abs(x) + Math.abs(y))