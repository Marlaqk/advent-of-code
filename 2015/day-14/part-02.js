const utils = require('../utils');

const INSTRUCTION_REGEX = /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./;
const REINDEER = [];
const TIME = 2503;

utils.getInput().forEach(line => {
    let [_, name, speed, fligthDuration, restDuration] = line.match(INSTRUCTION_REGEX);
    REINDEER.push({
        distance: 0,
        time: 0,
        points: 0,
        speed: Number(speed),
        fligthDuration: Number(fligthDuration),
        cycleTime: Number(fligthDuration) + Number(restDuration),
    })
})

for (let s = 0; s < TIME; s++) {
    let maxDistance = -Infinity;
    REINDEER.forEach(deer => {
        deer.time++;
        if (deer.time == deer.cycleTime) {
            deer.time = 0;
        } else if (deer.time <= deer.fligthDuration) {
            deer.distance += deer.speed;
        }
        if (deer.distance > maxDistance) { 
            maxDistance = deer.distance; 
        }
    })
    REINDEER.forEach(deer => {
        if (deer.distance == maxDistance) {
            deer.points += 1
        }
    })
}

console.log(Math.max(...REINDEER.map(d => d.points)))