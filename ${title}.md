## remove

```js
function remove(any id)
```
Remove only one document at a time.

_arguments_
 - `id` type any, id of the document to delete

_returns_
 - `true` if there was a document removed
 - `false` if there was no document removed
m of documents depending on how is used.

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
oc, key, options)`
 - `fields` the object fields given as argument
 - `doc` object document found that has property `key`
 - `key` property that `doc` and `fields` have in common
 - `options` the options object passed in to `find`

_defaults_
- `options.test` equality between `fields[key]` and `doc[key]`

_returns_
 - if `count` is truthy, an integer count of all elements found
 - if `count` is falsy, an array clone of all the elements found
