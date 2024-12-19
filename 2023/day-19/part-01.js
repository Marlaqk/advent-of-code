import { getRawInput, sum } from '../../utils.js';

const [workflowsIn, ratings] = getRawInput().split('\n\n')

const workflow = new Map();
for(let w of workflowsIn.split('\n')) {
    const [key, rest] = w.split('{');
    const instructions = rest.slice(0, -1).split(',');
    workflow.set(key, instructions.map(i => {
        if (i.indexOf(':') == -1) {
            return { dest: i}
        } else {
            const [c, dest] = i.split(':')
            const variable = c.slice(0,1);
            const cond = c.slice(1,2);
            const num = Number(c.slice(2));
            return { variable, cond, num, dest}
        }
    }))
}

function checkCondition(condition, inst) {
    if (!condition.variable) return true;
    if (condition.cond == '>') return inst[condition.variable] > condition.num;
    return inst[condition.variable] < condition.num;
}

function applyCondition(inst) {
    let d = 'in';
    while (d != 'A' && d != 'R') {
        const conditions = workflow.get(d);
        for (let i = 0; i < conditions.length; i++) {
            if (checkCondition(conditions[i], inst)) {
                d = conditions[i].dest;
                break;
            }
        }
    }
    if (d == 'A') {
        return sum(Object.values(inst))
    }

    return 0;
}

console.log(ratings.split('\n').reduce((acc, w) => {
    const inst = w.slice(1, -1).split(',').reduce((obj, l) => {
        const [v, n] = l.split('=');
        obj[v] = Number(n);
        return obj;
    }, {});
    return acc + applyCondition(inst)
}, 0))