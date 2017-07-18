import {
  r_map2kvs
} from '../../src/lib/parse'

import {
  expectToDeepEqualAndNotMutate
} from '../helper'

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
