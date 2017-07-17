/**
 * lucid.js - util
 *
 * @author Billie Ko <bmkrocks@gmail.com>
 */

const ERR_SERIALIZE    = 'Unable to serialize'
const ERR_OBJ_NO_ID    = "Object does not have a valid property 'id'"
const ERR_OBJ_NO_NAME  = "Object does not have a valid property 'name'"
const ERR_NESTED_ARRAY = 'Nested array'
const ERR_NESTED_OBJ   = 'Nested object'

const ERR_PARSE        = 'Unable to parse string'

const error = (err, x) => {
  throw `${err} - ${x}`
}

/*
 * https://gist.github.com/neftaly/6e11268f1cd230094c81
 */
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
    error(ERR_OBJ_NO_ID, JSON.stringify(x))
  }
  else if (!('name' in x) || !x.name) {
    error(ERR_OBJ_NO_NAME, JSON.stringify(x))
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

const kvMatches = x => /(\w+)\.?(\w+)?:(.+)/.exec(x)

const unQuote = x => {
  let m = /^"(.+?)"$/.exec(x)
  return (m && m[1]) ? m[1] : x
}

const deParen = x => {
  let m = /^\((.+?)\)$/.exec(x)
  return (m && m[1]) ? m[1] : x
}

// split string on space or on quotes to array
const splitValue = x => x.match(/[^\s"]+|"([^"]*)"/g)

const deNameId = x => {
  let m = /^([\w\s]+)<([\w\d\-]+)>$/.exec(unQuote(x))
  return (m && m[1] && m[2]) ? { id: m[2], name: m[1] } : null
}

const objtfy = (v, k) => !k ? v : {[k]: v}

const parseIntOrBool = x => {
  let y = parseInt(x, 10)
  if (!isNaN(y)) return y
  else if (x === 'false') return false
  else return x === 'true' || x
}

module.exports = {
  ERR_SERIALIZE,
  ERR_OBJ_NO_ID,
  ERR_OBJ_NO_NAME,
  ERR_NESTED_ARRAY,
  ERR_NESTED_OBJ,
  ERR_PARSE,
  error, pipe, isSNB, isArray, isObject,
  hasNameId, quote, nameId,
  kvMatches, unQuote, deParen, splitValue, deNameId,
  objtfy, parseIntOrBool
}
