import { getRawInput } from "../utils";

let [rulesIn, myTicketIn, ticketsIn] = getRawInput().split("\r\n\r\n");

let rules = [];
rulesIn.split("\n").forEach((rule) => {
  let numbersCoveredInRule = new Map();
  const name = rule.substring(0, rule.indexOf(": "));
  rule
    .substring(rule.indexOf(": ") + 2)
    .split(" or ")
    .forEach((range) => {
      let [start, end] = range.split("-").map((val) => Number(val));
      for (let i = start; i <= end; i++) {
        numbersCoveredInRule.set(i, i);
      }
    });
  rules.push({
    rule: name,
    numbersAllowed: numbersCoveredInRule,
  });
});

const tickets = ticketsIn.split("\r\n").slice(1);
let validTickets = [];
rules.forEach((_rule) => validTickets.push([]));

tickets.forEach((ticket) => {
  let ticketValues = ticket.split(",");
  let foundAllTicketValues = true;
  ticketValues.forEach((ticketValue) => {
    let foundInRules = false;
    rules.forEach((rule) =>
      rule.numbersAllowed.get(Number(ticketValue))
        ? (foundInRules = true)
        : null
    );
    if (!foundInRules) foundAllTicketValues = false;
  });
  if (foundAllTicketValues) {
    for (let i = 0; i < ticketValues.length; i++) {
      validTickets[i].push(Number(ticketValues[i]));
    }
  }
});

let rulesPerCol = [];
for (let i = 0; i < validTickets.length; i++) {
  let matchingRules = [];
  for (let j = 0; j < rules.length; j++) {
    let numberNotFound = false;
    for (let y = 0; y < validTickets[i].length && !numberNotFound; y++) {
      if (!rules[j].numbersAllowed.get(validTickets[i][y]))
        numberNotFound = true;
    }
    if (!numberNotFound) {
      matchingRules.push(rules[j].rule);
    }
  }
  rulesPerCol.push(matchingRules);
}

const usedRules = new Set();
const colToName = new Map();
for (let len = 1; len <= validTickets[0].length; len++) {
  for (let col = 0; col < rulesPerCol.length; col++) {
    if (rulesPerCol[col].length == len) {
      const filteredRules = rulesPerCol[col].filter(
        (name) => !usedRules.has(name)
      );
      colToName.set(col, filteredRules[0]);
      usedRules.add(filteredRules[0]);
      break;
    }
  }
}

const myTicket = myTicketIn.split('\r\n')[1].split(',').map(x => Number(x));
let magicNumber = 1;
colToName.forEach((value, key) => {
  if (value.startsWith('departure')) {
    magicNumber *= myTicket[key]
  }
})

console.log(magicNumber);