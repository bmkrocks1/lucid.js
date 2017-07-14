/**
 * lucid.js - lib/serialize
 *
 * @author Billie Ko<bmkrocks@gmail.com>
 */
const util = require('./util'),
  ERR_SERIALIZE = util.ERR_SERIALIZE,
  ERR_OBJ_NO_ID = util.ERR_OBJ_NO_ID,
  ERR_OBJ_NO_NAME = util.ERR_OBJ_NO_NAME,
  ERR_NESTED_ARRAY = util.ERR_NESTED_ARRAY,
  ERR_NESTED_OBJ = util.ERR_NESTED_OBJ,
  error = util.error,
  pipe = util.pipe,
  isSNB = util.isSNB,
  isArray = util.isArray,
  isObject = util.isObject,
  hasNameId = util.hasNameId,
  quote = util.quote,
  nameId = util.nameId

/**
 * Map to array of {k,v} objects
 *
 * @return Array.<Object>
 */
const map2kvo = obj => Object.keys(obj).map(key => ({ key, value: obj[key] }))

/**
 *
 * @return Array.<String>
 */
const serializeArray = arr => arr.map(x => {
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
 *
 * @return Array.<String>
 */
const serializeObject = pipe(
  kvo => map2kvs(kvo, true),
  map2kvo
)

/**
 * Map to array of `k:v` strings
 *
 * @return Array.<String>
 */
const map2kvs = (arr, nested = false) => arr.map(({key, value}) => {
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

const serialize = pipe(
  kvs => kvs.join(','),
  map2kvs,
  map2kvo
)

module.exports = serialize
