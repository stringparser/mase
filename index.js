'use strict';

var util = require('./lib/util');

exports = module.exports = Mase;

// namespace
var mase = {};

/**
### README

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
- `name` given or generated for this instance

**/

function Mase(name, data){
  if(!(this instanceof Mase)){
    return new Mase(name, data);
  }

  data = data || name;
  this.name = util.type(name).string || util.randomID();
  mase[this.name] = mase[this.name] || [];

  if(util.type(data).array){
    data.forEach(function(item){
      this.update({_id: item._id}, item, {$upsert: true});
    }, this);
  }
}

/**
## insert

Insert a new document. When `document` is not a plain object,
i.e. `'one', 1, etc.`, it will be inserted using its value.

```js
db.insert(1); // => {value: 1, _id: 'wZy7rd33Q8478pvi'}
```

### spec
```js
function insert(object|any document)
```

_arguments_
 - `document` type object or any, element to insert.

_defaults_
 - `document._id` to a 24 length random string

_returns_ a clone of the inserted `document`

**/
Mase.prototype.insert = function(_doc){
  var doc = util.type(_doc).plainObject || {value: _doc};
  if(doc._id === void 0){ doc._id = util.randomID(); }
  mase[this.name].push(util.clone(doc, true));
  return doc;
};

/**
## find

Find documents. By default, documents are tested
for value equality with [`lodash.isEqual`][p-lodash.isEqual].
This can be changed using a `$test` function.

### spec
```js
function find(object fields[, object options|function $test])
```

_arguments_
 - `fields` type object, document fields for lookup
 - `$test` type function that will test `fields` for each document
 - `options` type object, helper object on how to do the lookup

_options_ properties
 - `$acc` type boolean, return value of the `$test` function
 - `$test` type function that tests `fields` against each document
 - `$break` type boolean, wether to break the search after match
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
**/
Mase.prototype.find = function(fields, o){
  if(fields && !util.type(fields).plainObject){
    throw new TypeError('find(fields[, object options|function $test]) '
      + '`fields` should be plainObject'
    );
  }
  o = util.type(o).plainObject || {$test: o};

  var spec = Object.keys(fields || {});
  var store = mase[this.name], len = store.length;

  if(!store.length || !spec.length){
    return o.$count ? len : util.clone(store, true);
  }

  if(typeof o.$test !== 'function'){
    o.$test = util.test.$equal;
  }

  if(typeof o.$match !== 'function'){
    o.$match = (o.$count && util.match.$count) || util.match.$equal;
  }

  --len; // better this than index < len-1 for whilst()
  var index = -1;
  o.$result = o.$count ? 0 : [];

  (function whilst(){
    o.$acc = true;
    var doc = store[++index];
    var match = spec.filter(function(key){
      return (o.$acc = o.$test(fields, doc, key, o));
    }).length;

    if(match){
      o.$match(doc, o);
      if(o.$break){
        if(!o.$update && o.$result.length < 2){
          o.$result = doc;
        }
        return ;
      }
    }
    if(index < len){ whilst(); }
  })();

  if(o.$ref){ return o.$result; }
  return util.clone(o.$result, true);
};

/**
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

**/
Mase.prototype.update = function(fields, update, o){
  if(
    !util.type(fields).plainObject &&
    !util.type(update).match(/function|plainObject/)
  ){
    throw new TypeError('update(fields, update[, options])\n'
      + ' `fields` should be plainObject\n'
      + ' `update` should be function or plainObject'
    );
  }

  if(update.$update){ o = update; }
  o = util.type(o).plainObject || {$update: o || update};

  if(typeof o.$update !== 'function'){
    o.$update = util.merge;
  }

  o.$ref = true; o.$count = false;
  var found = this.find(fields, o).map(function(doc){
    o.$update(doc, update);
    return doc;
  });

  if(!found.length && o.$upsert){
    this.insert(util.merge(fields, update));
  }

  return this;
};

/**
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

**/
Mase.prototype.remove = function(_id){
  var store = mase[this.name];
  var index = 0, length = store.length;

  if(!_id && _id !== 0){
    mase[this.name] = [];
    return Boolean(length);
  }

  (function whilst(){
    if(util.isEqual(_id, store[index]._id)){
      store.splice(index, 1);
      index += length;
    }
    if(++index < length){ whilst(); }
  })();

  return index > length;
};
