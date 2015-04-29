'use strict';

var util = require('./util');

exports = module.exports = {};

exports.$equal = function test$equal(fields, doc, key, o){
  return o.$acc && util.isEqual(fields[key], doc[key]);
};
