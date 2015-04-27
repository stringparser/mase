## update

```js
function update(object fields, object update[, object options|function $update])
```
Update documents in the memory db. First they are found with
 `find` and then updated. This can be use as an update,
upsert and transform of documents depending on how is used.

_arguments_
 - `fields` type object, document fields for lookup
 - `update` type object with the fields to update
 - `$update` type function to update fields with
 - `options` type object, how to do the update

_options_ properties are the same as `find` plus
 - `upsert` type booblean, wether to insert `update` when
 there was no document found with `fields`
 - `$update` type function to make the update


_$update arguments_ `$update(doc, update)`
 - `doc` document found which `fields` properties
 - `update` same object given as argument

_defaults_
- `options.updater` to merge `doc` with `update`

_returns this_
