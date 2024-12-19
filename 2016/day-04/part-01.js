const utils = require('../utils');

const reg = /([a-z-]+?)-(\d+)(\[(\w+)\])/;

console.log(utils.getInput().reduce((val, line) => {
    const matches = reg.exec(line);
    let characters = matches[1].split('-').join('').split('');
    let counts = Object.entries(characters.reduce((p, c) => {
        if (!p[c]) {
            p[c] = 0;
        }
        p[c]++;
        return p;
    }, {})).sort(([charA, freqA], [charB, freqB]) =>
        freqA < freqB ? 1 :
            freqA > freqB ? -1 :
                charA > charB ? 1 : -1
    );
    let sectorId = parseInt(matches[2]);
    let checkSum = matches[4];
    let matchingCheckSum = checkSum == counts.map(([char, _]) => char).slice(0, 5).join('')
    return matchingCheckSum ? val + sectorId : val;
}, 0))