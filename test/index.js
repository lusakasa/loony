const fraud = require('..')

const sql = fraud({
  // grammar generatd with nearely: https://github.com/kach/nearley
  grammar: require('./sql.js'),
  // language keywords
  keywords: [
    'select',
    'from',
    'where',
    'delete',
    'insert',
    'into',
    'values',
    'update',
    'set'
  ],
  // add custom properties to builder
  properties: {
    // make .query an alias for ._compile()
    query: {
      get: function() {
        return this._compile()
      }
    }
  }
})

console.log(
  '\nsql.select`title``genre`.from`book`.where`id = 7`.query\n-->',
  sql.select`title``genre`.from`book`.where`id = 7`.query
)
console.log(
  "\nsql.delete.from`book`.where`genre = 'Fiction'`.query\n-->",
  sql.delete.from`book`.where`genre = 'Fiction'`.query
)
console.log(
  "\nsql.insert.into`book`.values`title = '1984'`.query\n-->",
  sql.insert.into`book`.values`title = '1984'`.query
)
console.log(
  "\nsql.update`book`.set`title = '1984'`.query\n-->",
  sql.update`book`.set`title = '1984'`.query
)
try {
  sql.select.from`title``genre`.from`book`.where`id = 7`.query
} catch (error) {
  console.log(
    '\nsql.select.from`title``genre`.from`book`.where`id = 7`.query\n-->',
    `throws Error(${error.message.split('\n').join(' ')})`
  )
}
try {
  sql.select`title`.from`book``author`.where`id = 7`.query
} catch (error) {
  console.log(
    '\nsql.select`title`.from`book``author`.where`id = 7`.query\n-->',
    `throws Error(${error.message.split('\n').join(' ')})`
  )
}
