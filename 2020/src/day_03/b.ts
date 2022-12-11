import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('src/day_' + process.env['DAY'] + '/input/b.txt'),
    output: process.stdout,
    terminal: false
});

const moves = [
    {right: 1, down: 1, trees: 0},
    {right: 3, down: 1, trees: 0},
    {right: 5, down: 1, trees: 0},
    {right: 7, down: 1, trees: 0},
    {right: 1, down: 2, trees: 0},
]
let lines: string[] = [];
rl.on('line', (line) => {
    lines.push(line);
})

rl.on('close', () => {
    console.log(moves.map((move) => {
        let pos = 0;
        for(let i = 0; i < lines.length; i+=move.down) {
            if (lines[i][pos%31] == '#') {
                move.trees++;
            }
            pos += move.right;
        }
        return move.trees;
    }).reduce((a, b)=> a*b))
});
