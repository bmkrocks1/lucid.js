import './lib/util'
import './lib/serialize'
import './lib/parse'
import {
  expectToDeepEqual,
  expectToDeepEqualAndNotMutate,
  expectToThrowError
} from './helper'
import lucid from '../src'

const ERR_PARSE        = 'Cannot parse'
const ERR_SERIALIZE    = 'Cannot serialize'
const ERR_OBJ_NO_ID    = "Object does not have a valid property 'id'"
const ERR_OBJ_NO_NAME  = "Object does not have a valid property 'name'"
const ERR_NESTED_ARRAY = 'Nested array'
const ERR_NESTED_OBJ   = 'Nested object'

describe('lucid.serialize(obj): SUCCESS', function() {
  expectToDeepEqualAndNotMutate(
    lucid.serialize,
    { // input
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
    // output
    'name:"slam dunk",topic:(arcade basketball),player:("Billie Ko<6c4d0e6a>" Zion<e19148f8>),tag.maxPlayers:5',
    [
      'should return a serialized string',
      'should not mutate the obj'
    ]
  )
})

describe('lucid.serialize(obj): FAILURE', function() {
  expectToThrowError(
    lucid.serialize,
    undefined,
    `${ERR_SERIALIZE} - undefined`,
    `throws ${ERR_SERIALIZE} - undefined`
  )

  expectToThrowError(
    lucid.serialize,
    12345,
    `${ERR_SERIALIZE} - 12345`,
    `throws ${ERR_SERIALIZE} - 12345`
  )

  expectToThrowError(
    lucid.serialize,
    {
      foo: [[1, 2, 3]]
    },
    ERR_NESTED_ARRAY,
    `throws ${ERR_NESTED_ARRAY}`
  )

  expectToThrowError(
    lucid.serialize,
    {
      foo: {
        bar: {}
      }
    },
    ERR_NESTED_OBJ,
    `throws ${ERR_NESTED_OBJ}`
  )

  expectToThrowError(
    lucid.serialize,
    {
      foo: [
        {
          name: "No ID"
        }
      ]
    },
    ERR_OBJ_NO_ID,
    `throws ${ERR_OBJ_NO_ID}`
  )

  expectToThrowError(
    lucid.serialize,
    {
      foo: [
        {
          id: "No name"
        }
      ]
    },
    ERR_OBJ_NO_NAME,
    `throws ${ERR_OBJ_NO_NAME}`
  )
})

describe('lucid.parse(str): SUCCESS', function() {
  expectToDeepEqual(
    lucid.parse,
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
    lucid.parse,
    // input
    'bar:(coins 5000 true)',
    { // output
      bar: ['coins', 5000, true]
    },
    'bar:(coins 5000 true)'
  )

  expectToDeepEqual(
    lucid.parse,
    // input
    'game:"(a b c)"',
    { // output
      game: '(a b c)'
    },
    'game:"(a b c)"'
  )
})

describe('lucid.parse(str): FAILURE', function() {
  expectToThrowError(
    lucid.parse,
    undefined,
    `${ERR_PARSE} - undefined`,
    `throws ${ERR_PARSE} - undefined`
  )

  expectToThrowError(
    lucid.parse,
    12345,
    `${ERR_PARSE} - 12345`,
    `throws ${ERR_PARSE} - 12345`
  )

  expectToThrowError(
    lucid.parse,
    'foo',
    `${ERR_PARSE} - foo`,
    `throws ${ERR_PARSE} - foo`
  )

})
