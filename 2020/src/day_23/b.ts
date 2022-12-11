import { getRawInput } from "../utils";

let cups: number[] = getRawInput().split('').map((cup) => parseInt(cup, 10));

let max = cups.reduce((max, cur) => Math.max(max, cur), -1);
let min = cups.reduce((min, cur) => Math.min(min, cur), max);
for (let i = max + 1; i <= 1000000; i++) {
  cups.push(i);
}
max = 1000000;

const turns = 10000000;
let [current, linkedCups] = generateLinkedList(cups);
for (let i = 1; i <= turns; i++) {
  let pickStart = current.next;
  let pickEnd = pickStart.next.next;
  let pickSet = [pickStart.value, pickStart.next.value, pickEnd.value];

  // remove pick set from list
  current.next = pickEnd.next;
  pickEnd.next.prev = current;
  pickStart.prev = null;
  pickEnd.next = null;

  let destination = current.value - 1;
  while (!linkedCups.has(destination) || pickSet.indexOf(destination) != -1) {
    destination--;
    if (destination < min) {
      destination = max;
    }
  }
  let pickDest = linkedCups.get(destination);

  // splice the set into pick destination
  pickEnd.next = pickDest.next;
  pickEnd.next.prev = pickEnd;
  pickDest.next = pickStart;
  pickStart.prev = pickDest;

  current = current.next;
}

let start = linkedCups.get(1);
console.log(`Next ${start.next.value} * ${start.next.next.value} => ${start.next.value * start.next.next.value}`);

function generateLinkedList(cups) {
  let linkedList = new Map();
  let head, prev;
  for (let i = 0; i < cups.length; i++) {
    let item = {
      value: cups[i],
      next: null,
      prev: prev
    }

    linkedList.set(cups[i], item);

    if (prev) {
      prev.next = item;
    }

    if (!head) {
      head = prev;
    }
    prev = item;
  }

  head.prev = prev;
  prev.next = head;

  return [head, linkedList]
}