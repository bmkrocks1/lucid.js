/**
 * lucid.js - test/lib/parse
 *
 * @author Billie Ko <bmkrocks@gmail.com>
 */
const expect = require('chai').expect
const {
  deserializeToArray,
  deserializeValue,
  r_map2kvo,
  r_map2kvs,
  parse
} = require('../../src/lib/parse')
const {
  expectToDeepEqual,
  expectToDeepEqualAndNotMutate
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

describe('parse: parse(str)', function() {
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
    'should parse the string to JSON'
  )
})
