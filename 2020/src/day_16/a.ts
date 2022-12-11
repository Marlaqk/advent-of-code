import { getRawInput } from "../utils";

let [rulesIn, myTicketIn, ticketsIn] = getRawInput().split('\r\n\r\n');

let numbersCoveredInRule = new Map();
rulesIn.split('\n').forEach(rule => {
  rule.substring(rule.indexOf(': ') + 2).split(' or ').forEach(range => {
    let [start, end] = range.split('-').map(val => Number(val));
    for (let i = start; i <= end; i++) {
      numbersCoveredInRule.set(i, i);
    }
  })
})

const tickets = ticketsIn.split('\r\n').slice(1);
let errorRate = 0;
tickets.forEach(ticket => {
  let ticketValues = ticket.split(',');
  ticketValues.forEach(ticketValue => {
    if (!numbersCoveredInRule.get(Number(ticketValue))) {
      errorRate += Number(ticketValue);
    }
  })
});

console.log(errorRate)