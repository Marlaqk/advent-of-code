import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('src/day_' + process.env['DAY'] + '/input/a.txt'),
    output: process.stdout,
    terminal: false
});

let boardingPasses: string[] = [];
rl.on('line', (line) => {
    boardingPasses.push(line);
})

rl.on('close', () => {
    console.log(solve(boardingPasses));
});

function solve(boardingPasses: string[]) {
    let highestSeatId = 0;
    for(let i = 0; i < boardingPasses.length; i++) {
        let newSeatId = calculateSeatId(boardingPasses[i]);
        if (newSeatId > highestSeatId) highestSeatId = newSeatId;
    }
    return highestSeatId;
}

function calculateSeatId(code): number {
    let row = parseInt(code.substring(0,7).replace(/F/g, "0").replace(/B/g, "1"),2);
    let seat = parseInt(code.substring(7).replace(/L/g, "0").replace(/R/g, "1"),2);
    return row * 8 + seat;
}