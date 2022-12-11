import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('src/day_' + process.env['DAY'] + '/input/a.txt'),
    output: process.stdout,
    terminal: false
});

console.time('aoc')
let valid_pwd = 0;
rl.on('line', (line) => {
    let spittedLine = line.split(' ');
    let count = spittedLine[0].split('-');
    let char = spittedLine[1].substr(0,1);

    let counter = 0;
    for (let i = 0; i < spittedLine[2].length; i++) {
        if (spittedLine[2].charAt(i) == char) {
            counter++;
        }
    }

    if (counter >= Number(count[0]) && counter <= Number(count[1])) {
        valid_pwd++;
    }

})

rl.on('close', () => {
    console.timeEnd('aoc');
    console.log(valid_pwd);
});