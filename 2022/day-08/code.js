const utils = require('../../utils');

const trees = utils.getNumberGridInput();

function isVisible(x, y, trees) {
    const isValid = cellValue => cellValue < trees[x][y]

    const [rowValues, colValues] = [
        trees[x],
        Array.from({ length: trees.length }, (_, i) => trees[i][y]),
    ]

    return [
        rowValues.slice(0, y).every(isValid),
        rowValues.slice(y + 1).every(isValid),
        colValues.slice(0, x).every(isValid),
        colValues.slice(x + 1).every(isValid),
    ].some(Boolean)
}

function scenicScore(x, y, trees) {
    const [rowValues, colValues] = [
        trees[x],
        Array.from({ length: trees.length }, (_, i) => trees[i][y]),
    ]

    const treeHeight = trees[x][y]
    const scenicAccumulator = ({count, stop}, el) => {
        if (stop) return {count,stop}

        stop = el >= treeHeight
        count += 1

        return {count,stop}
    }

    return [
      rowValues
        .slice(0, y)
        .reverse()
        .reduce(scenicAccumulator, { count: 0, stop: false }).count,
      rowValues
        .slice(y + 1)
        .reduce(scenicAccumulator, { count: 0, stop: false }).count,
      colValues
        .slice(0, x)
        .reverse()
        .reduce(scenicAccumulator, { count: 0, stop: false }).count,
      colValues
        .slice(x + 1)
        .reduce(scenicAccumulator, { count: 0, stop: false }).count,
    ].reduce((acc, el) => acc * el, 1)
}

let highest = 0;
let scenicHighscore = 0;
for (let x = 1; x < trees.length - 1; x++) {
    for (let y = 1; y < trees[x].length - 1; y++) {
        highest += isVisible(x, y, trees)
        scenicHighscore = Math.max(scenicHighscore, scenicScore(x,y,trees))
    }
}

const extent = (trees.length - 2) * 2 + 2 * trees[0].length;
console.log(extent + highest)
console.log(scenicHighscore)