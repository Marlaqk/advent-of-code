import { getInput } from '../../utils.js';

const DECKS = getInput().map(l => {
    const [hand, bid] = l.split(' ');
    const handMap = new Map();
    hand.split('').forEach(c => handMap.has(c) ? handMap.set(c, handMap.get(c) + 1) : handMap.set(c, 1));
    return { bid: Number(bid), hand, handMap }
});

const CARDS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

// sort by type weakest first
DECKS.sort(function (deckA, deckB) {
    if (deckA.handMap.size < deckB.handMap.size) {
        return 1;
    } else if (deckA.handMap.size == deckB.handMap.size) {
        if (Math.max(...deckA.handMap.values()) == Math.max(...deckB.handMap.values())) {
            for (let idx = 0; idx < deckA.hand.length; idx++) {
                if (deckA.hand[idx] == deckB.hand[idx]) continue;
                return CARDS.indexOf(deckB.hand[idx]) - CARDS.indexOf(deckA.hand[idx]);
            }
            return 0;
        }
        return Math.max(...deckA.handMap.values()) - Math.max(...deckB.handMap.values())
    }
    return -1;
})
console.log('Part-1:', DECKS.reduce((acc, deck, idx) => acc + deck.bid * (idx + 1), 0))

function getCountWithJoker(deck) {
    const jokerCount = deck.handMap.get('J') || 0;
    return  Math.max(Math.max(...[...deck.handMap.entries()].filter(el => el[0] != 'J').map(el => el[1])), 0) + jokerCount;
}

function getDeckSize(deck) {
    if (deck.handMap.has('J')) {
        return deck.handMap.size - 1 || 1;
    }
    return deck.hand.size;
}

const NEW_RULES = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
DECKS.sort(function (deckA, deckB) {
    const cardCountA = getCountWithJoker(deckA)
    const cardCountB = getCountWithJoker(deckB)
    const sizeA = getDeckSize(deckA);
    const sizeB = getDeckSize(deckB);
    if (sizeA < sizeB) {
        return 1;
    } else if (sizeA == sizeB) {
        if (cardCountA == cardCountB) {
            for (let idx = 0; idx < deckA.hand.length; idx++) {
                if (deckA.hand[idx] == deckB.hand[idx]) continue;
                return NEW_RULES.indexOf(deckB.hand[idx]) - NEW_RULES.indexOf(deckA.hand[idx]);
            }
        }
        return cardCountA - cardCountB;
    }
    return -1
})

console.log('Part-2:', DECKS.reduce((acc, deck, idx) => acc + deck.bid * (idx + 1), 0))