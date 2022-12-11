const utils = require('../utils');

const ROUTES = new Map();
const PLACES = new Set();

utils.getInput().forEach(line => {
    let [route, distance] = line.split(' = ');
    let [p1, p2] = route.split(' to ');
    PLACES.add(p1);
    PLACES.add(p2);
    ROUTES.set(route, Number(distance));
    ROUTES.set(`${p2} to ${p1}`, Number(distance));
})

const allPossibleDistances = utils.permute(PLACES).reduce((acc, route) => {
    let total = 0;
    for (let i = 0; i < route.length; i++) {
        if (route[i + 1] === undefined) break;

        total += ROUTES.get(`${route[i]} to ${route[i + 1]}`);
    }

    return acc.concat([total]);
}, []);

console.log(Math.max.apply(Math, allPossibleDistances))