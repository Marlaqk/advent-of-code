const utils = require('../../utils');

const valves = new Map()
const tunnels = new Map()

utils.getInput().forEach(line => {
    let [name, rest] = line.split(' has flow rate=')
    let [flowRate, paths] = rest.split(/; \w+ \w+ to \w+ /)
    name = name.slice(-2)
    valves.set(name, Number(flowRate))
    tunnels.set(name, paths.split(', '))
});

const dists = new Map()
const nonEmpty = [];

for (let [valve, flowRate] of valves) {
    if (valve != 'AA' && !flowRate) {
        continue
    }

    if (valve != 'AA') {
        nonEmpty.push(valve)
    }

    dists.set(valve, {'AA': 0})
    dists.get(valve)[valve] = 0
    let visited = new Set()
    visited.add(valve)
    let queue = [[0, valve]]
    
    while (queue.length > 0) {
        let [distance, position] = queue.shift()
        for (neighbor of tunnels.get(position)) {
            if (visited.has(neighbor)) continue
            visited.add(neighbor)
            if (valves.get(neighbor)) {
                dists.get(valve)[neighbor] = distance + 1
            }
            queue.push([distance + 1, neighbor])
        }
    }

    delete dists.get(valve)[valve]
    if (valve != 'AA')
        delete dists.get(valve)['AA']
}

const indices = new Map();
nonEmpty.forEach((el, idx) => indices.set(el, idx))

const cache = new Map()
function dfs(time, valve, bitmask) {
    if (cache.has(`${time},${valve},${bitmask}`)) {
        return cache.get(`${time},${valve},${bitmask}`)
    }
    let maxVal = 0
    for (let neighbor of Object.keys(dists.get(valve))) {
        let bit = 1 << indices.get(neighbor)
        if (bit & bitmask) continue
        let remainingTime = time - dists.get(valve)[neighbor] - 1;
        if (remainingTime <= 0) continue
        maxVal = Math.max(maxVal, dfs(remainingTime, neighbor, bitmask | bit) + valves.get(neighbor) * remainingTime)
    }
    cache.set(`${time},${valve},${bitmask}`, maxVal)
    return maxVal
}

console.log(dfs(30, 'AA', 0))

let b = (1 << nonEmpty.length) - 1
let max = 0
for (let i = 0; i <= (b + 1) / 2; i++) {
    max = Math.max(max, dfs(26, "AA", i) + dfs(26, "AA", b ^ i))
}
console.log(max)