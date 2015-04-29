'use strict';

exports = module.exports = {};

exports.$equal = function match$equal(doc, o){
  o.$result.push(doc);
};

exports.$count = function match$count(doc, o){
  ++o.$result;
};
