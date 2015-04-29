'use strict';

var util = require('./util');

exports = module.exports = {};

exports.$equal = function test$equal(input, doc, key, o){
  return o.$acc && util.isEqual(input[key], doc[key]);
};
