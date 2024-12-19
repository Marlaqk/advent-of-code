const utils = require('../../utils');

const INPUT = utils.getInput();

console.log(solver(INPUT))

function solver(lines) {
    return lines.reduce((sum, line) => {
        let [elf1, elf2] = line.split(',')
        let [a, b] = elf1.split('-').map(v => parseInt(v))
        let [c, d] = elf2.split('-').map(v => parseInt(v))
        if ((c >= a && d <= b) || (a >= c && b <= d)) {
            sum.p1 += 1;
        }
        if ((b >= c) && a <= d) {
            sum.p2 += 1
        }
        return sum
        
    }, {p1: 0, p2: 0})
}
