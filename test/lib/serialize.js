/**
 * lucid.js - serialize
 *
 * @author Billie Ko<bmkrocks@gmail.com>
 */
 const expect = require('chai').expect
 const {
   map2kvo,
   serializeArray,
   serializeObject,
   map2kvs,
   serialize
 } = require('../../src/lib/serialize')

describe('serialize: map2kvo(obj)', function() {
   let obj = {
     name: 'slam dunk',
     topic: ['arcade', 'basketball'],
     player: [
       { id: '6c4d0e6a', name: 'Billie Ko' },
       { id: 'e19148f8', name: 'Zion' }
     ],
     tag: {
       maxPlayers: 5
     }
   }

   it('should return an array of key-value pair objects', function() {
     expect(map2kvo(obj)).to.deep.equal(
       [
         { key: 'name', value: 'slam dunk' },
         { key: 'topic', value: ['arcade', 'basketball'] },
         { key: 'player', value: [
           { id: '6c4d0e6a', name: 'Billie Ko' },
           { id: 'e19148f8', name: 'Zion' }
         ]},
         { key: 'tag', value: { maxPlayers: 5 } }
       ]
     )
   })

   it('should not mutate the obj', function() {
     expect(obj).to.deep.equal({
       name: 'slam dunk',
       topic: ['arcade', 'basketball'],
       player: [
         { id: '6c4d0e6a', name: 'Billie Ko' },
         { id: 'e19148f8', name: 'Zion' }
       ],
       tag: {
         maxPlayers: 5
       }
     })
   })
 })

 describe('serialize: map2kvs(arr)', function() {
   let arr = [
     { key: 'name', value: 'slam dunk' },
     { key: 'topic', value: ['arcade', 'basketball'] },
     { key: 'player', value: [
       { id: '6c4d0e6a', name: 'Billie Ko' },
       { id: 'e19148f8', name: 'Zion' }
     ]},
     { key: 'tag', value: { maxPlayers: 5 } }
   ]

   it('should return an array of `key:value` strings', function() {
     expect(map2kvs(arr)).to.deep.equal(
       [
         'name:"slam dunk"',
         'topic:(arcade basketball)',
         'player:("Billie Ko<6c4d0e6a>" Zion<e19148f8>)',
         'tag.maxPlayers:5'
       ]
     )
   })

   it('should not mutate the arr', function() {
     expect(arr).to.deep.equal([
       { key: 'name', value: 'slam dunk' },
       { key: 'topic', value: ['arcade', 'basketball'] },
       { key: 'player', value: [
         { id: '6c4d0e6a', name: 'Billie Ko' },
         { id: 'e19148f8', name: 'Zion' }
       ]},
       { key: 'tag', value: { maxPlayers: 5 } }
     ])
   })
 })

 describe('serialize: serializeObject(obj)', function() {
   let obj = {
     bar: "coin",
     coins: 5000,
     flag: false
   }

   it('should return an array of `key:value` strings', function() {
     expect(serializeObject(obj)).to.deep.equal(
       [
         'bar:coin',
         'coins:5000',
         'flag:false'
       ]
     )
   })

   it('should not mutate the obj', function() {
     expect(obj).to.deep.equal({
       bar: 'coin',
       coins: 5000,
       flag: false
     })
   })
 })

 describe('serialize: serializeArray(arr)', function() {
   let arr = ['arcade', 'basketball', 'power up']
   let arrObjects = [
     { id: '6c4d0e6a', name: 'Billie Ko' },
     { id: 'e19148f8', name: 'Zion' }
   ]

   it('should return an array of serialized values', function() {
     expect(serializeArray(arr)).to.deep.equal([
       'arcade',
       'basketball',
       '"power up"'
     ])
     expect(serializeArray(arrObjects)).to.deep.equal([
       '"Billie Ko<6c4d0e6a>"',
       'Zion<e19148f8>'
     ])
   })

   it('should not mutate the arr', function() {
     expect(arr).to.deep.equal(['arcade', 'basketball', 'power up'])
     expect(arrObjects).to.deep.equal([
       { id: '6c4d0e6a', name: 'Billie Ko' },
       { id: 'e19148f8', name: 'Zion' }
     ])
   })
 })

 describe('serialize: serialize(obj)', function() {
   let obj = {
     name: "slam dunk",
     topic: ["arcade", "basketball"],
     player: [
       { id: "6c4d0e6a", name: "Billie Ko" },
       { id: "e19148f8", name: "Zion" }
     ],
     tag: {
       maxPlayers: 5
     }
   }

   it('should return a serialized string', function() {
     expect(serialize(obj)).to.equal('name:"slam dunk",topic:(arcade basketball),player:("Billie Ko<6c4d0e6a>" Zion<e19148f8>),tag.maxPlayers:5')
   })

   it('should not mutate the obj', function() {
     expect(obj).to.deep.equal({
       name: "slam dunk",
       topic: ["arcade", "basketball"],
       player: [
         { id: "6c4d0e6a", name: "Billie Ko" },
         { id: "e19148f8", name: "Zion" }
       ],
       tag: {
         maxPlayers: 5
       }
     })
   })
 })
