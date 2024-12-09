import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const disk = parseInput(rawInput).split('').map(Number).flatMap((size, i) =>
    new Array(size).fill(i % 2 ? "." : i / 2),
  );

  let left = 0;
  let right = disk.length - 1;
  while (left <= right) {
    if (disk[left] == '.' && disk[right] != '.') {
      disk[left] = disk[right];
      disk[right] = '.';
      right--;
      left++;
    }
    else if (disk[right] == '.') right--;
    else if (disk[left] != '.') left++;
  }

  return disk.reduce((sum, v, idx) => {
    return v == '.' ? sum  : sum + v * idx;
  }, 0);
};

interface File {
  id: string | number;
  size: number;
}

function compactDisk(files: File[]) {
  for (let j = files.length - 1; j >= 0; j--) {
    if (files[j].id === ".") continue;
    let file = files[j];

    for (let i = 0; i < j; i++) {
      let free = files[i];
      if (free.id === "." && free.size >= file.size) {
        free.size -= file.size;
        files[j] = { id: ".", size: file.size };
        files.splice(i, 0, file);
        break;
      }
    }
  }
  return files;
}

const part2 = (rawInput: string) => {
  const diskMap = parseInput(rawInput).split('').map(Number);
  let files = diskMap.map((size, i) => ({ id: i % 2 ? "." : i / 2, size }));
  compactDisk(files);
  let blocks = files.flatMap(({ id, size }) => new Array(size).fill(id));
  return blocks.reduce((sum, v, idx) => {
    return v == '.' ? sum  : sum + v * idx;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
