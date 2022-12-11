const utils = require('../utils');

const reg = /([a-z-]+?)-(\d+)(\[(\w+)\])/;

utils.getInput().forEach((line) => {
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
    let matchingCheckSum = checkSum == counts.map(([char, _]) => char).slice(0, 5).join('');

    if (matchingCheckSum) {
        let room = decrypt(matches[1], sectorId);
        if (room.indexOf('north') >= 0) {
            console.log(sectorId, room)
        }
    }
})

function decrypt(phrase, sectorId) {
    let words = phrase.split('-');
    return words.map(
        w => w = w.split('').map(
            c => String.fromCharCode((c.charCodeAt(0) - 97 + (sectorId % 26)) % 26 + 97)).join(''))
        .join(' ')
}