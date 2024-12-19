const crypto = require('crypto')

let number = 1
while(crypto.createHash('md5').update('yzbqklnj' + number).digest('hex').substring(0,6) != '000000') {
    number++
}

console.log(number)