import { getInput, getNums, multiply } from '../../utils.js';

const [timeIn, distIn] = getInput();
const time = getNums(timeIn);
const dist = getNums(distIn);

const SPEED_INCREASE = 1;

function simulateRaces(time, dist) {
    const numberOfWays = [];
    for (let race = 0; race < time.length; race++) {
        let lowerBound = null;
        let upperBound = null;
        for (let acceleration = 1; acceleration < (time[race] / 2); acceleration++) {
            if (!lowerBound && (acceleration * SPEED_INCREASE) * (time[race] - acceleration) > dist[race]) {
                lowerBound = acceleration;
            }
            if (!upperBound && ((time[race] - acceleration) * SPEED_INCREASE) * acceleration > dist[race]) {
                upperBound = time[race] - acceleration;
            }
            if (upperBound && lowerBound) break;
        }
        numberOfWays.push(upperBound - lowerBound + 1);
    }
    return numberOfWays;
}

console.log(multiply(simulateRaces(time, dist)))
console.log(simulateRaces([Number(timeIn.match(/(\d+)/g).join(''))],[Number(distIn.match(/(\d+)/g).join(''))]))