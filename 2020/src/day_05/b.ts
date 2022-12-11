import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('src/day_' + process.env['DAY'] + '/input/b.txt'),
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
    let seatsTaken: number[] = [];
    for(let i = 0; i < boardingPasses.length; i++) {
        seatsTaken.push(calculateSeatId(boardingPasses[i]));
    }

    seatsTaken.sort((a,b) => a - b);
    for(let i = 0; i < seatsTaken.length - 1; i++) {
        if (seatsTaken[i+1] - seatsTaken[i] > 1) {
            return seatsTaken[i]+1;
        }
    }
    return -1;
}

function calculateSeatId(code): number {
    let row = parseInt(code.substring(0,7).replace(/F/g, "0").replace(/B/g, "1"),2);
    let seat = parseInt(code.substring(7).replace(/L/g, "0").replace(/R/g, "1"),2);
    return row * 8 + seat;
}