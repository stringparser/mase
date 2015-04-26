'use strict';

exports = module.exports = {};

exports.match$equal = function match$equal(result, doc, o){
  if(o.break && !result.length){
    result = doc;
  } else { result.push(doc); }
};

exports.match$count = function match$count(result){
  ++result;
};
