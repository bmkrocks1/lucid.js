const lucid = require('../src')

let obj = {
  name: "slam dunk",
  topic: ["arcade", "basketball"],
  player: [
    { id: "6c4d0e6a", name: "Billie Ko" },
    { id: "e19148f8", name: "Zion" }
  ],
  tag: {
    maxPlayers: 5,
    player: [
      { id: "6c4d0e6a", name: "Billie Ko" },
      { id: "e19148f8", name: "Zion" }
    ],
    level: ["expert", "novice"]
  }
}

console.log(`Sample object --> ${JSON.stringify(obj)}`)
console.log(`Serialized --> ${lucid.serialize(obj)}`)
