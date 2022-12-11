import fileinput

lines = list(fileinput.input())

def part1():
    return sum(map(int, lines))

def part2():
    freq = 0
    seen = {freq}
    while True:
        for line in lines:
            change = int(line)
            freq += change
            if freq in seen:
                return freq
            else:
                seen.add(freq)

print(part1())
print(part2())