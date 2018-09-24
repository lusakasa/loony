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
delete -> %del from where:?           {% d => 'delete' + d[1] + (d[2] || '') %}
insert -> %insert %into %t values     {% d => 'insert into ' + d[2] + d[3] %}
values -> %values %t:+                {% d => ' values ' + d[1].join(', ') %}
update -> %update %t set where:?      {% d => 'update ' + d[1] + d[2] + (d[3] || '') %}
set    -> %set %t:+                   {% d => ' set ' + d[1].join(', ') %}

