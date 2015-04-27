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

  it('remove(any _id) only removes one document', function(){
    var mase = new Mase(testData);

    mase.find().should.be.eql(testData);
    mase.remove(1).should.be.eql(true);

    mase.find().should.be.eql([
      {_id: 2, name: 'two', key: 'val'},
      {_id: 3, name: 'three'},
      {_id: 4, name: 'four'}
    ]);
  });

  it('remove(any _id) returns true if doc was deleted', function(){
    var mase = new Mase(testData);

    mase.find().should.be.eql(testData);
    mase.remove(1).should.be.eql(true);
  });

  it('remove(any _id) returns false if doc was not deleted', function(){
    var mase = new Mase(testData);

    mase.find().should.be.eql(testData);
    mase.remove(0).should.be.eql(false);
  });

  it('remove(null|undefined|NaN|\'\') removes the collection', function(){
    var mase = new Mase();

    // 0 could be used as id, but not these
    ;[null, undefined, NaN, ''].forEach(function(falsy){
      testData.forEach(mase.insert, mase);
      mase.find().should.be.eql(testData);
      mase.remove(falsy).should.be.eql(true);
      mase.find().should.be.eql([]);
    });

    testData.forEach(mase.insert, mase);
    mase.find().should.be.eql(testData);
    mase.remove(0).should.be.eql(false);
    mase.insert({_id: 0});
    mase.remove(0).should.be.eql(true);
  });
};
