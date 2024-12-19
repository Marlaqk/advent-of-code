import * as fs from 'fs';

export const getInput = () => {
  return fs.readFileSync('/dev/stdin').toString().split('\n');
}

export const getRawInput = () => {
  return fs.readFileSync('/dev/stdin').toString();
}

export const getCharGridInput = () => {
  return getInput().map(rowStr => [...rowStr]);
}

export const getNumberGridInput = () => {
  return getCharGridInput().map(row => row.map(v => Number(v)))
}

export const getIntInput = () => {
  return getInput().map(line => Number(line));
}

export const permute = input => {
  const array = Array.from(input);
  const permute = (res, item, key, arr) => {
    return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(perm => [item].concat(perm)) || item);
  };
  return array.reduce(permute, []);
};

export const deepCopyMap = map => {
  return new Map(JSON.parse(
    JSON.stringify(Array.from(map))
  ));

}

export const sum = arr => arr.reduce((p, c) => p + c, 0);

export const multiply = arr => arr.reduce((a, b) => a * b);

export const getNums = text => text.match(/(\d+)/g).map(v => Number(v));

export const getNeighbours = (grid, y_pos, x_pos) => {
  const neighbours = [];
  for (let y = Math.max(0, y_pos - 1); y <= Math.min(y_pos + 1, grid.length - 1); y++) {
    for (let x = Math.max(0, x_pos - 1); x <= Math.min(x_pos + 1, grid[y].length - 1); x++) {
      if (x == x_pos && y == y_pos) continue;
      neighbours.push(grid[y][x])
    }
  }
  return neighbours;
}

export const getNeighboursIndex = (grid, y_pos, x_pos) => {
  const neighbours = [];
  for (let y = Math.max(0, y_pos - 1); y <= Math.min(y_pos + 1, grid.length - 1); y++) {
    for (let x = Math.max(0, x_pos - 1); x <= Math.min(x_pos + 1, grid[y].length - 1); x++) {
      if (x == x_pos && y == y_pos) continue;
      neighbours.push({y,x})
    }
  }
  return neighbours;
}


export class Node {

  constructor(value) {
    this.value = value;
    this.right = this;
    this.left = this;
  }

  addToRight(neighbor) {
    if (this.right) {
      this.right.left = neighbor;
    }
    neighbor.right = this.right;
    neighbor.left = this;
    this.right = neighbor;
  }

  visitLeft(times = 1) {
    let node = this;
    for (let i = 0; i < times; i++) {
        node = node.left
    }
    return node;
  }

  remove() {
    const left = this.left;
    const right = this.right;
    left.right = right;
    right.left = left;
    this.right = null;
    this.left = null;
  }

}