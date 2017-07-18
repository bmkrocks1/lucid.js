/**
 * lucid.js - test/lib/parse
 *
 * @author Billie Ko <bmkrocks@gmail.com>
 */
const expect = require('chai').expect

const {
  ERR_PARSE,
  deserializeToArray,
  deserializeValue,
  r_map2kvo,
  r_map2kvs,
  parse
} = require('../../src/lib/parse')

const {
  expectToDeepEqual,
  expectToDeepEqualAndNotMutate,
  expectToThrowError
} = require('./helper')

describe('parse: r_map2kvs(arr)', function() {
  expectToDeepEqualAndNotMutate(
    r_map2kvs,
    [ // input
      'name:"slam dunk"',
      'topic:(arcade basketball)',
      'player:("Billie Ko<6c4d0e6a>" Zion<e19148f8>)',
      'tag.maxPlayers:5'
    ],
    [ // output
      { key: 'name', value: 'slam dunk' },
      { key: 'topic', value: ['arcade', 'basketball'] },
      { key: 'player', value: [
        { id: '6c4d0e6a', name: 'Billie Ko' },
        { id: 'e19148f8', name: 'Zion' }
      ]},
      { key: 'tag', value: { maxPlayers: 5 } }
    ],
    [
      'should return an array of key-value pair objects',
      'should not mutate the arr'
    ]
  )
})

describe('parse: parse(str) SUCCESS', function() {
  expectToDeepEqual(
    parse,
    // input
    'name:"slam dunk",topic:(arcade basketball),player:("Billie Ko<6c4d0e6a>" Zion<e19148f8>),tag.maxPlayers:5',
    { // output
      name: "slam dunk",
      topic: ["arcade", "basketball"],
      player: [
        { id: "6c4d0e6a", name: "Billie Ko" },
        { id: "e19148f8", name: "Zion" }
      ],
      tag: {
        maxPlayers: 5
      }
    },
    'name:"slam dunk",topic:(arcade basketball),player:("Billie Ko<6c4d0e6a>" Zion<e19148f8>),tag.maxPlayers:5'
  )

  expectToDeepEqual(
    parse,
    // input
    'bar:(coins 5000 true)',
    { // output
      bar: ['coins', 5000, true]
    },
    'bar:(coins 5000 true)'
  )

  expectToDeepEqual(
    parse,
    // input
    'game:"(a b c)"',
    { // output
      game: '(a b c)'
    },
    'game:"(a b c)"'
  )
})

describe('parse: parse(str) FAILURE', function() {
  expectToThrowError(
    parse,
    undefined,
    `${ERR_PARSE} - undefined`,
    `throws ${ERR_PARSE} - undefined`
  )

  expectToThrowError(
    parse,
    12345,
    `${ERR_PARSE} - 12345`,
    `throws ${ERR_PARSE} - 12345`
  )

  expectToThrowError(
    parse,
    'foo',
    `${ERR_PARSE} - foo`,
    `throws ${ERR_PARSE} - foo`
  )

})
