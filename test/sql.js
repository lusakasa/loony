// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "sql", "symbols": ["select"], "postprocess": id},
    {"name": "sql", "symbols": ["delete"], "postprocess": id},
    {"name": "sql", "symbols": ["insert"], "postprocess": id},
    {"name": "sql", "symbols": ["update"], "postprocess": id},
    {"name": "select$ebnf$1", "symbols": [t]},
    {"name": "select$ebnf$1", "symbols": ["select$ebnf$1", t], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "select$ebnf$2", "symbols": ["from"], "postprocess": id},
    {"name": "select$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "select$ebnf$3", "symbols": ["where"], "postprocess": id},
    {"name": "select$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "select", "symbols": [select, "select$ebnf$1", "select$ebnf$2", "select$ebnf$3"], "postprocess": d => 'select ' + d[1].join(', ') + (d[2] || '') + (d[3] || '')},
    {"name": "from", "symbols": [from, t], "postprocess": d => ' from ' + d[1]},
    {"name": "where", "symbols": [where, t], "postprocess": d => ' where '+ d[1]},
    {"name": "delete$ebnf$1", "symbols": ["where"], "postprocess": id},
    {"name": "delete$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "delete", "symbols": [del, "from", "delete$ebnf$1"], "postprocess": d => 'delete' + d[1] + (d[2] || '')},
    {"name": "insert", "symbols": [insert, into, t, "values"], "postprocess": d => 'insert into ' + d[2] + d[3]},
    {"name": "values$ebnf$1", "symbols": [t]},
    {"name": "values$ebnf$1", "symbols": ["values$ebnf$1", t], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "values", "symbols": [values, "values$ebnf$1"], "postprocess": d => ' values ' + d[1].join(', ')},
    {"name": "update$ebnf$1", "symbols": ["where"], "postprocess": id},
    {"name": "update$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "update", "symbols": [update, t, "set", "update$ebnf$1"], "postprocess": d => 'update ' + d[1] + d[2] + (d[3] || '')},
    {"name": "set$ebnf$1", "symbols": [t]},
    {"name": "set$ebnf$1", "symbols": ["set$ebnf$1", t], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "set", "symbols": [set, "set$ebnf$1"], "postprocess": d => ' set ' + d[1].join(', ')}
]
  , ParserStart: "sql"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
