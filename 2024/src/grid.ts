

export function getCharGrid(input: string): string[][] {
    return input.split('\n').map(line => [...line]);
}

export function getNumberGrid(input: string): number[][] {
    return input.split('\n').map(line => line.split('').map(Number));
}


export function extractFromGrid(grid: string[][], start: number[], position: number[]): string | undefined {
    return grid[start[0] + position[0]]?.[start[1] +position[1]] || undefined;
}