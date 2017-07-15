/**
 * lucid.js - util
 *
 * @author Billie Ko<bmkrocks@gmail.com>
 */

const assert = require('chai').assert
const util = require('../../src/lib/util')

describe('util.isObject(arg)', function() {
  it('should return true if arg is an object literal', function() {
    assert.isTrue(util.isObject({}), '{} is an object literal')
  })

  it('should return false for undefined or invalid arg', function() {
    assert.isFalse(util.isObject(undefined), 'undefined is not an object literal')
    assert.isFalse(util.isObject(null), 'null is not an object literal')
    assert.isFalse(util.isObject([]), '{} is not an object literal')
    assert.isFalse(util.isObject(''), 'empty string is not an object literal')
    assert.isFalse(util.isObject(1), '1 is not an object literal')
  })
})

describe('util.hasNameId(arg)', function() {
  it('should return true if arg is is an object and has name and id property', function() {
    assert.isTrue(util.hasNameId({ id: 'foo', name: 'bar' }), '{ id: \'foo\', name: \'bar\' } is valid')
  })

  it('should return false for undefined or invalid arg', function() {
    assert.isFalse(util.hasNameId(undefined), 'undefined is invalid')
    assert.isFalse(util.hasNameId(null), 'null is invalid')
    assert.isFalse(util.hasNameId([]), '[] is invalid')
  })

  it('should throw an error if arg does not have a valid id or name property', function() {
    assert.throws(() => util.hasNameId({}), new RegExp(util.ERR_OBJ_NO_ID))
    assert.throws(() => util.hasNameId({ name: 'missing-id' }), new RegExp(util.ERR_OBJ_NO_ID))
    assert.throws(() => util.hasNameId({ id: '', name: 'bar' }), new RegExp(util.ERR_OBJ_NO_ID))
    assert.throws(() => util.hasNameId({ id: false, name: 'bar' }), new RegExp(util.ERR_OBJ_NO_ID))
    assert.throws(() => util.hasNameId({ id: 'missing-name' }), new RegExp(util.ERR_OBJ_NO_NAME))
    assert.throws(() => util.hasNameId({ id: 'foo', name: '' }), new RegExp(util.ERR_OBJ_NO_NAME))
    assert.throws(() => util.hasNameId({ id: 'foo', name: false }), new RegExp(util.ERR_OBJ_NO_NAME))
  })
})
