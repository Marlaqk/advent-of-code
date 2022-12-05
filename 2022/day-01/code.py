from pathlib import Path

data = Path('input.txt').read_text().split('\n\n')
elfs_calories = sorted([sum([int(c) for c in elf.splitlines()]) for elf in data])

print(elfs_calories[-1])
print(sum(elfs_calories[-3:]))