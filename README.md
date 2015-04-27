## mase
[![build][b-build]][x-travis][![NPM version][b-version]][p-mase] [![Gitter][b-gitter]][x-gitter]

Mongo-like memory db for when things are simple

[install](#install) -
[documentation][gh-pages] -
[license](#license)

## documentation

The documentation is a pleasant [gitbook][gh-pages].

## usage

```js

var Mase = require('mase');

var collection = [
  {name: 'one'},
  {name: 'two'}
];

var mase = new Mase('name', collection);

mase.find({name: 'one'});
// =>
[ { name: 'one', _id: 'wzy7rd33q8478pvi' } ]

mase.find({name: 'o'}, function $test(fields, doc, key){
  return RegExp(fields[key]).test(doc[key]);
});
// =>
[ { name: 'one', _id: 'wzy7rd33q8478pvi' },
  { name: 'two', _id: 'ruffil4brshv9529' } ]

mase.insert(1);
// =>
{ value: 1, _id: 'vp61d8s6iyynwmi' }

mase.insert({_id: 1, num: 1});
// =>
{_id: 1, num: 1}

mase.update({name: 'one'}, {key: 'val'}).find();
// =>
[ { name: 'one', _id: 'wzy7rd33q8478pvi', key: 'val' },
  { name: 'two', _id: 'ruffil4brshv9529' },
  { value: 1, _id: 'vp61d8s6iyynwmi' },
  { _id: 1, num: 1 } ]

mase.remove(1);
// => true
mase.find();
// =>
[ { name: 'one', _id: 'wzy7rd33q8478pvi', key: 'val' },
  { name: 'two', _id: 'ruffil4brshv9529' },
  { value: 1, _id: 'vp61d8s6iyynwmi' } ]

mase.remove(2);
// => false (we had no element with 2 for _id)

var fs = require('fs');
fs.createWriteStream('collection.json')
  .write(JSON.stringify(mase.find()));
```

## install

With [npm][x-npm]

```sh
npm install mase
```

## license

This software is released under the MIT license

Copyright (c) 2014-2015 Javier Carrillo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

<!-- links
  b-: is for badges
  p-: is for package
  t-: is for doc's toc
  x-: is for just a link
-->

[x-npm]: https://www.npmjs.org
[p-mase]: https://npmjs.com/mase

[gh-pages]: https://stringparser.github.io/mase
[x-gitter]: https://gitter.im/stringparser/mase
[x-travis]: https://travis-ci.org/stringparser/mase/builds
[x-license]: http://opensource.org/licenses/MIT
[x-new-issue]: https://github.com/stringparser/mase/issues/new

[b-build]: http://img.shields.io/travis/stringparser/mase/master.svg?style=flat-square
[b-gitter]: https://badges.gitter.im/Join%20Chat.svg
[b-version]: http://img.shields.io/npm/v/mase.svg?style=flat-square
[b-license]: http://img.shields.io/npm/l/mase.svg?style=flat-square
