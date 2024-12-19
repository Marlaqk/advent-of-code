import { getInput, getRawInput } from "../utils";

let numbers = new Map();
const input = getRawInput().split(',').map((el, i) => {
  numbers.set(Number(el), i + 1);
  return { number: el, lastTurn: i+1 }
});

let lastNumber = 0;
for (let i = input.length + 1; i <= 30000000; i++) {
  if (!numbers.get(lastNumber)) {
    numbers.set(lastNumber, i);
    lastNumber = 0;
    continue;
  } 

  const lastSpokenTurn = numbers.get(lastNumber);
  numbers.set(lastNumber, i);
  lastNumber = i - lastSpokenTurn;
}

console.log([...numbers].find(([key, val]) => val == 30000000)[0]);