function counter() {
    let i = 0
    return {
      [Symbol.iterator]() { return this },
      next() {
        return { done: false, value: i++ }
      }
    }
  }
  
  function map(iter, mapper) {
    return {
      [Symbol.iterator]() { return this },
      next() {
        const step = iter.next()
        return step.done ? step : { done: false, value: mapper(step.value) }
      }
    }
  }
  
  function filter(iter, pred) {
    return {
      [Symbol.iterator]() { return this },
      next() {
        let step
        do {
          step = iter.next()
        } while (!step.done && !pred(step.value))
        return step
      }
    }
  }

  function reduce(iter, reducer, initial) {
    let value = initial
    for (let item of iter) {
      value = reducer(value, item)
      if (value instanceof Reduced) {
        return value.reduced
      }
    }
    return value
  }
  
  function Reduced(value) {
    this.reduced = value
  }
  
  function md5(value) {
    var md5sum = require('crypto').createHash('md5')
    md5sum.update(value)
    return md5sum.digest('hex')
  }
  
  function isInteresting(hash) {
    return hash.slice(0, 5) === '00000'
  }
  
  function positionBit(hash) {
    return parseInt(hash[5], 10)
  }
  
  function passBit(hash) {
    return hash[6]
  }
  
  function passwordReducer(progress, hash) {
    const position = positionBit(hash)
    if (position < 8 && progress[position] === '_') {
      const newPass = progress.slice(0, position) + passBit(hash) + progress.slice(position + 1)
      console.log(newPass) // for cinematic effect
      return newPass.indexOf('_') === -1 ? new Reduced(newPass) : newPass
    }
    return progress
  }
  
  function findPassword(input) {
    let iter = counter()
    iter = map(iter, n => md5(input + n))
    iter = filter(iter, isInteresting)
    return reduce(iter, passwordReducer, '________')
  }
  
  const input = 'abbhdwsy'
  console.log(findPassword(input))