'use strict';

exports = module.exports = {};

exports.$equal = function match$equal(doc, o){
  if(!o.$update && o.break && !o.result.length){
    o.result = doc;
  } else { o.result.push(doc); }
};

exports.$count = function match$count(doc, o){
  ++o.result;
};
