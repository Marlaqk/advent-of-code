const utils = require('../utils');

const findCombinations = (packages = [], currentCombination = [], maximumWeight = Infinity, maximumPackages = Infinity) => {
  const availablePackages = [...packages];
  const currentWeight = currentCombination.reduce((a, b) => a + b, 0);

  if (currentWeight === maximumWeight && currentCombination.length <= maximumPackages) {
    return [currentCombination];
  }

  let combinations = [];

  while (availablePackages.length) {
    const weight = availablePackages.shift();

    if (currentWeight + weight <= maximumWeight) {
      const nextCombination = [...currentCombination, weight];
      const otherCombinations = findCombinations([...availablePackages], nextCombination, maximumWeight, maximumPackages);

      otherCombinations.forEach((combination) => combinations.push(combination));
    }
  }

  return combinations;
};

const findSmallestGroupSize = (packages, maximumWeight) => {
  let weight = 0;
  let numberOfPackages = 0;

  for (let i = 0; i < packages.length; i++) {
    if (weight + packages[i] <= maximumWeight) {
      weight += packages[i];
      numberOfPackages++;
    }
  }

  return numberOfPackages;
};

const PACKAGES = utils.getIntInput();
const TOTAL_SUM = utils.sum(PACKAGES);
const GROUP_WEIGHT = TOTAL_SUM / 3;
const MAXIMUM_PACKAGES = findSmallestGroupSize(PACKAGES, GROUP_WEIGHT);

console.log(findCombinations(PACKAGES, [], GROUP_WEIGHT, MAXIMUM_PACKAGES)
  .map((group) => group.reduce((a, b) => a * b, 1))
  .sort((a, b) => a - b)[0]);