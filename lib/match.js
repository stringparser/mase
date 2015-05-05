'use strict';

exports = module.exports = {};

exports.$count = function match$count(doc, o){
  o.$count = ++o.$result;
};

exports.$equal = function match$equal(doc, o){
  o.$count = o.$result.push(doc);
};
