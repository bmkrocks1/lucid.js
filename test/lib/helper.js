/**
 * lucid.js - test/lib/helper
 *
 * @author Billie Ko <bmkrocks@gmail.com>
 */

const expect = require('chai').expect
const { isArray, isObject } = require('../../src/lib/util')

/**
 * @param {Function} fn
 * @param {(String|Array|Object)} input
 * @param {(String|Array|Object)} output
 * @param {String} message
 */
const expectToDeepEqual = (fn, input, output, message) => {
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
const expectToDeepEqualAndNotMutate = (fn, input, output, messages) => {
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

module.exports = {
  expectToDeepEqual,
  expectToDeepEqualAndNotMutate
}
