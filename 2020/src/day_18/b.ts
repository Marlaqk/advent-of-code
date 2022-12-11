import { getInput } from "../utils";

const lines = getInput();

let sum = 0;
lines.forEach(line => {
  sum += eval(additionPrioritize(line.replace(/ /g, '')));
})
console.log(sum);

function additionPrioritize (equation) {
  let leftPad = '';
  let rightPad = '';

  for (let ch of equation) {
    if (ch === '*') {
      leftPad += '(';
      rightPad += ')';
    }
  }

  const demotedMultiply = equation.split('*').join(')*(');
  return leftPad + demotedMultiply + rightPad;
};
