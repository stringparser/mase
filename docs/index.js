'use strict';

process.chdir('docs');

var fs = require('fs');
var util = require('./util');

var docs = util.getBlocks();
var summary = fs.createWriteStream('SUMMARY.md');

docs = docs.map(function(block, index){
  var lines = block.split('\n');
  // strip block comment start and end
  lines.shift(); lines.pop();
  // extract title
  var title = lines[0].replace(/[ ]*[#]+/, '').trim();
  if(index){
    summary.write(`* [${title}](${title}.md)\n`);
  } else {
    lines[0] = '## module.exports';
  }

  fs.createWriteStream(title+'.md')
    .write(lines.join('\n'));

  return {
    title: util.map[title.toLowerCase()] || title,
    content: lines.slice(1).join('\n')
  };
});
