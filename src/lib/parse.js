/**
 * lucid.js - parse
 *
 * @author Billie Ko <bmkrocks@gmail.com>
 */
const {
  ERR_PARSE,
  error, pipe,
  kvMatches, unQuote, deParen, splitValue, deNameId,
  objtfy, parseIntOrBool } = require('./util')

/**
 * @param {Array<Object>} arr
 * @return {Object}
 */
const r_map2kvo = arr => arr.reduce((kvo, {key, value}) => Object.assign(kvo, {[key]: value}), {})

const deserializeToArray = (str, key) =>
  splitValue(str).map(x =>
    objtfy(deNameId(x) || parseIntOrBool(x), key)
  )

const deserializeValue = (str, key) => {
  let value = deParen(str)
  return (value !== str) ?
    deserializeToArray(value, key) :
    objtfy(parseIntOrBool(unQuote(str)), key)
}

/**
 * @param {Array<String>} arr
 * @return {Array<Object>}
 */
const r_map2kvs = arr => arr.map(kvs => {
  let matches = kvMatches(kvs)
  if (!matches) error(ERR_PARSE, kvs)
  let [full, key, nestedKey, value] = matches;
  return { key, value: deserializeValue(value, nestedKey) }
})

/**
 * @param {String} str
 * @return {Object}
 */
const parse = pipe(
  r_map2kvo,
  r_map2kvs,
  str => str.split(',')
)

module.exports = {
  deserializeToArray,
  deserializeValue,
  r_map2kvo,
  r_map2kvs,
  parse
}
