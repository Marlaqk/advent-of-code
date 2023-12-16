import { getInput, sum } from '../../utils.js';

const SPRING_ROWS = getInput();

function generate(row, groups) {
    if (!row) return groups.length ? 0 : 1;
    if (!groups.length) return row.includes('#') ? 0 : 1;
    if (row.length < groups.reduce((s, x) => s + x) + groups.length - 1) return 0;

    if (row[0] === '.') return generate(row.slice(1), groups);
    if (row[0] === '#') {
        for (let i = 0; i < groups[0]; i++) {
            if (row[i] === '.') return 0;
        }
        return row[groups[0]] !== '#' ? generate(row.slice(groups[0] + 1), groups.slice(1)) : 0;
    }

    return generate(`.${row.slice(1)}`, groups) + generate(`#${row.slice(1)}`, groups);
}

const memo = {};
function memoize(fn) {
    return (...params) => (memo[params.join(';')] ??= fn(...params));
}
generate = memoize(generate);

function arrangment(row) {
    const [inSpring, inGroup] = row.split(' ');
    const spring = new Array(5).fill(0).map(v => inSpring).join('?');
    const group = inGroup.split(',').map(v => Number(v));
    const groups = new Array(5).fill(0).flatMap(() => group);
    return generate(spring, groups);
}

console.log(sum(SPRING_ROWS.map(arrangment)))
