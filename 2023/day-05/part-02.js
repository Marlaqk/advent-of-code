import { getRawInput } from '../../utils.js';

const [seeds, ...configs] = getRawInput().split('\n\n');

function locations(intervals) {
    for (let map_blocks of configs) {
        let [_, ...mappings] = map_blocks.split('\n');
        let images = [];
        while (intervals.length > 0) {
            let [x, y] = intervals.pop();
            let found = false;
            for (let mapping of mappings) {
                let [destination, source, range] = mapping.split(' ').map(v => Number(v));
                let source_endpoint = source + range - 1;
                if (source <= x && x <= y && y <= source_endpoint) {
                    images.push([x - source + destination, y - source + destination])
                    found = true;
                    break;
                }
                if (source <= x && x <= source_endpoint && source_endpoint < y) {
                    intervals.push(...[[x, source_endpoint], [source_endpoint + 1, y]])
                    found = true;
                    break;
                }
            }
            if (!found) {
                images.push([x,y])
            }
        }
        intervals = images;
    }
    return intervals
}

let seedNumbers = seeds.match(/(\d+)/g).map(v => Number(v));
let ranges = [];
for (let i=0; i<seedNumbers.length; i+=2) {
    ranges.push([seedNumbers[i], seedNumbers[i] + seedNumbers[i+1] - 1]);
}
console.log(Math.min(...locations(ranges).map(v => v[0])))