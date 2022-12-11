import { getInput } from "../utils";


const lines = getInput();

const calculation = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b
};

let sum = 0;
lines.forEach(line => {
  sum += evaluate(line.replace(/ /g, ''));
})
console.log(sum);


function evaluate(equation) {
  let lastTokenIdx;
  let num;
  
  if (equation.endsWith(')')) {
    lastTokenIdx = lastParenIdx(equation);
    const containedEquation = equation.slice(lastTokenIdx + 1, -1);
    num = evaluate(containedEquation);
  } else {
    lastTokenIdx = lastNumIdx(equation);
    num = Number(equation.slice(lastTokenIdx));
  }

  if (lastTokenIdx === 0)
    return num;

  const op = equation[lastTokenIdx - 1];
  const calculate = calculation[op];
  const remainingEquation = equation.slice(0, lastTokenIdx - 1);
  const subResult = evaluate(remainingEquation);
  return calculate(num, subResult);
};

function lastNumIdx(str) {
  for (let i = str.length - 1; i >= 0; i -= 1) {
    const char = str[i];
    if (char === '+' || char === '*')
      return i + 1;
  }
  return 0;
};

function lastParenIdx(str) {
  let open = 1;
  for (let i = str.length - 2; i >= 0; i -= 1) {
    const char = str[i];
    if (char === ')') {
      open += 1;
    } else if (char === '(') {
      open -= 1;
    }

    if (open === 0)
      return i;
  }
};