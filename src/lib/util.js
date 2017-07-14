/**
 * lucid.js - lib/util
 *
 * @author Billie Ko<bmkrocks@gmail.com>
 */

const ERR_SERIALIZE    = 'Unable to serialize'
const ERR_OBJ_NO_ID    = "Object does not have a valid property 'id'"
const ERR_OBJ_NO_NAME  = "Object does not have a valid property 'name'"
const ERR_NESTED_ARRAY = 'Nested array'
const ERR_NESTED_OBJ   = 'Nested object'

const error = (err, x) => {
  throw `${err} - ${x}`
}

const pipe = (...args) => initial => args.reduceRight(
  (result, fn) => fn(result),
  initial
)

const isSNB = x => typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean'
const isArray = Array.isArray
const isObject = x => typeof x === 'object' && !Array.isArray(x) && x !== null

const hasNameId = x => {
  if (!isObject(x)) {
    return false
  }
  else if (!('id' in x) || !x.id) {
    error(ERR_OBJ_NO_ID, x)
  }
  else if (!('name' in x) || !x.name) {
    error(ERR_OBJ_NO_NAME, x)
  }
  else return true
}

// quote x if it's a string and has whitespace
const quote = x => {
  if (x && typeof x === 'string') {
    let y = x.trim()
    return /\s/.test(y) ? `"${y}"` : y
  }
  else return x
}

const nameId = x => quote(`${x.name}<${x.id}>`)

module.exports = {
  ERR_SERIALIZE,
  ERR_OBJ_NO_ID,
  ERR_OBJ_NO_NAME,
  ERR_NESTED_ARRAY,
  ERR_NESTED_OBJ,
  error, pipe, isSNB, isArray, isObject,
  hasNameId, quote, nameId
}
