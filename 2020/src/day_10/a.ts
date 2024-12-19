import { getIntInput } from '../utils';

let numbers = getIntInput().sort((a,b) => a - b);
numbers.unshift(0);
numbers.push(numbers[numbers.length - 1] + 3);
let joult_1_diff = 0, joult_3_diff = 0;
for(let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i+1] - numbers[i] == 1) joult_1_diff++;
    if (numbers[i+1] - numbers[i] == 3) joult_3_diff++;
}

console.log(`joule_1_diff: ${joult_1_diff}, joule_3_diff: ${joult_3_diff} => ${joult_1_diff * joult_3_diff}`)