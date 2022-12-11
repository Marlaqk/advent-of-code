import { getRawInput, mapMatrix } from "../utils";
import { cloneDeep } from "lodash";

const isEmpty = (spot) => spot === "L";
const isOccupied = (spot) => spot === "#";

const countAdjacent = ([x, y], map) => {
  let count = 0;

  if (map[y - 1] && isOccupied(map[y - 1][x - 1])) count += 1;
  if (map[y - 1] && isOccupied(map[y - 1][x])) count += 1;
  if (map[y - 1] && isOccupied(map[y - 1][x + 1])) count += 1;
  if (isOccupied(map[y][x - 1])) count += 1;
  if (isOccupied(map[y][x + 1])) count += 1;
  if (map[y + 1] && isOccupied(map[y + 1][x - 1])) count += 1;
  if (map[y + 1] && isOccupied(map[y + 1][x])) count += 1;
  if (map[y + 1] && isOccupied(map[y + 1][x + 1])) count += 1;

  return count;
};

const setField = (spot, coords, map) => {
  const adjacents = countAdjacent(coords, map);

  if (isEmpty(spot) && adjacents === 0) {
    return "#";
  }

  if (isOccupied(spot) && adjacents >= 4) {
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
