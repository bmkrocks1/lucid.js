# lucid.js

Custom JSON serializer and parser.

## Getting Started

Install package:
```
$ npm install --save lucid.js
```

Usage:
```javascript
import lucid from 'lucid.js';

lucid.serialize({
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

// name:"slam dunk",topic:(arcade basketball),player:("Billie Ko<6c4d0e6a>" Zion<e19148f8>),tag.maxPlayers:5

lucid.parse('game:pacman,enemies:(red "dark blue"),players:(Luigi<luigi> "Super Mario<mario>" princess),lvl.difficult:true')

/*
  {
    game: 'pacman',
    enemies: ['red', 'dark blue'],
    players: [
      { id: 'luigi', name: 'Luigi' },
      { id: 'mario', name: 'Super Mario' },
      'princess'
    ],
    lvl: {
      difficult: true
    }
  }
*/
```

## Do's

#### Single value:
```javascript
{
  bar: "coin",
  coins: 5000,
  flag: false
}
```

Output:
```
bar:coin,coins:5000,flag:false
```

#### Multiple values:
```javascript
{
  bar: ["power up", 7, true]
}
```

Output:
```
bar:("power up" 7 true)
```

#### Nested properties:
```javascript
{
  game: {
    name: "Super Mario Bros",
    numPlayers: 2
  }
}
```

Output:
```
game.name:"Super Mario Bros",game.numPlayers:2
```

#### Multiple objects (transforms into multiple 'name\<id\>' format):
```javascript
{
  game: [
    {
      id: "642c0926",
      name: "Super Mario Bros"
    },
    {
      id: "e19148f8",
      name: "Arcade Basketball",
      bar: "This is not going to be included!"
    }
  ]
}
```

Output:
```
game:("Super Mario Bros<642c0926>" "Arcade Basketball<e19148f8>")
```

## Don'ts

#### Nested array:
```javascript
{
  foo: [[1, 2, 3]]
}
```

#### Nested object:
```javascript
{
  foo: {
    bar: {}
  }
}
```

#### Multiple objects with neither id nor name property:
```javascript
{
  foo: [
    {
      baz: "Not good!"
    }
  ]
}
```
