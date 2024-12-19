import { chown } from 'fs';
import { emitKeypressEvents } from 'readline';
import { getRawInput } from '../utils';

class Bag {
    name: string;
    amount: number;
    childs: Bag[] | undefined

    constructor(name: string, amount: number, childs: Bag[] | undefined) {
        this.name = name;
        this.amount = amount;
        this.childs = childs;
    }
}

let rules = getRawInput().split('.\n');
let bags = new Map();
for (let i = 0; i < rules.length; i++) {
    const [container, content] = rules[i].split(' bags contain');

    if (content.indexOf('no other bags') >= 0) {
        bags.set(container, new Bag(container, 1, undefined));
    } else {
        let childsInput = content.split('bag').slice(0,-1);
        let childs: Bag[] = [];
        for (let j = 0; j < childsInput.length; j++) {
            childsInput[j] = childsInput[j].replace(/(s,)|,/g, '').trim();
            let name = childsInput[j].substr(2);
            let amount = Number(childsInput[j].substr(0,1));
            childs.push(new Bag(name, amount, undefined))
        }
        bags.set(container, new Bag(container, 1, childs));
    }
}

console.log(solver(bags.get('shiny gold')))
function solver(bag: Bag): number {
    if (!bag.childs) return 0;
    
    let sum = 0;
    bag.childs.forEach(child => {
        if (bags.get(child.name)) {
            sum += child.amount + child.amount * solver(bags.get(child.name));
        }
    })
    return sum;
}