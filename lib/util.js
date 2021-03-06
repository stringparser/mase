'use strict';

exports = module.exports = {};

// dependencies
//

exports.type = require('utils-type');
exports.clone = require('lodash.clone');
exports.merge = require('lodash.merge');
exports.random = require('random-string');
exports.isEqual = require('lodash.isequal');

// asorted utilities
//
exports.randomID = function (){
  return exports.random({length: 24});
};

exports.$test = function test$equal(fields, doc, key, o){
  return o.$acc && exports.isEqual(fields[key], doc[key]);
};
