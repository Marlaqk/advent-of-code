import { getInput } from "../utils";

const input = getInput();

let mask = '';
const memory = new Map();
for (let i = 0; i < input.length; i++) {
  const element = input[i];
  if (element.substring(0,4) == 'mask') {
    mask = element.substr(7);
  } else {
    handleMemory(element);
  }
}

function handleMemory(line) {
  const value = Number(line.substr(line.indexOf('= ') + 2));
  const result = applyMask(fill36(value.toString(2)), mask);

  const address = Number(line.substr(4, line.indexOf(']') - 4));
  
  memory.set(address, parseInt(result, 2));
}

console.log([...memory.values()].reduce((acc, curr) => acc + curr, 0))

function applyMask(binStr, mask) {
  let output = '';
  for (let i = 0; i < binStr.length; i++) {
    output += mask[i] === 'X' ? binStr[i] : mask[i];
  }
  return output;
}

function fill36(value) {
  let newVal = value;
  for (let i = 0; i < (36 - value.length); i++) {
    newVal = '0' + newVal;
  }
  return newVal;
}