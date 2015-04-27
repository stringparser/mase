'use strict';

var pack = require('../');
var util = require('./util');

var path = require('path');

describe(require('../package').name, function(){
  util.suite().forEach(function(file){
    var suite = path.basename(file, path.extname(file));
    describe(suite, function(){
      require('./'+file)(pack, util);
    });
  });
});
