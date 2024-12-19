import { getInput } from '../../utils.js';

const GAMES = getInput()
const MAX_CUBES = new Map([
    ['red', 12], ['green', 13], ['blue', 14]
]);

function part01(pv, game) {
    let [gameInfo, sets] = game.split(': ');
    for (let set of sets.split('; ')) {
        const colors = set.split(', ')
        for (let c of colors) {
            let [count, color] = c.split(' ');
            if (Number(count) > MAX_CUBES.get(color)) {
                return pv;
            }
        }
    }
    let [_, id] = gameInfo.split(' '); 
    return pv + Number(id)
}

function part02(pv, game) {
    let [_, sets] = game.split(': ');
    const min_cubes = new Map([
        ['red', 0], ['green', 0], ['blue', 0]
    ]);
    for (let set of sets.split('; ')) {
        const colors = set.split(', ')
        for (let c of colors) {
            let [count, color] = c.split(' ');
            if (Number(count) > min_cubes.get(color)) {
                min_cubes.set(color, Number(count))
            }
        }
    }
    return pv + Array.from(min_cubes.values()).reduce((a, b) => a * b);
}

console.log(GAMES.reduce(part01, 0));
console.log(GAMES.reduce(part02, 0));