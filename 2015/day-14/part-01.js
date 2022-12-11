const utils = require('../utils');

const INSTRUCTION_REGEX = /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./;

const DISTANCE = [];
const TIME = 2503;

utils.getInput().forEach(line => {
    let [_, name, speed, fligthDuration, rest] = line.match(INSTRUCTION_REGEX);
    let cycleTime = Number(fligthDuration) + Number(rest);
    let cycles = Math.floor(TIME/cycleTime);
    let reminderDistance = Math.min(TIME % cycleTime, fligthDuration) * speed;
    let distance = cycles * fligthDuration * speed + reminderDistance
    DISTANCE.push(distance);
})

console.log(Math.max(...DISTANCE))