const fs = require('fs');

const getInput = () => {
  return fs.readFileSync('/dev/stdin').toString().split('\n').filter(line => line !== '');
}

const getRawInput = () => {
  return fs.readFileSync('/dev/stdin').toString();
}

const getIntInput = () => {
  return getInput().map(line => Number(line));
}

const permute = input => {
  const array = Array.from(input);
  const permute = (res, item, key, arr) => {
    return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(perm => [item].concat(perm)) || item);
  };
  return array.reduce(permute, []);
};

const combine = (array, length) => {
  function c(l, r) {
    var ll = l.slice();
    if (r.length === length) {
      result.push(r);
      return;
    }
    while (ll.length) {
      c(ll, r.concat(ll.shift()));
    }
  }
  var result = [];
  c(array, []);
  return result;
}

const sum = arr => arr.reduce((p, c) => p + c, 0);

const getNeighbours = (grid, y_pos, x_pos) => {
  const neighbours = [];
  for (let y = Math.max(0, y_pos - 1); y <= Math.min(y_pos + 1, grid.length - 1); y++) {
    for (let x = Math.max(0, x_pos - 1); x <= Math.min(x_pos + 1, grid[y].length - 1); x++) {
      if (x == x_pos && y == y_pos) continue;
      neighbours.push(grid[y][x])
    }
  }
  return neighbours;
}

module.exports = {
  getInput,
  getRawInput,
  getIntInput,
  permute,
  sum,
  getNeighbours,
  combine,
};