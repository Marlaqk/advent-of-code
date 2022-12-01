const utils = require('../../utils');

const inventories = [];
let calories = 0;
utils.getInput().forEach(line => {
    if (line == '') {
        inventories.push(calories);
        calories = 0;
    } else {
        calories += parseInt(line);
    }
})
inventories.push(calories);

console.log(Math.max(...inventories))
console.log(utils.sum(inventories.sort((a,b) => a - b).slice(-3)))