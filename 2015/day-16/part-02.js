const utils = require('../utils');

const MFSCAM = {
    children: (value) => value == 3,
    cats: (value) => value >= 7,
    samoyeds: (value) => value == 2,
    pomeranians: (value) => value <= 3,
    akitas: (value) => value == 0,
    vizslas: (value) => value == 0,
    goldfish: (value) => value <= 5,
    trees: (value) => value >= 3,
    cars: (value) => value == 2,
    perfumes: (value) => value == 1,
};
const AUNT_REGEX = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/;

utils.getInput().forEach(line => {
    const aunt = line.match(AUNT_REGEX)
    if (
        MFSCAM[aunt[2]](aunt[3]) &&
        MFSCAM[aunt[4]](aunt[5]) &&
        MFSCAM[aunt[6]](aunt[7])
      ) {
        console.log(aunt[1]);
      }
});