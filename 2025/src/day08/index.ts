import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const byDist = new Map<number, string>;
  const points = parseInput(rawInput).split('\n');

  let circuits: string[] = [];
  const biDir = new Set();
  for (let pA of points) {
    circuits.push(pA);
    for (let pB of points) {
      if (pA == pB || biDir.has(getConnectionKey(pA,pB))) continue;

      const [pAx, pAy, pAz] = pA.split(',').map(Number);
      const [pBx, pBy, pBz] = pB.split(',').map(Number);
      const dist = Math.sqrt(Math.pow(pAx - pBx, 2) + Math.pow(pAy - pBy, 2) + Math.pow(pAz - pBz, 2));

      biDir.add(getConnectionKey(pA,pB));
      byDist.set(dist, getConnectionKey(pA,pB));
    }
  }

  function getConnectionKey(pA: string, pB: string) {
    return [pA, pB].sort().join('<->');
  }

  // build a map dist, conn
  const minDists = Array.from(byDist.keys()).sort((a,b) => a - b);

  for (let i = 0; i < 1000; i++) {
    const [pA,pB] = byDist.get(minDists[i]).split('<->');

    const pAIdx = circuits.findIndex(c =>  c.includes(pA) )
    const pBIdx = circuits.findIndex(c =>  c.includes(pB) )

    if (pAIdx == -1) {
      circuits[pBIdx] += `<->${pA}`;
    } else if (pBIdx == -1) {
      circuits[pAIdx] += `<->${pB}`;
    } else if (pAIdx == pBIdx) {
      continue;
    } else {
      // merge two circuits
      const newC = `${circuits[pAIdx]}<->${circuits[pBIdx]}`;
      circuits = circuits.filter(v => !v.includes(pA) && !v.includes(pB));
      circuits.push(newC)
    }
  }

  const cSizes = circuits.map(v => v.split('<->').length).sort((a,b) => b - a);

  return cSizes[0] * cSizes[1] * cSizes[2];
};

const part2 = (rawInput: string) => {
  const byDist = new Map<number, string>;
  const points = parseInput(rawInput).split('\n');

  let circuits: string[] = [];
  const biDir = new Set();
  for (let pA of points) {
    circuits.push(pA)
    for (let pB of points) {
      if (pA == pB || biDir.has(getConnectionKey(pA,pB))) continue;

      const [pAx, pAy, pAz] = pA.split(',').map(Number);
      const [pBx, pBy, pBz] = pB.split(',').map(Number);
      const dist = Math.pow(pAx - pBx, 2) + Math.pow(pAy - pBy, 2) + Math.pow(pAz - pBz, 2);

      biDir.add(getConnectionKey(pA,pB));
      byDist.set(dist, getConnectionKey(pA,pB));
    }
  }

  function getConnectionKey(pA: string, pB: string) {
    return [pA, pB].sort().join('<->');
  }

  // build a map dist, conn
  const minDists = Array.from(byDist.keys()).sort((a,b) => a - b);

  let i = 0;
  let lastA, lastB;
  while (circuits.length > 1) {
    i++;
    const [pA,pB] = byDist.get(minDists[i]).split('<->');
    lastA = pA;
    lastB = pB;

    const pAIdx = circuits.findIndex(c =>  c.includes(pA) )
    const pBIdx = circuits.findIndex(c =>  c.includes(pB) )

    if (pAIdx == -1) {
      circuits[pBIdx] += `<->${pA}`;
    } else if (pBIdx == -1) {
      circuits[pAIdx] += `<->${pB}`;
    } else if (pAIdx == pBIdx) {
      continue;
    } else {
      // merge two circuits
      const newC = `${circuits[pAIdx]}<->${circuits[pBIdx]}`;
      circuits = circuits.filter(v => !v.includes(pA) && !v.includes(pB));
      circuits.push(newC)
    }
  }

  const [xA] = lastA.split(',').map(Number)
  const [xB] = lastB.split(',').map(Number)
  return xA * xB
};

run({
  part1: {
    tests: [
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
        `,
        expected: 25272,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
