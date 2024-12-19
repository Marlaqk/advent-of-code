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

function arrangment(row) {
    const [spring, group] = row.split(' ');
    const groups = group.split(',').map(v => Number(v));
    return generate(spring, groups);
}

console.log(sum(SPRING_ROWS.map(arrangment)))
