

export function getCharGrid(input: string): string[][] {
    return input.split('\n').map(line => [...line]);
}

export function getNumberGrid(input: string): number[][] {
    return input.split('\n').map(line => line.split('').map(Number));
}


export function extractFromGrid(grid: string[][], start: number[], position: number[]): string | undefined {
    return grid[start[0] + position[0]]?.[start[1] +position[1]] || undefined;
}

export function newPosition(start: number[], position: number[]) {
    return [start[0] + position[0], start[1] + position[1]];
}

export function getValue(grid: string[][], position: number[]): string | undefined {
    return grid[position[0]]?.[position[1]] || undefined;
}

export function printGrid(grid: string[][]) {
    grid.forEach(line => {
        console.log(line.join(''))
    })
}

export function findPosition(grid: string[][], search: string) {
    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === search) {
                return [ y, x ]
            }
        }
    }

    return [0,0]
}