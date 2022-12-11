import fileinput
import string

poly = next(fileinput.input()).strip()

def react(x):
    result = ['']
    for c in x:
        if c == result[-1].swapcase():
            result.pop()
        else:
            result.append(c)
    return ''.join(result)
    
# part 1
print(len(react(poly)))

# part 2
alphabet = list(string.ascii_lowercase)
print(min(len(react(poly.replace(c, '').replace(c.upper(), ''))) for c in alphabet))
