import { getRawInput } from "../utils";

let [rulesIn, messagesIn] = getRawInput().split('\n\n');

let rules = [];
rulesIn.split('\n').forEach(line => {
  let [key, value] = line.split(': ');
  rules[key] = value.replace(/"/g, '');
})

rules[8] = '42 | 42 8'
rules[11] = '42 31 | 42 11 31'

const messages = messagesIn.split('\n');
const reg = '^'+createRegex(rules[0])+'$';
const countMatches = messages.map(msg => msg.match(reg) ? Number(1) : Number(0)).reduce((a, b) => a + b);
console.log(countMatches)

function createRegex(str, depth=0) {
  if (['a', 'b'].includes(str)) return str;
  if (depth > 30) return ''
  const containsOr = str.match(/(.*)\|(.*)/);
  if (containsOr) {
    return '(' + createRegex(containsOr[1], depth + 1) + '|' + createRegex(containsOr[2], depth + 1) + ')'
  }
  let rulesmatched = str.trim().split(' ');
  let strFound = '';
  for (let rule of rulesmatched) {
    strFound += createRegex(rules[+rule], depth + 1);
  }
  return strFound;
}