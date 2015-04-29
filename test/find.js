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

  it('find() or find({}) gives all documents', function(){
    var mase = new Mase(testData);

    mase.find().should.be.eql(testData);
  });

  it('find({key: \'val\'}) gives only those matching', function(){
    var mase = new Mase(testData);

    mase.find({key: 'val'}).should.be.eql([
      {_id: 1, name: 'one', key: 'val'},
      {_id: 2, name: 'two', key: 'val'},
    ]);
  });

    it('find({key: \'val\'}, {$break: true}) returs one', function(){
      var mase = new Mase(testData);

      mase.find({key: 'val'}, {$break: true}).should.be.eql(
        {_id: 1, name: 'one', key: 'val'}
      );
    });

  it('find({}, {$count: true}), gives a count', function(){
    var mase = new Mase(testData);

    mase.find({}, {$count: true}).should.be.eql(testData.length);
  });

  it('find({key: \'val\'}, {$count: true}) counts those', function(){
    var mase = new Mase(testData);

    mase.find({key: 'val'}, {$count: true}).should.be.eql(2);
  });

  it('find(object, [Function]) changes how to find', function(){
    var mase = new Mase(testData);

    mase.find({name: 'o'}, function(fields, doc, key){
      return RegExp(fields[key]).test(doc[key]);
    }).should.be.eql([
      {_id: 1, name: 'one', key: 'val'},
      {_id: 2, name: 'two', key: 'val'},
      {_id: 4, name: 'four'}
    ]);
  });

  it('test function find(object, {test: [Function]})', function(){
    var mase = new Mase(testData);

    mase.find({name: 'o'}, {
      $test: function(fields, doc, key){
        return RegExp(fields[key]).test(doc[key]);
      }
    }).should.be.eql([
      {_id: 1, name: 'one', key: 'val'},
      {_id: 2, name: 'two', key: 'val'},
      {_id: 4, name: 'four'}
    ]);
  });

  it('$count find(object, {test:[Function], $count:true})', function(){
    var mase = new Mase(testData);

    mase.find({name: 'o'}, {
      $count: true,
      $test: function(fields, doc, key){
        return RegExp(fields[key]).test(doc[key]);
      }
    }).should.be.eql(3);
  });

};
