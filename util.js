'use strict';

var fs = require('fs');

exports = module.exports = {};

exports.getBlocks = function(file){
  file = file || '../index.js';
  return fs.readFileSync(file).toString().match(/\/\*([\S\s]*?)\*\//gm);
};

exports.map = {
  'readme': require('../package').name
};
