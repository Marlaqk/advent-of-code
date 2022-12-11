const utils = require('../utils');

const HYPERNET_SEQ_MATCHER = /(?<=\[).+?(?=\])/g;
const HEADER_MATCHER = /\[.+?\]/gm;

console.log(utils.getInput().reduce((acc, line) => {
    const headers = line.split(HEADER_MATCHER);
    const hypernet_seqs = line.match(HYPERNET_SEQ_MATCHER);
    return headers.find(hasAbba) && !hypernet_seqs.find(hasAbba) ? acc + 1 : acc;
}, 0));

function hasAbba(seq) {
    for(let i = 0; i < seq.length - 3; i++) {
        if (seq[i] != seq[i+1] && seq[i] == seq[i+3] && seq[i+1] == seq[i+2]) {
            return true;
        }
    }
    return false;
}