const nearley = require('nearley')

/** Fraud */
module.exports = ({ grammar, keywords, properties = {} }) => {
  const gram = nearley.Grammar.fromCompiled(grammar)
  const builder = {
    /** returns array of tokens in order */
    _tokens() {
      const tokens = []
      let token = this._token
      for (; token; token = token.prev)
        tokens.push(token.id ? token.id : token.args)
      return tokens.reverse()
    },
    _compile() {
      return new nearley.Parser(gram).feed(this._tokens()).results[0]
    }
  }
  /** creates a new token from template string, saving previous token */
  const newToken = token => {
    const next = (...args) => newToken({ prev: token, args })
    next._token = token
    Object.setPrototypeOf(next, builder)
    return next
  }
  // add property to builder for each keyword
  for (const keyword of keywords) {
    properties[keyword] = {
      get: function() {
        return newToken({ prev: this._token, id: keyword })
      }
    }
  }
  Object.defineProperties(builder, properties)
  return newToken()
}
