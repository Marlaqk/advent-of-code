import { getRawInput } from '../utils';

let entries = getRawInput().split('\n\n');
console.log(entries);
let sum = 0;
for(let i = 0; i < entries.length; i++) {
    console.log([...new Set(entries[i].replace(/\n/g,'').split(''))]);
    sum += [...new Set(entries[i].replace(/\n/g,'').split(''))].length;
}
console.log(sum);