import fs from 'fs';

export const getInput = () => {
    return fs.readFileSync('src/day_' + process.env['DAY'] + '/input.txt').toString().split('\n').filter(line => line !== '');
}

export const getRawInput = () => {
    return fs.readFileSync('src/day_' + process.env['DAY'] + '/input.txt').toString();
}

export const getIntInput = () => {
    return getInput().map(line => Number(line));
}