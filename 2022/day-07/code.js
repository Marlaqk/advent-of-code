const utils = require('../../utils');

class Directory {
    
    constructor(name, children) {
        this.name = name;
        this.isDir = true;
        this.children = children;
    }

    getSize() {
        return this.children.reduce((sum, child) => sum + child.getSize(), 0);
    }

    getChildDirs() {
        return this.children.filter(a => a.isDir);
    }

    getChildDirUsingMoreSpace(space) {
        return this.children.filter(a => a.isDir && a.getSize() >= space);
    }

    getChild(path) {
        const matchingChild = this.children.filter(a => a.isDir && a.name == path);
        if (matchingChild.length > 0) {
            return matchingChild[0];
        } else {
            const newDir = new Directory(path, []);
            this.children.push(newDir);
            return newDir;
        }
    }

}

class File {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }

    getSize() {
        return this.size;
    }
}

const commands = utils.getInput();
const root = new Directory('root', [])
let currentNode = root;
let nodeStack = [root];
for(line of commands) {
    if (line.startsWith('$')) {
        let [_, cmd, arg] = line.split(' ');
        if (cmd == 'cd') {
            if (arg == '/') {
                currentNode = root;
                nodeStack = [root];
            } else if (arg == '..') {
                currentNode = nodeStack.pop();
            } else {
                nodeStack.push(currentNode);
                currentNode = currentNode.getChild(arg);
            }
        }
    } else {
        let [a, b] = line.split(' ');
        if (a == 'dir') {
            currentNode.children.push(new Directory(b, []));
        } else {
            currentNode.children.push(new File(b, parseInt(a)))
        }
    }
}

let sumSize = 0;
dirs = [root];
let dir;
while(dir = dirs.pop()) {
    const size = dir.getSize();
    if (size <= 100000) {
        sumSize += size;
    }
    dirs.push(...dir.getChildDirs())
}
console.log(sumSize)

const totalSpace = 70000000;
const freeSpace = totalSpace - root.getSize()
const neededSpace = 30000000 - freeSpace
let chonkers = root.getChildDirUsingMoreSpace(neededSpace)
let sizes = []
while(dir = chonkers.pop()) {
    const childs = dir.getChildDirUsingMoreSpace(neededSpace)
    if (childs) {
        chonkers.push(...childs)
        childs.forEach(d => sizes.push(d.getSize()))
    }
}
console.log(Math.min(...sizes))