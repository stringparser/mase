'use strict';

exports = module.exports = {};

// dependencies
//

exports.bson = require('bson');
exports.type = require('utils-type');
exports.clone = require('lodash.clone');
exports.merge = require('lodash.merge');
exports.isEqual = require('lodash.isequal');

// library deps
//
exports.test = require('./test');
exports.match = require('./match');

// asorted utilities
//

exports.randomID = function (){
  return Math.random().toString(36).slice(2);
};
