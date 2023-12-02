import { getInput } from '../../utils.js';

const LINES = getInput();

function part01(pv, line) {
    let right = line.length - 1;
    let left = 0;
    while (right >= 0 && left < line.length) {
        if (!isNaN(line[left]) && !isNaN(line[right])) {
            return pv += parseInt(line[left] + line[right])
        }
        if (isNaN(line[right])) {
            right--;
        }
        if (isNaN(line[left])) {
            left++;
        }
    }
    return pv
}

const numbers = new Map([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9]]);

function isDigitOrNumberText(index, line) {
    if (!isNaN(line[index])) {
        return true;
    }
    const newLine = line.substring(index);
    for (let number of numbers.keys()) {
        if (newLine.startsWith(number)) {
            return true;
        }
    }
    return false;
}

function parseNumber(index, line) {
    if (!isNaN(line[index])) {
        return new String(line[index])
    }
    const newLine = line.substring(index);
    for (let number of numbers.keys()) {
        if (newLine.startsWith(number)) {
            return new String(numbers.get(number));
        }
    }
}

function part02(pv, line) {
    let right = line.length - 1;
    let left = 0;
    let leftV = undefined, rightV = undefined;
    while (right >= 0 && left < line.length) {
        if (!isDigitOrNumberText(right, line)) {
            right--;
        } else {
            rightV = parseNumber(right, line);
        }
        if (!isDigitOrNumberText(left, line)) {
            left++;
        } else {
            leftV = parseNumber(left, line);
        }
        if (rightV != undefined && leftV != undefined) {
            return pv += parseInt(leftV + rightV)
        }
    }
    return pv
}

console.log(LINES.reduce(part01, 0));
console.log(LINES.reduce(part02, 0));
