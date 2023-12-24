import { getInput } from '../../utils.js';

const DIG_PLAN = getInput()
let pos = [0, 0] // y, x

const directions = new Map([['R', [0, 1]], ['L', [0, -1]], ['U', [-1, 0]], ['D', [1, 0]]]);
const dirs = ['R', 'D', 'L', 'U']

function calculateArea(isPart2 = false) {let tunnels = [[0, 0]];
    for (let plan of DIG_PLAN) {
        let [dir, steps, c] = plan.split(' ');
        if (isPart2) {
            const color = c.slice(1, -1);
            dir = dirs[color.slice(-1)];
            steps = parseInt(color.slice(1, -1), 16)
        }
        const [dy, dx] = directions.get(dir);
        pos = [pos[0] + (dy*steps), pos[1] + (dx*steps)];
        tunnels.push(pos)
    }
    
    let area = 1;
    for (let i = 1; i < tunnels.length; i++) {
        const [y1, x1] = tunnels[i - 1];
        const [y2, x2] = tunnels[i];
        area += (x1 * y2 - y1 * x2 + Math.abs(y1 - y2 + x1 - x2)) / 2;
    }
    return area;
}


console.log(calculateArea())
console.log(calculateArea(true))