import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('src/day_' + process.env['DAY'] + '/input/b.txt'),
    output: process.stdout,
    terminal: false
});

let passports: any[] = [];
passports.push(new Map([]));
let passport_idx = 0;
rl.on('line', (line) => {
    if (line == '') {
        passport_idx++;
        passports.push(new Map([]));
        return;
    }

    const splitted_line = line.split(' ');
    splitted_line.forEach(el => {
        const value_pair = el.split(':')
        passports[passport_idx].set(value_pair[0], value_pair[1]);
    })
})

rl.on('close', () => {
    let valid_passport = 0;
    for(let i = 0; i < passports.length; i++) {
        if (
            validBirthday(passports[i].get('byr')) &&
            validIssueYear(passports[i].get('iyr')) &&
            validExpirationYear(passports[i].get('eyr')) &&
            validHeight(passports[i].get('hgt')) &&
            validHairColor(passports[i].get('hcl')) &&
            validPassportId(passports[i].get('pid')) &&
            validEyeColor(passports[i].get('ecl'))
        ) {
            valid_passport++;
        }
    }
    console.log(valid_passport);
});

function validBirthday(birthYear) {
    return birthYear && birthYear >= 1920 && birthYear <= 2002;
}

function validIssueYear(issueYear) {
    return issueYear && issueYear >= 2010 && issueYear <= 2020;
}

function validExpirationYear(expirationYear) {
    return expirationYear && expirationYear >= 2020 && expirationYear <= 2030;
}

function validHeight(heigth) {
    if (!heigth) return false;

    const unit = heigth.slice(-2)
    if (unit == 'cm') {
        const h = Number(heigth.substr(0,3));
        return h >= 150 && h <= 193;
    } else {
        const h = Number(heigth.substr(0,2));
        return h >= 59 && h <= 76; 
    }
}

function validHairColor(hairColor) {    
    const regex = RegExp('^#[0-9a-f]{6}$');
    return hairColor && regex.test(hairColor);
}

function validEyeColor(eyeColor) {
    const regex = RegExp('^(amb|blu|brn|gry|grn|hzl|oth)$');
    return eyeColor && regex.test(eyeColor);
}

function validPassportId(passportId) {
    const regex = RegExp('^[0-9]{9}$');
    return passportId && regex.test(passportId);
}
