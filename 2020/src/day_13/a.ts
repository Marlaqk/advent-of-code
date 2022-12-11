import { getRawInput } from "../utils";

const [earliestTime, busInput] = getRawInput().split('\n');
const buses = busInput.split(',').filter(bus => bus !== 'x');

let shortestWaitTime = {
  'bus': 0,
  'waitTime': Infinity
}
buses.forEach(bus => {
  const waitTime = (Number(bus) * Math.ceil(Number(earliestTime) / Number(bus))) - Number(earliestTime);
  if (waitTime < shortestWaitTime.waitTime) {
    shortestWaitTime.bus = Number(bus);
    shortestWaitTime.waitTime = waitTime;
  }
})

console.log(shortestWaitTime.bus * shortestWaitTime.waitTime)