'use strict';
var fs = require('fs');
var docs = fs.readFileSync('index.js')
             .toString().match(/\/\*([\S\s]*?)\*\//gm);

console.log(docs);

var ws = fs.createWriteStream('docs.md');

docs.forEach(function(block){
  return ws.write(block);
});
