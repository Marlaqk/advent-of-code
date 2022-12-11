import fileinput

def parse(numbers):
    nrChild, nrEntries = next(numbers), next(numbers)
    children = []
    entries = []
    for _ in range(nrChild):
        children.append(parse(numbers))
    for _ in range(nrEntries):
        entries.append(next(numbers))
    return (entries, children)

root = parse(map(int, next(fileinput.input()).split()))

def sumEntries(node):
    entries, children = node
    return sum(entries) + sum(sumEntries(x) for x in children)

print(sumEntries(root))

def node_value(node):
    entries, children = node
    if children:
        return sum(node_value(children[childIdx - 1]) for childIdx in entries if 1 <= childIdx and childIdx <= len(children))
    return sum(entries)

print(node_value(root))
