'use strict';

var fs = require('fs');
var util = require('./util');

process.chdir('docs');

var docs = util.getBlocks();
var summary = fs.createWriteStream('SUMMARY.md');

docs.forEach(function(block, index){
  var lines = block.split('\n');
  // strip block comment start and end
  lines.shift(); lines.pop();
  if(lines[0] === void 0){ return ; }
  // extract title
  var title = lines[0].replace(/[ ]*[#]+/, '').trim();
  // write table of contents
  if(index){
    summary.write(`* [${title}](${title}.md)\n`);
  } else {
    lines[0] = '## Mase';
  }

  // write each block on its file
  fs.createWriteStream(`${title}.md`)
    .write(lines.join('\n'));
});
