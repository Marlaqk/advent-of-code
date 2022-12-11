const containStraightIncreasingSymbols = string => string.split('').map(char => char.charCodeAt(0)).some((char, index, arr) => arr[index] === arr[index + 1] - 1 && arr[index + 1] === arr[index + 2] - 1);
const containRestrictedSymbols = string => /i|o|l/.test(string);
const containsPairs = string => /(\w)\1.*(\w)\2/.test(string);

const incrementChar = char => char === 'z' ? 'a' : String.fromCharCode(char.charCodeAt(0) + 1);

// Increments the whole string by one char recursively
const incrementString = string => {
  const nextChar = incrementChar(string.slice(-1));
  return nextChar === 'a' ? incrementString(string.slice(0, -1)) + 'a' : string.slice(0, -1) + nextChar;
};

const isValidPassword = string => isContainStraightIncreasingSymbols(string) && !isContainRestrictedSymbols(string) && isContainPairs(string);

let result = 'hepxcrrq';
while (!isValidPassword(result)) result = incrementString(result);

console.log(result);