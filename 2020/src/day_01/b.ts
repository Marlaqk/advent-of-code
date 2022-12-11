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
    numbers.sort((a,b) => a - b);
    console.log(numbers)
    let found = false;
    for(let i = 0; i < numbers.length && !found; i++) {
        for(let j = 0; j < numbers.length && !found && numbers[i] + numbers[j] < 2020; j++) {
            let numberToFind = 2020 - (numbers[i] + numbers[j]);
            if (numbers.indexOf(numberToFind) >= 0) {
                console.log(numbers[i] * numbers[j] * numberToFind);
                found = true;
            }
        }
    }
});
