import fileinput
from collections import defaultdict
import re

lines = list(fileinput.input())
ids = defaultdict(set)
for line in lines:
    id, x, y, width, height = map(int, re.findall(r'\d+', line))
    for j in range(y, y + height):
        for i in range(x, x + width):
            ids[(i, j)].add(id)

print(sum(len(x) > 1 for x in ids.values()))

all_ids = set()
invalid_ids = set()
for x in ids.values():
    all_ids |= x
    if len(x) > 1:
        invalid_ids |= x

print(all_ids - invalid_ids)