const utils = require('../utils');

const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const DOUBLE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('').map(item => item + item);
const RESTRICTED_LETTERS = ['ab', 'cd', 'pq', 'xy'];

const isContainThreeVowels = string => string.split('').reduce((vowels, char) => VOWELS.indexOf(char) === -1 ? vowels : ++vowels, 0) >= 3;
const isContainDoubleLetter = string => DOUBLE_LETTERS.some(item => string.indexOf(item) !== -1);
const isContainRestrictedLetters = string => RESTRICTED_LETTERS.some(item => string.indexOf(item) !== -1);

console.log(utils.getInput().filter(l => !!(isContainThreeVowels(l) && isContainDoubleLetter(l) && !isContainRestrictedLetters(l))).length)