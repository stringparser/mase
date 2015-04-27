#### mase documentation  

methods:
 - [insert](#insert)
 - [find](#find)
 - [update](#update)
 - [remove](#remove)

## module.exports

The module exports a constructor

```js
var Mase = require('mase');
```

### Mase

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

#### insert

```js
function insert(object document)
```
Insert a new document in the memory db.

_arguments_
 - `document` type object, element to insert

_defaults_
 - `document.id` to random string

_returns_
 - a clone of the inserted `document`

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

#### update

```js
function update(object fields, object update[, object options|function updater])
```
Update documents in the memory db. First they are found with
 `find` and then updated. This can be use as an update,
upsert and transform of documents dependeding on how is used.

_arguments_
 - `fields` type object, document fields for lookup
 - `update` type object with the fields to update
 - `updater` type function to update fields with
 - `options` type object, how to do the update

_options_ properties are the same as `find` plus
 - `upsert` type booblean, wether to insert `update` when
 there was no document found with `fields`
 - `updater` type function to make the update


_updater function arguments_ `(doc, update)`
 - `update` same object given as argument
 - `doc` document found which `fields` properties

_defaults_
- `options.updater` to merge `doc` with `update`

_returns this_


#### remove

```js
function remove(any id)
```
Remove only one document at a time.

_arguments_
 - `id` type any, id of the document to delete

_returns_
 - `true` if there was a document removed
 - `false` if there was no document removed
