import { getInput, getNumberGridInput, getRawInput, sum } from '../../utils.js';

const [workflowsIn, ratings] = getRawInput().split('\n\n')

const workflow = new Map();
for (let w of workflowsIn.split('\n')) {
    const [key, rest] = w.split('{');
    const instructions = rest.slice(0, -1).split(',');
    workflow.set(key, instructions.map(i => {
        if (i.indexOf(':') == -1) {
            return { dest: i }
        } else {
            const [c, dest] = i.split(':')
            const variable = c.slice(0, 1);
            const cond = c.slice(1, 2);
            const num = Number(c.slice(2));
            return { variable, cond, num, dest }
        }
    }))
}

function checkCondition(condition, curRanges, nextRanges) {
    if (!condition.variable) return;
    if (condition.cond === "<") {
        curRanges[condition.variable].max = condition.num - 1;
        nextRanges[condition.variable].min = condition.num;
    } else {
        curRanges[condition.variable].min = condition.num + 1;
        nextRanges[condition.variable].max = condition.num;
    }
};

const rangeSize = ({ min, max }) => Math.max(0, max - min + 1);

let acceptedCombinations = 0;

const stack = [
    {
        dest: "in",
        ranges: {
            x: { min: 1, max: 4000 },
            m: { min: 1, max: 4000 },
            a: { min: 1, max: 4000 },
            s: { min: 1, max: 4000 },
        },
    },
];

while (stack.length) {
    const { dest, ranges } = stack.pop();
    let curRanges;
    let nextRanges = ranges;
    for (const step of workflow.get(dest)) {
        curRanges = JSON.parse(JSON.stringify(nextRanges));
        checkCondition(step, curRanges, nextRanges);
        if (step.dest === "R") continue;
        if (step.dest === "A") {
            acceptedCombinations +=
                rangeSize(curRanges.x) *
                rangeSize(curRanges.m) *
                rangeSize(curRanges.a) *
                rangeSize(curRanges.s);
            continue;
        }
        stack.push({ dest: step.dest, ranges: curRanges });
    }
}
console.log(acceptedCombinations)