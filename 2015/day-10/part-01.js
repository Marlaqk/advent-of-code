const INTERATIONS = 40;
let input = '1113122113';

for(let i=0; i < INTERATIONS; i++) {
    let newLine = '';
    for(let j=0; j < input.length; j++) {
        if (j < (input.length - 1) && input[j] == input[j+1]) {
            let count = 1;
            while(j < (input.length - 1) && input[j] == input[j+1]) {
                count++;
                j++;
            }
            newLine += `${count}${input[j]}`
        } else {
            newLine += `1${input[j]}`
        }
    }
    input = newLine;
}

console.log(input.length)