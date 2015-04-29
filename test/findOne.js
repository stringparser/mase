'use strict';

var should = require('should');

module.exports = function(Mase, util){
  should.exists(util);

  var testData = [
    {_id: 1, name: 'one', key: 'val'},
    {_id: 2, name: 'two', key: 'val'},
    {_id: 3, name: 'three'},
    {_id: 4, name: 'four'}
  ];

  it('returns one document', function(){
    var mase = new Mase(testData);

    mase.findOne().should.be.eql(testData[0]);
  });

  it('returns null if nothing was found', function(){
    var mase = new Mase(testData);

    (mase.findOne({value: 'something'}) === null)
      .should.be.eql(true);
  });

  it('function for test as second argument', function(){
    var mase = new Mase(testData);

    mase.findOne({name: 'o'}, function(fields, doc, key){
      return RegExp(fields[key]).test(doc[key]);
    }).should.be.eql(testData[0]);
  });

  it('options: {$test: [Function]}', function(){
    var mase = new Mase(testData);

    mase.findOne({name: 'o'}, {
      $test: function(fields, doc, key){
        return RegExp(fields[key]).test(doc[key]);
      }
    }).should.be.eql(testData[0]);
  });

  it('options: $count, $break have no effect', function(){
    var mase = new Mase(testData);

    mase.findOne({name: 'o'}, {
      $count: true,
      $break: false,
      $test: function(fields, doc, key){
        return RegExp(fields[key]).test(doc[key]);
      }
    }).should.be.eql(testData[0]);
  });
};
