import { getRawInput, Node } from '../../utils.js';

const [players, marbles] = getRawInput().match(/(\d+)/g).map(v => parseInt(v));

function getHighScore(players, marbles) {
    const playersScores = Array.from({ length: players }, v => 0);
    let currentMarble = new Node(0);
    for (let i = 1; i <= marbles; i++) {
        let newMarble = new Node(i);
        if (i % 23 > 0) {
            currentMarble.right.addToRight(newMarble);
            currentMarble = newMarble;
        } else {
            const currentPlayer = i % players;
            const marbleToBeRemoved = currentMarble.visitLeft(7);
            playersScores[currentPlayer] += i + marbleToBeRemoved.value;
            currentMarble = marbleToBeRemoved.right;
            marbleToBeRemoved.remove();
        }
    }
    return Math.max(...playersScores);
}

console.log(getHighScore(players, marbles))
console.log(getHighScore(players, marbles*100))