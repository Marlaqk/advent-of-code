import { getInput } from "../utils";

const input = getInput();

let mask = '';
const memory = new Map();
for (let i = 0; i < input.length; i++) {
  const element = input[i];
  if (element.substring(0, 4) == 'mask') {
    mask = element.substr(7);
  } else {
    handleMemory(element);
  }
}

function handleMemory(line) {
  const value = Number(line.substr(line.indexOf('= ') + 2));
  const address = Number(line.substr(4, line.indexOf(']') - 4));

  const addresses = applyMask(fill36(address.toString(2)), mask);
  addresses.forEach(adr => memory.set(parseInt(adr,2), value));
}

console.log([...memory.values()].reduce((acc, curr) => acc + curr, 0))

function applyMask(binStr, mask) {
  let output = '';
  for (let i = 0; i < binStr.length; i++) {
    output += mask[i] === '0' ? binStr[i] : mask[i];
  }

  let addresses = [''];
  [...output].forEach(char => {
    if (char !== 'X') {
      addresses = addresses.map(adr => adr + char);
    } else {
      const zeroAdrs = addresses.map(adr => adr + '0');
      const oneAdrs = addresses.map(adr => adr + '1');
      addresses = [...zeroAdrs, ...oneAdrs];
    }
  })

  return addresses;
}

function fill36(value) {
  let newVal = value;
  for (let i = 0; i < (36 - value.length); i++) {
    newVal = '0' + newVal;
  }
  return newVal;
}