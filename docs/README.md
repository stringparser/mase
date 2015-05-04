## Mase

The module exports a constructor.

```js
var Mase = require('mase');
var db = new Mase(string name, array data)
```

Memory dbs with the same `name` share memory.
It can take an array of `data` as a second or first argument.
If so, `data` is upserted into the db by only using each
document's `_id` as a selector.

### spec
```js
function Mase([string name, array data])
```

_arguments_
- `name` type string, name for the collection
- `data` type array to insert in memory db

_defaults_
- `name` to a random 24 length string using `[A-Za-z0-9]` characters
- `data`
  - to the previous collection `name` array if there was one
  - to empty array if collection `name` it wasn't

_returns_ a new instance

_instance properties_
- `store` array of data of the instance
