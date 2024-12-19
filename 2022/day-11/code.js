class Monkey {

    constructor(operation, items, test) {
        this.operation = operation;
        this.items = items;
        this.test = test;
        this.inspectedItem = 0;
    }

    catchItem(item) {
        this.items.push(item);
    }

    inspectAll() {
        this.inspectedItem += this.items.length;
        // this.items = this.items.map(worryLevel => Math.floor(this.operation(worryLevel) / 3)); // part 1
        this.items = this.items.map(worryLevel => this.operation(worryLevel) % divisors);
    }

    throwItems(monkeys) {
        this.items.splice(0, this.items.length).forEach(worryLevel => {
            monkeys.get(this.test(worryLevel)).catchItem(worryLevel);
        });
    }
}

const monkeys = new Map();
monkeys.set(0, new Monkey((v) => v * 11, [74, 73, 57, 77, 74], (v) => v % 19 == 0 ? 6 : 7))
monkeys.set(1, new Monkey((v) => v + 8, [99, 77, 79], (v) => v % 2 == 0 ? 6 : 0))
monkeys.set(2, new Monkey((v) => v + 1, [64, 67, 50, 96, 89, 82, 82], (v) => v % 3 == 0 ? 5 : 3))
monkeys.set(3, new Monkey((v) => v * 7, [88], (v) => v % 17 == 0 ? 5 : 4))
monkeys.set(4, new Monkey((v) => v + 4, [80, 66, 98, 83, 70, 63, 57, 66], (v) => v % 13 == 0 ? 0 : 1))
monkeys.set(5, new Monkey((v) => v + 7, [81, 93, 90, 61, 62, 64], (v) => v % 7 == 0 ? 1 : 4))
monkeys.set(6, new Monkey((v) => v * v, [69, 97, 88, 93], (v) => v % 5 == 0 ? 7 : 2))
monkeys.set(7, new Monkey((v) => v + 6, [59, 80], (v) => v % 11 == 0 ? 2 : 3))

const divisors = [19,2,3,17,13,7,5,11]
    .reduce((mul, v) => mul * v);

const ROUNDS = 10000
for(let i = 1; i <= ROUNDS; i++) {
    for(let m = 0; m < monkeys.size; m++) {
        const currMonkey = monkeys.get(m);
        currMonkey.inspectAll();
        currMonkey.throwItems(monkeys);
    }
}

console.log(Array.from(monkeys.values()).map(m => m.inspectedItem).sort((a,b) => b - a).slice(0,2).reduce((sum, v) => sum *= v, 1))