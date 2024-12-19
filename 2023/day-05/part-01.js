import { getRawInput } from '../../utils.js';

const [seeds, ...configs] = getRawInput().split('\n\n');
const MAPPING = new Map();
for (let c of configs) {
    const [_, from, to] = (/(\w*)\-to\-(\w*)/g).exec(c);
    const inRangeFunctions = [];
    const numbers = c.match(/(\d+)/g).map(v => Number(v));
    for (let idx = 0; idx < numbers.length; idx += 3) {
        inRangeFunctions.push({ isInRange: (v) => v >= numbers[idx + 1] && v <= numbers[idx + 1] + numbers[idx + 2], destinationNumber: (v) => v - numbers[idx + 1] + numbers[idx] })
    }
    MAPPING.set(from, { to, ranges: inRangeFunctions })
}

function processSeeds(seeds) {
    let locations = [];
    for (let seed of seeds) {
        let from = 'seed';
        while (from != 'location') {
            const { to, ranges } = MAPPING.get(from);
            for (let range of ranges) {
                if (range.isInRange(seed)) {
                    seed = range.destinationNumber(seed);
                    break;
                }
            }
            from = to;
        }
        locations.push(seed)
    }
    return locations
}

console.log('Part 01: ', Math.min(...processSeeds(seeds.match(/(\d+)/g).map(v => Number(v)))));