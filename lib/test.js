'use strict';

var util = require('./util');

exports = module.exports = {};

exports.$equal = function $or(input, doc, key, o){
  return o.acc && util.isEqual(input[key], doc[key]);
};
