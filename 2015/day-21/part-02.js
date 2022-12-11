const BOSS = {
  hp: 109,
  damage: 8,
  armor: 2,
};

const ME = { cost: 0, hp: 100, damage: 0, armor: 0 };

const WEAPONS = [
  { item: 'Dagger', cost: 8, damage: 4, armor: 0 },
  { item: 'Shortsword', cost: 10, damage: 5, armor: 0 },
  { item: 'Warhammer', cost: 25, damage: 6, armor: 0 },
  { item: 'Longsword', cost: 40, damage: 7, armor: 0 },
  { item: 'Greataxe', cost: 74, damage: 8, armor: 0 },
];
const ARMOR = [
  {},
  { item: 'Leather', cost: 13, damage: 0, armor: 1 },
  { item: 'Chainmail', cost: 31, damage: 0, armor: 2 },
  { item: 'Splintmail', cost: 53, damage: 0, armor: 3 },
  { item: 'Bandedmail', cost: 75, damage: 0, armor: 4 },
  { item: 'Platemail', cost: 102, damage: 0, armor: 5 },
];
const RINGS = [
  {},
  { item: 'Damage +1', cost: 25, damage: 1, armor: 0 },
  { item: 'Damage +2', cost: 50, damage: 2, armor: 0 },
  { item: 'Damage +3', cost: 100, damage: 3, armor: 0 },
  { item: 'Defense +1', cost: 20, damage: 0, armor: 1 },
  { item: 'Defense +2', cost: 40, damage: 0, armor: 2 },
  { item: 'Defense +3', cost: 80, damage: 0, armor: 3 },
];

const RING_COMBINATIONS = (() => {
  const combinations = [ [ RINGS[0], RINGS[0] ] ];
  
  const max = RINGS.length - 1;

  for (let i = 0; i < max; i++) {
    const ring1 = RINGS[i];

    for (let j = i + 1; j < RINGS.length; j++) {
     combinations.push([ ring1, RINGS[j] ]);
    }
  }

  return combinations;
})();

function* buildGearPermutationIterator() {
  for (const weapon of WEAPONS) {
    for (const armor of ARMOR) {
      for (const rings of RING_COMBINATIONS) {
        yield [ weapon, armor, ...rings ];
      }
    }
  }
}

const battle = (me, boss) => {
  const myDamagePerTurn = Math.max(me.damage - boss.armor, 1);
  const myTurnsToWin = Math.ceil(boss.hp / myDamagePerTurn);
  const bossDamagePerTurn = Math.max(boss.damage - me.armor, 1);
  const bossTurnsToWin = Math.ceil(me.hp / bossDamagePerTurn);
  return myTurnsToWin <= bossTurnsToWin;
};

const equip = gear => gear.reduce((stats, item) => {
  Object.entries(item).forEach(([ key, value ]) => {
    stats[key] += value;
  });
  return stats;
}, { ...ME, gear });

const iter = buildGearPermutationIterator();
let cost = -Infinity;
let entry = iter.next();
while(entry.value) {
  const me = equip(entry.value);
  const won = battle(me, { ...BOSS });
  if (!won && me.cost > cost) {
    cost = me.cost;
  }
  entry = iter.next()
}

console.log(cost)