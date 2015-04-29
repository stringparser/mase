## findOne

This method is just sugar on top of `find` enforcing
it to always return an object or null if nothing was found.

```js
var foundOne = find(fields, {
  $test: [Function] // if given
  $break: true,
  $count: false
})[0];
```

### spec
```js
function findOne(fields[, options|function $test])
```

Same as [`find`'s spec](./find.md#spec), differences below

_options_ properties
 - `$count` is always set to `false`
 - `$break` is always set to `true`

_returns_ the object document found