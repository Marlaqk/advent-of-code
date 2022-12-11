import { getIntInput, getRawInput } from '../utils';

const PREMABLE_LENGTH = 25;

let numbers = getIntInput();
for(let i = PREMABLE_LENGTH; i < numbers.length; i++) {
    if (!doubleExists(numbers.slice(i - PREMABLE_LENGTH, i), numbers[i])) {
        console.log(numbers[i]);
    }
}

function doubleExists(numbers: number[], sum): boolean {
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] == sum) return true;
        }
    }
    return false;
}