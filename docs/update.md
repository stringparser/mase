## update

Update/Upsert documents in the memory db. They are found first using
 `find` and then updated. Documents updates can be customized
 by using an `$update` function.

### spec
```js
function update(
  object fields,
  [object update|function $update],
  [object options|function $update]
)
```

_arguments_
 - `fields` type object, document(s) fields to lookup
 - `update` type object, which fields to update on document(s) found
 - `$update` type function, customizes how to update fields
 - `options` type object, modifies how to do the update

_options_. Same they are for [`find`](./find.md) plus
 - `$upsert` type boolean, wether to `insert` if no documents found
 - `$update` type function, customizer for the update

`$update(doc, update)` _arguments_
 - `doc` document found using `fields`
 - `update` same object given as argument

_defaults_
- `options.$update` to merge properties of `doc` with `update`

_returns_ `this`
