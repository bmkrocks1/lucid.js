export const ERR_OBJ_NO_ID    = "Object does not have a valid property 'id'"
export const ERR_OBJ_NO_NAME  = "Object does not have a valid property 'name'"
export const ERR_NESTED_ARRAY = 'Nested array'
export const ERR_NESTED_OBJ   = 'Nested object'

export const error = (err, x) => {
  throw `${err} - ${x}`
}

/*
 * https://gist.github.com/neftaly/6e11268f1cd230094c81
 */
export const pipe = (...args) => initial => args.reduceRight(
  (result, fn) => fn(result),
  initial
)

export const isSNB = x => typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean'
export const isArray = Array.isArray
export const isObject = x => typeof x === 'object' && !Array.isArray(x) && x !== null

export const hasNameId = x => {
  if (!isObject(x)) {
    return false
  }
  else if (!('id' in x) || !x.id) {
    error(ERR_OBJ_NO_ID, JSON.stringify(x))
  }
  else if (!('name' in x) || !x.name) {
    error(ERR_OBJ_NO_NAME, JSON.stringify(x))
  }
  else return true
}

// quote x if it's a string and has whitespace
export const quote = x => {
  if (x && typeof x === 'string') {
    let y = x.trim()
    return /\s/.test(y) ? `"${y}"` : y
  }
  else return x
}

export const nameId = x => quote(`${x.name}<${x.id}>`)

export const kvMatches = x => /(\w+)\.?(\w+)?:(.+)/.exec(x)

export const unQuote = x => {
  let m = /^"(.+?)"$/.exec(x)
  return (m && m[1]) ? m[1] : x
}

export const deParen = x => {
  let m = /^\((.+?)\)$/.exec(x)
  return (m && m[1]) ? m[1] : x
}

// split string on space or on quotes to array
export const splitValue = x => x.match(/[^\s"]+|"([^"]*)"/g)

export const deNameId = x => {
  let m = /^([\w\s]+)<([\w\d-]+)>$/.exec(unQuote(x))
  return (m && m[1] && m[2]) ? { id: m[2], name: m[1] } : null
}

export const objtfy = (v, k) => !k ? v : {[k]: v}

export const parseIntOrBool = x => {
  let y = parseInt(x, 10)
  if (!isNaN(y)) return y
  else if (x === 'false') return false
  else return x === 'true' || x
}
