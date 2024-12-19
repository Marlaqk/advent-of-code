import { getRawInput } from "../utils";

let [inPlayerA, inPlayerB] = getRawInput().split('\n\n');
let cardsA = getInputPerPlayer(inPlayerA);
let cardsB = getInputPerPlayer(inPlayerB);

let [finishedA, finishedB] = playGame(cardsA, cardsB);
console.log(calculateScore(finishedA.length > 0 ? finishedA : finishedB))

function playGame(cardsA, cardsB) {
  let playedCombinations = new Set();
  do {
    const gameAsString = parseString(cardsA, cardsB);
    if (playedCombinations.has(gameAsString)) {
      return [cardsA, []];
    }
    playedCombinations.add(gameAsString);

    let cardA = cardsA.shift();
    let cardB = cardsB.shift();

    if (cardA <= cardsA.length && cardB <= cardsB.length) {
      let [subA, subB] = playGame(cardsA.slice(0, cardA), cardsB.slice(0, cardB));
      if (subA.length > 0) {
        cardsA.push(cardA);
        cardsA.push(cardB);
      } else {
        cardsB.push(cardB);
        cardsB.push(cardA);
      }
    } else {
      if (cardA > cardB) {
        cardsA.push(cardA);
        cardsA.push(cardB);
      } else {
        cardsB.push(cardB);
        cardsB.push(cardA);
      }
    }

  } while (cardsA.length > 0 && cardsB.length > 0)
  return [cardsA, cardsB];
}

function parseString(cardsA, cardsB) {
  return cardsA.join(',') + '|' + cardsB.join(',');
}

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