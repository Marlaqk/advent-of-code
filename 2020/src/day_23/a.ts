import { getRawInput } from "../utils";

let cups: number[] = getRawInput().split('').map((cup) => parseInt(cup, 10));

let max = cups.reduce((max, cur) => Math.max(max, cur), -1);
let min = cups.reduce((min, cur) => Math.min(min, cur), max);

let turns = 100;
for (let i = 1; i <= turns; i++) {
  let current = cups.shift();
  let pickedCups = cups.splice(0, 3);
  let destinationValue = current - 1;
  let placement;
  while ((placement = cups.indexOf(destinationValue)) == -1) {
    destinationValue--;
    if (destinationValue < min) {
      destinationValue = max;
    }
  }
  // @ts-ignore
  cups.splice.apply(cups, [placement + 1, 0].concat(pickedCups));
  cups.push(current);
}

while(cups[0] != 1) {
  cups.push(cups.shift());
}

console.log(`Label: ${cups.slice(1).join('')}`)