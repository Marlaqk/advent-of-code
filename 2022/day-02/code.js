const utils = require('../../utils');

const POINTS = {
    A: 1,
    B: 2,
    C: 3,
}

const CHOICE = {
    A: {
        lose: 'B',
        win: 'C',
    },
    B: {
        lose: 'C',
        win: 'A',
    },
    C: {
        lose: 'A',
        win: 'B',
    }
}

let score = utils.getInput().reduce((score, round) => {
    let [enemy, me] = round.split(' ')
    return {
        part1: score.part1 + part1(enemy, me),
        part2: score.part2 + part2(enemy, me),
    }
}, { part1: 0, part2: 0 })

function part1(enemy, me) {
    me = String.fromCharCode(me.charCodeAt(0) - 23)
    let roundScore = POINTS[me]
    if (enemy == CHOICE[me].lose) {
    } else if (CHOICE[me].win == enemy) {
        roundScore += 6
    } else {
        roundScore += 3
    }
    return roundScore
}

function part2(enemy, outcome) {
    let roundScore = 0
    switch (outcome) {
        case 'X': 
            roundScore += POINTS[CHOICE[enemy].win]
            break
        case 'Y':
            roundScore += POINTS[enemy]
            roundScore += 3
            break
        case 'Z':
            roundScore += POINTS[CHOICE[enemy].lose]
            roundScore += 6
            break
    }
    return roundScore;
}

console.log(score.part1)
console.log(score.part2)