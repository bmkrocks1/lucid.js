import { expect } from 'chai'
import { isArray, isObject } from '../src/lib/util'

/**
 * @param {Function} fn
 * @param {(String|Array|Object)} input
 * @param {(String|Array|Object)} output
 * @param {String} message
 */
export const expectToDeepEqual = (fn, input, output, message) => {
  it(message, function() {
    expect(fn(input)).to.deep.equal(output)
  })
}

/**
 * @param {Function} fn
 * @param {(String|Array|Object)} input
 * @param {(String|Array|Object)} output
 * @param {Array.<String>} messages
 */
export const expectToDeepEqualAndNotMutate = (fn, input, output, messages) => {
  // make copy of input
  let original = isArray(input) ?
    [...input] :
    isObject(input) ?
      Object.assign({}, input) :
      input

  expectToDeepEqual(fn, input, output, messages[0])

  it(messages[1], function() {
    expect(input).to.deep.equal(original)
  })
}

export const expectToThrowError = (fn, input, error, message) => {
  it(message, function() {
    expect(function() { fn(input) }).to.throw(error)
  })
}
