import { getRawInput } from "../utils";

const [earliestTime, busInput] = getRawInput().split('\n');
const constraints = busInput
  .split(',')
  .map((v, i) => (v === "x" ? false : { modulo: +Number(v), remainder: (Number(v) - (i % Number(v))) % Number(v) }))
  .filter(Boolean);

// @ts-ignore
constraints.sort((a, b) => b.modulo - a.modulo)

let val = 0;
let step = 1;
for (let i = 0; i < constraints.length; i++) {
  // @ts-ignore
  while ( val % constraints[i].modulo !== constraints[i].remainder) val += step;
  // @ts-ignore
  step *= constraints[i].modulo;
}

console.log(val)