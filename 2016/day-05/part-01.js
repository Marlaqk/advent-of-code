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
  
  function take(iter, count) {
    return {
      [Symbol.iterator]() { return this },
      next() {
        return count-- > 0 ? iter.next() : { done: true, value: undefined }
      }
    }
  }
  
  function md5(value) {
    var md5sum = require('crypto').createHash('md5')
    md5sum.update(value)
    return md5sum.digest('hex')
  }
  
  function isInteresting(hash) {
    return hash.slice(0, 5) === '00000'
  }
  
  function passBit(hash) {
    return hash[5]
  }
  
  function findPassword(input) {
    let iter = counter()
    iter = map(iter, n => md5(input + n))
    iter = filter(iter, isInteresting)
    iter = map(iter, passBit)
    iter = take(iter, 8)
    return [ ...iter ].join('')
  }
  
  const input = 'abbhdwsy'
  console.log(findPassword(input))