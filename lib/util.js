'use strict';

exports = module.exports = {};

// dependencies
//

exports.type = require('utils-type');
exports.clone = require('lodash.clone');
exports.merge = require('lodash.merge');
exports.isEqual = require('lodash.isequal');

// asorted utilities
//

exports.randomID = function (){
  return Math.random().toString(36).slice(2);
};

exports.defaultTestFn = function (input, doc, key){
  return exports.isEqual(input[key], doc[key]);
};
