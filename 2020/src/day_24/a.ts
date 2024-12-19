import { getInput } from "../utils";

let input = getInput();
console.log(determineFlippedTiles(input).length);

function parseTileInstruction(str) {
  let moves = { "e": 0, "w": 0, "ne": 0, "nw": 0, "se": 0, "sw": 0 };

  let idx = 0;

  while (idx < str.length) {
    let move;
    if (str[idx] == "e" || str[idx] == "w") move = str[idx];
    else move = str.substring(idx, idx + 2);

    moves[move] = (moves[move] || 0) + 1;
    idx += move.length;
  }

  // Turn opposite directions into one axis
  moves["e"] -= moves["w"];
  moves["ne"] -= moves["sw"];
  moves["nw"] -= moves["se"];

  // Consolidate nw into e and ne
  moves["e"] -= moves["nw"];
  moves["ne"] += moves["nw"];

  return [moves["e"], moves["ne"]];
}

function determineFlippedTiles(input) {
  let flips = {};

  let results = input.map(parseTileInstruction);

  for (let result of results) {
    flips[result] = !(flips[result] || false);
  }

  return Object.keys(flips).filter(k => flips[k]);
}