import { assert } from 'chai'
import {
  ERR_OBJ_NO_ID,
  ERR_OBJ_NO_NAME,
  isObject,
  hasNameId
} from '../../src/lib/util'

describe('util: isObject(arg)', function() {
  it('should return true if arg is an object literal', function() {
    assert.isTrue(isObject({}), '{} is an object literal')
  })

  it('should return false for undefined or invalid arg', function() {
    assert.isFalse(isObject(undefined), 'undefined is not an object literal')
    assert.isFalse(isObject(null), 'null is not an object literal')
    assert.isFalse(isObject([]), '{} is not an object literal')
    assert.isFalse(isObject(''), 'empty string is not an object literal')
    assert.isFalse(isObject(1), '1 is not an object literal')
  })
})

describe('util: hasNameId(arg)', function() {
  it('should return true if arg is is an object and has name and id property', function() {
    assert.isTrue(hasNameId({ id: 'foo', name: 'bar' }), '{ id: \'foo\', name: \'bar\' } is valid')
  })

  it('should return false for undefined or invalid arg', function() {
    assert.isFalse(hasNameId(undefined), 'undefined is invalid')
    assert.isFalse(hasNameId(null), 'null is invalid')
    assert.isFalse(hasNameId([]), '[] is invalid')
  })

  it('should throw an error if arg does not have a valid id or name property', function() {
    assert.throws(() => hasNameId({}), new RegExp(ERR_OBJ_NO_ID))
    assert.throws(() => hasNameId({ name: 'missing-id' }), new RegExp(ERR_OBJ_NO_ID))
    assert.throws(() => hasNameId({ id: '', name: 'bar' }), new RegExp(ERR_OBJ_NO_ID))
    assert.throws(() => hasNameId({ id: false, name: 'bar' }), new RegExp(ERR_OBJ_NO_ID))
    assert.throws(() => hasNameId({ id: 'missing-name' }), new RegExp(ERR_OBJ_NO_NAME))
    assert.throws(() => hasNameId({ id: 'foo', name: '' }), new RegExp(ERR_OBJ_NO_NAME))
    assert.throws(() => hasNameId({ id: 'foo', name: false }), new RegExp(ERR_OBJ_NO_NAME))
  })
})
