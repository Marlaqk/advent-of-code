import { getInput } from "../utils"

const commands = getInput();

let x = 0, y = 0;
let wayPointX = 10, wayPointY = -1;
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
      wayPointY -= value;
      break;
    case 'S':
      wayPointY += value;
      break;
    case 'E':
      wayPointX += value;
      break;
    case 'W':
      wayPointX -= value;
      break;
    case 'L':
    case 'R':
      const tmp = wayPointX;
      const leftRotation = move === 'L' ? value : 360 - value;
      if (leftRotation === 180) {
        wayPointX = -wayPointX;
        wayPointY = -wayPointY;
      } else if (leftRotation === 90) {
        wayPointX = wayPointY;
        wayPointY = -tmp;
      } else if (leftRotation === 270) {
        wayPointX = -wayPointY;
        wayPointY = tmp;
      }
      break;
    case 'F':
      y += wayPointY * value;
      x += wayPointX * value;
      break;
  }

});

console.log(Math.abs(x) + Math.abs(y))