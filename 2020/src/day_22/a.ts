import { getRawInput } from "../utils";

let [inPlayerA, inPlayerB] = getRawInput().split('\n\n');
let cardsA = getInputPerPlayer(inPlayerA);
let cardsB = getInputPerPlayer(inPlayerB);

do {
  let cardA = cardsA.shift();
  let cardB = cardsB.shift();
  if (cardA > cardB) {
    cardsA.push(cardA);
    cardsA.push(cardB);
  } else {
    cardsB.push(cardB);
    cardsB.push(cardA);
  }
} while (cardsA.length > 0 && cardsB.length > 0)
console.log(calculateScore(cardsA.length > 0 ? cardsA : cardsB))

function calculateScore(cards) {
  let score = 0;
  for (let i = 0; i < cards.length; i++) {
    score += cards[i] * (cards.length - i);
  }
  return score;
}

function getInputPerPlayer(input) {
  let lines = input.split('\n');
  lines.shift();
  return lines.map(x => Number(x))
}