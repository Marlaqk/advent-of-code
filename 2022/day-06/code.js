const utils = require('../../utils');

const packet = utils.getRawInput();

function packetMarker() {
    for(let i = 4; i <= packet.length; i++) {
        if (new Set(packet.slice(i-4, i)).size == 4) {
            return i;
        }
    }
}

function messageMarker() {
    for(let i = 15; i <= packet.length; i++) {
        if (new Set(packet.slice(i-14, i)).size == 14) {
            return i;
        }
    }
}

console.log(packetMarker())
console.log(messageMarker())