const utils = require('../utils');

const input = JSON.parse(utils.getRawInput())

const reducer = values => values.reduce((t, value ) => {
    if (typeof value === 'number') {
        return t + value
    } else if (typeof value === 'object') {
        if (!Array.isArray(value) && Object.values(value).indexOf('red') !== -1) {
            return t
        }
        return t + reducer(Object.values(value))
    }
    return t
}, 0)

console.log(reducer(Object.values(input)))