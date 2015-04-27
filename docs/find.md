#### find

```js
function find(object fields[, object options|function test])
```
Find documents. By default, documents are tested for key-value
equality between `fields[key]` and `doc[key]` for each document
on the database. This can be changed using a `tester` function.

_arguments_
 - `fields` type object, document fields for lookup
 - `test` type function that will test `fields` for each document
 - `options` type object, helper object on how to do the lookup

_options_ properties
 - `acc` type boolean, accumulated value of all document key tests
 - `break` wether or not to break the search after match
 - `count` type boolean, whether to return a count or not
 - `tester` type function for testing `fields` against a document
 - `result` type array or number, result returned by this function
  - `array` when `count` is falsy
  - `number` when `count` is truthy

_tester function arguments_ `(fields, doc, key, options)`
 - `fields` the object fields given as argument
 - `doc` object document found that has property `key`
 - `key` property that `doc` and `fields` have in common
 - `options` the options object passed in to `find`

_defaults_
- `options.test` equality between `fields[key]` and `doc[key]`

_returns_
 - if `count` is truthy, an integer count of all elements found
 - if `count` is falsy, an array clone of all the elements found
