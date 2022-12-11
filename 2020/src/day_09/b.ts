import { getIntInput, getRawInput } from '../utils';

const PREMABLE_LENGTH = 25;

let numbers = getIntInput();
for(let i = PREMABLE_LENGTH; i < numbers.length; i++) {
    if (!doubleExists(numbers.slice(i - PREMABLE_LENGTH, i), numbers[i])) {
        console.log(findContiguousSet(numbers.slice(0, i), numbers[i]));
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

function findContiguousSet(numbers: number[], searchSum) {
    for (let i = 0; i < numbers.length; i++) {
        let sum = 0, j = i;
        do {
            sum += numbers[j];
            j++;
        } while (sum < searchSum)

        if (sum == searchSum) {
            let smallestNumber = Math.min(...numbers.slice(i, j-1));
            let largestNumber = Math.max(...numbers.slice(i, j-1));
            return `smallest number: ${smallestNumber}, largest number ${largestNumber}, sum => ${smallestNumber + largestNumber}`
        }
    }
    return `not found`
}