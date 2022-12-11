import { getRawInput, mapMatrix } from "../utils";
import { cloneDeep } from "lodash";

const isEmpty = (spot) => spot === "L";
const isOccupied = (spot) => spot === "#";

const countLine = (lastX, lastY, map, getNext) => {
  const [x, y] = getNext(lastX, lastY);

  if (!map[y] || !map[y][x] || isEmpty(map[y][x])) {
    return 0;
  }

  if (isOccupied(map[y][x])) {
    return 1;
  }

  return countLine(x, y, map, getNext);
};

const countVisible = ([x, y], map) => {
  let count = 0;

  count += countLine(x, y, map, (x, y) => [x - 1, y - 1]);
  count += countLine(x, y, map, (x, y) => [x, y - 1]);
  count += countLine(x, y, map, (x, y) => [x + 1, y - 1]);
  count += countLine(x, y, map, (x, y) => [x - 1, y]);
  count += countLine(x, y, map, (x, y) => [x + 1, y]);
  count += countLine(x, y, map, (x, y) => [x - 1, y + 1]);
  count += countLine(x, y, map, (x, y) => [x, y + 1]);
  count += countLine(x, y, map, (x, y) => [x + 1, y + 1]);

  return count;
};

const setField = (spot, coords, map) => {
  const visibleOccupied = countVisible(coords, map);

  if (isEmpty(spot) && visibleOccupied === 0) {
    return "#";
  }

  if (isOccupied(spot) && visibleOccupied >= 5) {
    return "L";
  }

  return spot;
};

const countOccupiedSeats = (map) => (map.join('').match(/#/g) || []).length;

let newBoard = getRawInput()
  .split("\r\n")
  .map((el) => el.split(""));
let board;

do {
  board = newBoard;
  newBoard = mapMatrix(board, setField);
} while (countOccupiedSeats(board) !== countOccupiedSeats(newBoard));

console.log(countOccupiedSeats(board));
