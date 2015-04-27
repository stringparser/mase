'use strict';

exports = module.exports = {};

// dependencies
//

exports.type = require('utils-type');
exports.clone = require('lodash.clone');
exports.merge = require('lodash.merge');
exports.random = require('random-string');
exports.isEqual = require('lodash.isequal');

// library deps
//
exports.test = require('./test');
exports.match = require('./match');

// asorted utilities
//

exports.randomID = function (){
  return exports.random({length: 24});
};
