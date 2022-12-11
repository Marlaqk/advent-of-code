import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('src/day_' + process.env['DAY'] + '/input/a.txt'),
    output: process.stdout,
    terminal: false
});

let passports: string[] = [];
let tmp_passport_collection = '';
rl.on('line', (line) => {
    if (line == '') {
        passports.push(tmp_passport_collection);
        tmp_passport_collection = '';
        return;
    }
    tmp_passport_collection += line;
})

rl.on('close', () => {
    passports.push(tmp_passport_collection);
    const valid_password_elements = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:'];
    let valid_passport = 0;
    for(let i = 0; i < passports.length; i++) {
        let elements = 0;
        for (let j = 0; j < valid_password_elements.length; j++) {
            if (passports[i].indexOf(valid_password_elements[j]) >= 0) {
                elements++;
            }
        }
        if (elements == valid_password_elements.length) {
            valid_passport++;
        }
    }
    console.log(valid_passport);
});