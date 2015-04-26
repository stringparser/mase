'use strict';

var util = require('./lib/util');

exports = module.exports = Mase;

var mase = {};

/**
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
**/

function Mase(_name, data){
  if(!(this instanceof Mase)){
    return new Mase(_name, data);
  }

  var name = util.type(_name).string || util.randomID();
  Object.defineProperty(this, 'name', {value: name});

  data = data || _name;
  mase[name] = mase[name] || [];
  if(util.type(data).array){
    data.forEach(this.insert, this);
  }
}

/**
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

**/
Mase.prototype.insert = function(_doc){
  var doc = util.type(_doc).plainObject || {value: _doc};
  doc.id = util.type(doc.id).string || util.randomID();
  mase[this.name].push(util.clone(doc, true));

  return doc;
};

/**
#### find

```js
function find(object fields[, object options|function tester])
```
Find documents in the memory db. Only documents that
have at least one of the properties of `fields` will be tested.

_arguments_
 - `fields` type object, document fields for lookup
 - `tester` type function to test a field against a document
 - `options` type object, how to do the lookup

_options_ properties
 - `acc`
 - `test` type function for testing `fields` against a document
 - `break` wether or not to break the search after match
 - `count` type boolean, whether to return a count or not

_test function arguments_ `(fields, doc, key, options)`
 - `fields` the object fields given as argument
 - `doc` object document found that has property `key`
 - `key` property that `doc` and `fields` have in common
 - `options` the options object passed in to `find`

_defaults_
- `options.test` equality between `fields[key]` and `doc[key]`

_returns_
 - if `count` is truthy, an integer count of all elements found
 - if `count` is falsy, an array clone of all the elements found

**/
Mase.prototype.find = function(fields, o){
  var store = mase[this.name];
  if(!fields || !store.length){
    return util.clone(store, true);
  } else if(!util.type(fields).plainObject){
    throw new TypeError('find(fields[, testFn, options]) '
      + '`fields` should be plainObject'
    );
  }
  o = util.type(o).plainObject || {test: o};

  if(typeof o.test !== 'function'){
    o.test = util.test.$equal;
  }

  if(typeof o.onMatch !== 'function'){
    o.onMatch = (o.count && util.match.$count)
      || util.match.$equal;
  }

  var spec = Object.keys(fields);
  var index = -1, len = store.length-1;
  o.result = o.count ? 0 : [];

  (function whilst(){
    o.acc = true;
    var doc = store[++index];
    var match = spec.filter(function(key){
      if(doc[key] === void 0){ return false; }
      return (o.acc = o.test(fields, doc, key, o));
    }).length || spec.length === 0;

    if(match){
      o.onMatch(doc, o);
      if(o.break){ return ; }
    }
    if(index < len){ whilst(); }
  })();

  if(o.ref){ return o.result; }
  return util.clone(o.result, true);
};

/**
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

**/
Mase.prototype.update = function(fields, update, o){
  if(!util.type(fields).plainObject && !util.type(update).plainObject){
    throw new TypeError('update(fields, update[, options]) '
      + '`fields` and `update` should be plainObjects'
    );
  }

  o = util.type(o).plainObject || {updater: o};
  if(typeof o.update !== 'function'){
    o.updater = util.merge;
  }

  o.ref = true; o.count = false;
  var found = this.find(fields, o).map(function(doc){
    o.updater(doc, update);
    return doc;
  });

  if(!found.length && o.upsert){
    this.insert(util.merge(fields, update));
  }

  return this;
};

/**
#### remove

```js
function update(string id)
```
Remove only one document at a time.

_arguments_
 - `id` type string, id of the document to delete

_returns_
 - `true` if there was a document removed
 - `false` if there was no document removed

**/
Mase.prototype.remove = function(id){
  if(typeof id !== 'string'){
    throw new TypeError(
      'remove(string id) only possible to remove by id'
    );
  }

  var index = -1, length = store.length;
  var store = mase[this.name];

  while(++index < length){
    if(id === store[index].id){
      store.splice(index, 1);
      index += length;
    }
  }

  return index > length;
};
