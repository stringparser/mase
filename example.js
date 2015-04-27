'use strict';

var Mase = require('./.');

var collection = [
  {name: 'one'},
  {name: 'two'}
];

var mase = new Mase('name', collection);

console.log(mase.find({name: 'one'}));
// =>
// [ { name: 'one', _id: 'wzy7rd33q8478pvi' } ]

console.log(mase.find({name: 'o'}, function $test(fields, doc, key){
  return RegExp(fields[key]).test(doc[key]);
}));
// =>
// [ { name: 'one', _id: 'wzy7rd33q8478pvi' },
//   { name: 'two', _id: 'ruffil4brshv9529' } ]

console.log(mase.insert(1));
// => { value: 1, _id: 'vp61d8s6iyynwmi' }

console.log(mase.insert({_id: 1, num: 1}));
// => {_id: 1, num: 1}

console.log(mase.update({name: 'one'}, {key: 'val'}).find());
// =>
// [ { name: 'one', _id: 'wzy7rd33q8478pvi', key: 'val' },
//   { name: 'two', _id: 'ruffil4brshv9529' },
//   { value: 1, _id: 'vp61d8s6iyynwmi' },
//   { _id: 1, num: 1 } ]

console.log(mase.remove(1));
// => true
console.log(mase.find());
// =>
// [ { name: 'one', _id: 'wzy7rd33q8478pvi', key: 'val' },
//   { name: 'two', _id: 'ruffil4brshv9529' },
//   { value: 1, _id: 'vp61d8s6iyynwmi' } ]

console.log(mase.remove(2));
// => false (we had no element with 2 for _id)
