## find

Find documents. By default, documents are tested
for value equality with [`lodash.isEqual`][p-lodash.isEqual].
This can be changed using a `$test` function.

### spec
```js
function find([object fields, object options|function $test])
```

_arguments_
 - `fields` type object, document fields for lookup
 - `$test` type function that will test `fields` for each document
 - `options` type object, helper object on how to do the lookup

_options_ properties
 - `$acc` type boolean, return value of the `$test` function
 - `$test` type function that tests `fields` against each document
 - `$break` type boolean, wether to **break the search after a match**
 - `$count` type boolean, wether to have `result` start as `0` or `[]`
 - `$result` type array or number, result returned. It will start as:
  - empty array when `$count` is falsy
  - `0` when `$count` is truthy

`$test(fields, doc, key, options)` _arguments_
 - `fields` object fields given as argument
 - `doc` document object found
 - `key` property of `fields` to be tested
 - `options` the options object passed in to `find`

_defaults_
- `options.$test` an equality test using [`lodash.isEqual`][p-lodash.isEqual]

_returns_ `o.$result`

[p-lodash.isEqual]: https://lodash.com/docs#isEqual