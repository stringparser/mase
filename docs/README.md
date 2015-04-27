## module.exports

The module exports a constructor

```js
var Mase = require('mase');
```

# Mase

```js
function Mase(string name, array data)
```
Constructor of in memory dbs.

_arguments_
- `name` type string, name of the store
- `data` type array to insert in memory db

_defaults_
- `name` to a random string
- `data` to empty array

_returns_
- new Mase instance

_instance properties_
- `name` the name given or generated for this instance