const utils = require('../utils');

const HYPERNET_SEQ_MATCHER = /(?<=\[).+?(?=\])/g;
const HEADER_MATCHER = /\[.+?\]/gm;

console.log(utils.getInput().reduce((acc, line) => {
    const headers = line.split(HEADER_MATCHER);
    const hypernet_seqs = line.match(HYPERNET_SEQ_MATCHER);
    const bab = headers.flatMap(findABA);
    return hypernet_seqs.find(seq => findBAB(seq, bab)) ? acc + 1 : acc;
}, 0));

function findABA(seq) {
    const bab = [];
    for(let i = 0; i < seq.length - 2; i++) {
        if (seq[i] != seq[i+1] && seq[i] == seq[i+2]) {
            bab.push(`${seq[i+1]}${seq[i]}${seq[i+1]}`);
        }
    }
    return bab;
}

function findBAB(seq, bab) {
    for(let i = 0; i < seq.length - 2; i++) {
        if (bab.indexOf(seq.substring(i,i+3)) >= 0) return true;
    }
    return false
}