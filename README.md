# JSDSL

JSDSL is a proof-of-concept library for building Javascript DSLs.

First you define your language using [nearely](https://github.com/kach/nearley). Then you write *programs* with method chaining and recursive tagged template calls. 

Compiled programs either produce an output or throw an error if you've written an invalid program.

## Example

The following is an example of a SQL DSL built with JDSL.

```js
const sql = require('jsdsl')( ... )

sql.select`title``genre`.from`book`.where`id = 7`.query
// "select title, genre from book where id = 7"

sql.delete.from`book`.where`genre = 'Fiction'`.query
// "delete  from book where genre = 'Fiction'"

sql.insert.into`book`.values`title = '1984'`.query
// "insert into book values title = '1984'"

sql.update`book`.set`title = '1984'`.query
// "update book set title = '1984'"

sql.select.from`title``genre`.from`book`.where`id = 7`.query
// throws error blaming .from

sql.select`title`.from`book``author`.where`id = 7`.query
// throws error blaming `author`
```

`sql` was defined as:

```js
const sql = require('jsdsl')({
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
```

`sql.js` was generated from  the [nearely](https://github.com/kach/nearley) grammar file `sql.ne`:

```ne
@{%
const select = { literal: 'select' };
const from = { literal: 'from' };
const where = { literal: 'where' };
const del = { literal: 'delete' };
const insert = { literal: 'insert' };
const into = { literal: 'into' };
const values = { literal: 'values' };
const update = { literal: 'update' };
const set = { literal: 'set' };
const t = { test: x => Array.isArray(x) };
%}

sql    -> select                      {% id %}
       |  delete                      {% id %}
       |  insert                      {% id %}
       |  update                      {% id %}
select -> %select %t:+ from:? where:? {% d => 'select ' + d[1].join(', ') + (d[2] || '') + (d[3] || '') %}
from   -> %from %t                    {% d => ' from ' + d[1] %}
where  -> %where %t                   {% d => ' where '+ d[1] %}
delete -> %del from where:?           {% d => 'delete ' + d[1] + (d[2] || '') %}
insert -> %insert %into %t values     {% d => 'insert into ' + d[2] + d[3] %}
values -> %values %t:+                {% d => ' values ' + d[1].join(', ') %}
update -> %update %t set              {% d => 'update ' + d[1] + d[2] %}
set    -> %set %t:+                   {% d => ' set ' + d[1].join(', ') %}
```

## Future

JSDSL is a proof of concept. There are many ways it can be improved. Feel free to submit PRs.

## License

MIT Licensed, Copyright (c) 2018 Sufyan Dawoodjee
