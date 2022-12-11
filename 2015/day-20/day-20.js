function getDivisors(num) {
  let divisors = [];
  for (let i = Math.floor(Math.sqrt(num)); i > 0; i--) {
    if (num % i == 0) {
      divisors.push(i);
      let complement = num / i;
      if (i != complement) {
        divisors.push(complement);
      }
    }
  }
  return divisors;
}

function getHouse(numPresentsPerElf, maxHousesPerElf) {
  let house = 1;
  let delivered = [];

  while (true) {
    let numPresents = getDivisors(house).reduce((a, b) => {
      delivered[b] = delivered[b] || 0;
      if (maxHousesPerElf == undefined || delivered[b] < maxHousesPerElf) {
        a = a + (b * numPresentsPerElf);
        delivered[b] += 1;
      }
      return a;
    });

    if (numPresents >= 34000000) {
      break;
    }
    house += 1;
  }

  return house;
}

console.log("Solution 1: " + getHouse(10));
console.log("Solution 2: " + getHouse(11, 50));