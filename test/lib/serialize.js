/**
 * lucid.js - test/lib/serialize
 *
 * @author Billie Ko <bmkrocks@gmail.com>
 */
const expect = require('chai').expect

const {
  ERR_SERIALIZE,
  map2kvo,
  serializeArray,
  serializeObject,
  map2kvs,
  serialize
} = require('../../src/lib/serialize')

const {
  ERR_OBJ_NO_ID,
  ERR_OBJ_NO_NAME,
  ERR_NESTED_ARRAY,
  ERR_NESTED_OBJ
} = require('../../src/lib/util')

const {
  expectToDeepEqual,
  expectToDeepEqualAndNotMutate,
  expectToThrowError
} = require('./helper')

describe('serialize: map2kvo(obj)', function() {
   expectToDeepEqualAndNotMutate(
     map2kvo,
     { // input
       name: 'slam dunk',
       topic: ['arcade', 'basketball'],
       player: [
         { id: '6c4d0e6a', name: 'Billie Ko' },
         { id: 'e19148f8', name: 'Zion' }
       ],
       tag: {
         maxPlayers: 5
       }
     },
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
       'should return an array of {key, value} objects',
       'should not mutate the obj'
     ]
   )
 })

 describe('serialize: map2kvs(arr)', function() {
   expectToDeepEqualAndNotMutate(
     map2kvs,
     [ // input
       { key: 'name', value: 'slam dunk' },
       { key: 'topic', value: ['arcade', 'basketball'] },
       { key: 'player', value: [
         { id: '6c4d0e6a', name: 'Billie Ko' },
         { id: 'e19148f8', name: 'Zion' }
       ]},
       { key: 'tag', value: { maxPlayers: 5 } }
     ],
     [ // output
       'name:"slam dunk"',
       'topic:(arcade basketball)',
       'player:("Billie Ko<6c4d0e6a>" Zion<e19148f8>)',
       'tag.maxPlayers:5'
     ],
     [
       'should return an array of `key:value` strings',
       'should not mutate the arr'
     ]
   )
 })

 describe('serialize: serializeObject(obj)', function() {
   expectToDeepEqualAndNotMutate(
     serializeObject,
     { // input
       bar: "coin",
       coins: 5000,
       flag: false
     },
     [ // output
       'bar:coin',
       'coins:5000',
       'flag:false'
     ],
     [
       'should return an array of `key:value` strings',
       'should not mutate the obj'
     ]
   )
 })

 describe('serialize: serializeArray(arr)', function() {
   expectToDeepEqualAndNotMutate(
     serializeArray,
     [ // input
       'arcade',
       'basketball',
       'power up'
     ],
     [ // output
       'arcade',
       'basketball',
       '"power up"'
     ],
     [
       '(array of strings) should return an array of serialized values',
       '(array of strings) should not mutate the arr'
     ]
   )
   expectToDeepEqualAndNotMutate(
     serializeArray,
     [ // input
       { id: '6c4d0e6a', name: 'Billie Ko' },
       { id: 'e19148f8', name: 'Zion' }
     ],
     [ // output
       '"Billie Ko<6c4d0e6a>"',
       'Zion<e19148f8>'
     ],
     [
       '(array of objects) should return an array of serialized values',
       '(array of objects) should not mutate the arr'
     ]
   )
 })

 describe('serialize: serialize(obj) SUCCESS', function() {
   expectToDeepEqualAndNotMutate(
     serialize,
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

 describe('serialize: serialize(obj) FAILURE', function() {
   expectToThrowError(
     serialize,
     undefined,
     `${ERR_SERIALIZE} - undefined`,
     `throws ${ERR_SERIALIZE} - undefined`
   )

   expectToThrowError(
     serialize,
     12345,
     `${ERR_SERIALIZE} - 12345`,
     `throws ${ERR_SERIALIZE} - 12345`
   )

   expectToThrowError(
     serialize,
     {
       foo: [[1, 2, 3]]
     },
     ERR_NESTED_ARRAY,
     `throws ${ERR_NESTED_ARRAY}`
   )

   expectToThrowError(
     serialize,
     {
       foo: {
         bar: {}
       }
     },
     ERR_NESTED_OBJ,
     `throws ${ERR_NESTED_OBJ}`
   )

   expectToThrowError(
     serialize,
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
     serialize,
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
