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

let highest = 0;
for (let x = 1; x < trees.length - 1; x++) {
    for (let y = 1; y < trees[x].length - 1; y++) {
        highest += isVisible(x, y, trees)
    }
}

const extent = (trees.length - 2) * 2 + 2 * trees[0].length;
console.log(extent + highest)