const utils = require('../utils');

const MFSCAM = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
};
const AUNT_REGEX = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/;

utils.getInput().forEach(line => {
    const aunt = line.match(AUNT_REGEX)
    if (
        MFSCAM[aunt[2]] == aunt[3] &&
        MFSCAM[aunt[4]] == aunt[5] &&
        MFSCAM[aunt[6]] == aunt[7]
      ) {
        console.log(aunt[1]);
      }
});