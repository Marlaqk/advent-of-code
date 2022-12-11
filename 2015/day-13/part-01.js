const utils = require('../utils');

const INSTRUCTION_REGEX = /(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)./;

const ATTRIBUTES = new Map();
const PERSONS = new Set();

utils.getInput().forEach(line => {
    let [s, p1, method, value, p2] = line.match(INSTRUCTION_REGEX);
    PERSONS.add(p1);
    PERSONS.add(p2);
    if (method == 'gain') {
        ATTRIBUTES.set(`${p2}->${p1}`, Number(value));
    } else {
        ATTRIBUTES.set(`${p2}->${p1}`, -Number(value));
    }
})

const totalHappinnes = utils.permute(PERSONS).reduce((totalHappiness, permutation) => {
    const total = permutation.reduce((total, person, index, arr) => {
        const leftOne = arr[index - 1 < 0 ? arr.length - 1 : index - 1];
        const rightOne = arr[index + 1 > arr.length - 1 ? 0 : index + 1];

        total += ATTRIBUTES.get(`${person}->${leftOne}`);
        total += ATTRIBUTES.get(`${person}->${rightOne}`);

        return total;
    }, 0);

    return total > totalHappiness ? total : totalHappiness;
}, 0);

console.log(totalHappinnes);