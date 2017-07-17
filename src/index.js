/**
 * lucid.js
 *
 * @author Billie Ko <bmkrocks@gmail.com>
 */

const {
  map2kvo,
  serializeArray,
  serializeObject,
  map2kvs,
  serialize
} = require('./lib/serialize')

const {
  deserializeToArray,
  deserializeValue,
  r_map2kvo,
  r_map2kvs,
  parse
} = require('./lib/parse')

module.exports = {
  map2kvo,
  serializeArray,
  serializeObject,
  map2kvs,
  serialize,
  deserializeToArray,
  deserializeValue,
  r_map2kvo,
  r_map2kvs,
  parse
}
