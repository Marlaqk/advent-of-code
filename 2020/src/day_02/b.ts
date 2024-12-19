import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('src/day_' + process.env['DAY'] + '/input/b.txt'),
    output: process.stdout,
    terminal: false
});

console.time('aoc');
let valid_pwd = 0;
rl.on('line', (line) => {
    let spittedLine = line.split(' ');
    let count = spittedLine[0].split('-');
    let char = spittedLine[1].substr(0,1);
    
    let first = false;
    if ((spittedLine[2][Number(count[0])-1] === char )) {
        valid_pwd++;
        first = true;
    }
    let second = false;
    if ((spittedLine[2][Number(count[1])-1] === char )) {
        valid_pwd++;
        second = true;
    }

    if (second && first) {
        valid_pwd -= 2;
    }

})

rl.on('close', () => {
    console.timeEnd('aoc');
    console.log(valid_pwd);
});
