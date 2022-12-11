const cardPublicKey = 12092626;
const doorPublicKey = 4707356;
const subject = 7;

const cardLoopSize = findLoopSize(subject, cardPublicKey);
console.log(transform(doorPublicKey, cardLoopSize));

function findLoopSize(subject, wanted) {
  let curr = 1;
  let currLoopSize = 1;
  while (true) {
    curr *= subject;
    curr = curr % 20201227;
    if (curr == wanted) {
      return currLoopSize;
    }
    currLoopSize++;
  }
}

function transform(subject, loopSize) {
  let curr = 1;
  for (let i = 0; i < loopSize; i++) {
    curr *= subject;
    curr = curr % 20201227;
  }
  return curr;
}