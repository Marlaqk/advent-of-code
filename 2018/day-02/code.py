import fileinput
from collections import Counter

lines = list(fileinput.input())

def part1():
    has2 = 0
    has3 = 0
    for line in lines:
        c = Counter(line).values()
        has2 += 2 in c
        has3 += 3 in c
    return has2 * has3

def part2():
    for a in lines:
        for b in lines:
            x = ''.join(a for a,b in zip(a,b) if a == b)
            if len(x) == len(a) - 1:
                return x

print(part1())
print(part2())