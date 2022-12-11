import { getRawInput } from "../utils";

let entries = getRawInput().split('\n\n');
let sum = 0;
for(let i = 0; i < entries.length; i++) {
    let group = entries[i].split('\n');
    for(let c of group[0].split('')) {
        let count = 1;
        for(let j = 1; j < group.length; j++) {
            if (group[j].indexOf(c) >= 0) count++;
        }
        if (count == group.length) sum++;
    }
}
console.log(sum);