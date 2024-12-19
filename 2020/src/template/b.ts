import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('src/day_' + process.env['DAY'] + '/input/a.txt'),
    output: process.stdout,
    terminal: false
});

let entries: string[] = [];
rl.on('line', (line) => {
    entries.push(line);
})

rl.on('close', () => {
    console.log(solve(entries));
});

function solve(entries: string[]) {
    for(let i = 0; i < entries.length; i++) {
        
    }
}