'use strict';
const utils = require('../utils');

const rAssgin = /^value (\d+) goes to (bot) (\d+)$/;
const rBotGive = /^(bot) (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)$/;
let bots = {};
let matches, type, number, bot;

class Bot {
    constructor(type, number) {
        this.type = type;
        this.number = number;
    }

    assgin(value) {
        if (this.hasLow()) {
            if (this.hasHigh()) {
                throw new Error(`failed to assgin ${value} to ${this.type} ${this.number}`);
            }

            if (this.low < value) {
                this.high = value;
            } else {
                this.high = this.low;
                this.low = value;
            }

            // reach two microchips
            if (this.target) {
                this.give(this.target.low, this.target.high);
            }
        } else {
            this.low = value;
        }
    }
    give(low, high) {
        if (!this.hasLow() || !this.hasHigh()) {
            if (this.target) {
                throw new Error(`failed to ask ${this.type} ${this.number} to give`);
            }
            this.target = {
                low,
                high
            };
            return;
        }

        if (this.low == 17 && this.high == 61) {
            console.log(`${this.type} ${this.number} compares ${this.low} with ${this.high}`);
        }
        low.assgin(this.low);
        high.assgin(this.high);

        delete this.low;
        delete this.high;
        delete this.target;
    }

    hasLow() {
        return typeof this.low !== 'undefined';
    }
    hasHigh() {
        return typeof this.high !== 'undefined';
    }
}

utils.getInput().forEach((line) => {
    if (matches = rAssgin.exec(line)) {
        type = matches[2];
        number = parseInt(matches[3]);

        bot = getBot(bots, type, number);
        bot.assgin(parseInt(matches[1]));
    } else if (matches = rBotGive.exec(line)) {
        type = matches[1];
        number = parseInt(matches[2]);

        bot = getBot(bots, type, number);
        bot.give(getBot(bots, matches[3], parseInt(matches[4])),
            getBot(bots, matches[5], parseInt(matches[6])));
    }
});
console.log(getBot(bots, 'output', 0).low * getBot(bots, 'output', 1).low * getBot(bots, 'output', 2).low)

function getBot(bots, type, number) {
    const key = type + number;
    let bot = bots[key];
    if (!bot) {
        bots[key] = bot = new Bot(type, number);
    }
    return bot;
}