const utils = require('../utils');

const INSTRUCTION_REGEX = /(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)./;

const ATTRIBUTES = new Map();
const PERSON = new Set();

utils.getInput().forEach(line => {
    let [s, p1, method, value, p2] = line.match(INSTRUCTION_REGEX);
    PERSON.add(p1);
    PERSON.add(p2);
    if (method == 'gain') {
        ATTRIBUTES.set(`${p2}->${p1}`, Number(value));
    } else {
        ATTRIBUTES.set(`${p2}->${p1}`, -Number(value));
    }
})

PERSON.forEach(p => {
    ATTRIBUTES.set(`${p}->Marlaqk`, 0);
    ATTRIBUTES.set(`Marlaqk->${p}`, 0);
})
PERSON.add('Marlaqk');

const totalHappinnes = utils.permute(PERSON).reduce((totalHappiness, permutation) => {
    const total = permutation.reduce((total, person, index, arr) => {
        const left = arr[index - 1 < 0 ? arr.length - 1 : index - 1];
        const right = arr[index + 1 > arr.length - 1 ? 0 : index + 1];

        total += ATTRIBUTES.get(`${person}->${left}`);
        total += ATTRIBUTES.get(`${person}->${right}`);

        return total;
    }, 0);

    return total > totalHappiness ? total : totalHappiness;
}, 0);

console.log(totalHappinnes);