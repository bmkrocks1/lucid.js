import {
  error, pipe,
  kvMatches, unQuote, deParen, splitValue, deNameId,
  objtfy, parseIntOrBool
} from './util'

export const ERR_PARSE = 'Cannot parse'

/**
 * @param {Array<Object>} arr
 * @return {Object}
 */
export const r_map2kvo = arr => arr.reduce((kvo, {key, value}) => Object.assign(kvo, {[key]: value}), {})

export const deserializeToArray = (str, key) =>
  splitValue(str).map(x =>
    objtfy(deNameId(x) || parseIntOrBool(unQuote(x)), key)
  )

export const deserializeValue = (str, key) => {
  let value = deParen(str)
  return (value !== str) ?
    deserializeToArray(value, key) :
    objtfy(parseIntOrBool(unQuote(str)), key)
}

/**
 * @param {Array<String>} arr
 * @return {Array<Object>}
 */
export const r_map2kvs = arr => arr.map(kvs => {
  let matches = kvMatches(kvs)
  if (!matches) error(ERR_PARSE, kvs)
  /* eslint no-unused-vars: 0 */
  let [full, key, nestedKey, value] = matches;
  return { key, value: deserializeValue(value, nestedKey) }
})

const check = str => {
  if (str && typeof str === 'string') return str
  else error(ERR_PARSE, str)
}

/**
 * @param {String} str
 * @return {Object}
 */
export const parse = pipe(
  r_map2kvo,
  r_map2kvs,
  str => str.split(','),
  check
)
