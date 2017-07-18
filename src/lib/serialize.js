/**
 * lucid.js - serialize
 *
 * @author Billie Ko <bmkrocks@gmail.com>
 */
const {
  ERR_OBJ_NO_ID,
  ERR_OBJ_NO_NAME,
  ERR_NESTED_ARRAY,
  ERR_NESTED_OBJ,
  error, pipe, isSNB, isArray, isObject,
  hasNameId, quote, nameId
} = require('./util')

const ERR_SERIALIZE = 'Cannot serialize'

/**
 * Map to array of {k,v} objects
 *
 * @param {Object} obj
 * @return {Array.<Object>}
 */
const map2kvo = obj => Object.keys(obj).map(key => ({ key, value: obj[key] }))

/**
 * @param {Array.<Object>|Array.<String>} arr
 * @return {Array.<String>}
 */
const serializeArray = arr =>
  arr.map(x => {
    if (isSNB(x)) {
      return quote(x)
    }
    else if (hasNameId(x)) {
      return nameId(x)
    }
    else if (isArray(x)) error(ERR_NESTED_ARRAY, x)
    else error(ERR_SERIALIZE, x)
  })

/**
 * @param {Object} obj
 * @return {Array.<String>}
 */
const serializeObject = pipe(
  kvo => map2kvs(kvo, true),
  map2kvo
)

/**
 * Map to array of `k:v` strings
 *
 * @param {Array.<Object>} arr
 * @param {boolean} [nested=false]
 * @return {Array.<String>}
 */
const map2kvs = (arr, nested = false) =>
  arr.map(({key, value}) => {
    if (isSNB(value)) {
      return `${key}:${quote(value)}`
    }
    else if (isArray(value)) {
      return `${key}:(${serializeArray(value).join(' ')})`
    }
    else if (isObject(value)) {
      return nested ?
        error(ERR_NESTED_OBJ, JSON.stringify(value)) :
        serializeObject(value)
          .map(x => `${key}.${x}`)
          .join(',')
    }
    else error(ERR_SERIALIZE, value)
  })

const check = obj => {
  if (obj && isObject(obj)) return obj
  else error(ERR_SERIALIZE, obj)
}

/**
 * @param {Object} obj
 * @return {String}
 */
const serialize = pipe(
  kvs => kvs.join(','),
  map2kvs,
  map2kvo,
  check
)

module.exports = {
  ERR_SERIALIZE,
  map2kvo,
  serializeArray,
  serializeObject,
  map2kvs,
  serialize
}
