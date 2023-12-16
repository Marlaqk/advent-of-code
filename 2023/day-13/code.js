import { getRawInput, sum } from '../../utils.js';

const PATTERNS = getRawInput().split('\n\n');

function transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

function countDiff(a, b) {
    return a.split('').map((_, idx) => a[idx] != b[idx]).reduce((x, y) => x + y, 0)
}

function horizontalFold(matrix, off) {
    for (let k = 1; k < matrix.length; k++) {
        let l = k, u = matrix;
        if (k > matrix.length / 2) { 
            u = u.slice().reverse();
            l = matrix.length - k ;
        }
        if (off == countDiff(u.slice(0, l).join(''), u.slice(l, 2 * l).reverse().join(''))) return k
    }
    return 0
}

console.log([0,1].map(off => sum(PATTERNS.map(m => {
    m = m.split('\n').map(l => l.split(''))
    return 100 * horizontalFold(m, off) + horizontalFold(transpose(m), off)
}))))