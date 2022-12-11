const utils = require('../utils');

const EGGNOG = 150;
const CONTAINERS = utils.getIntInput();

function subsetSum(numbers, target, partial = [], combinations = []) {
  let partialSum = utils.sum(partial);
  if (partialSum == target) {
    combinations.push(partial);
    return;
  }

  if (partialSum > target) {
    return;
  }

  for (let i = 0; i < numbers.length; i++) {
    let n = numbers[i];
    let = remaining = numbers.slice(i + 1);
    subsetSum(remaining, target, partial.concat([n]), combinations);
  }
  return combinations;
}

console.log(subsetSum(CONTAINERS, EGGNOG).length)