import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('src/day_' + process.env['DAY'] + '/input/a.txt'),
    output: process.stdout,
    terminal: false
});

let numbers: Array<number> = [];
rl.on('line', (line) => numbers.push(Number(line)))

rl.on('close', () => {
    let found = false;
    for(let i = 0; i < numbers.length && !found; i++) {
        for(let j = 0; j < numbers.length && !found; j++) {
            let sum = numbers[i] + numbers[j];
            if (sum == 2020) {
                console.log(numbers[i] * numbers[j]);
                found = true;
            }
        }
    }
});
