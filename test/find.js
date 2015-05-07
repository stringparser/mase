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

  it('find({}, [Function]) does not skip $test', function(){
    var mase = new Mase(testData);

    var result = mase.find({}, function(fields, doc, key, o){
      if(doc.key === 'val' && o.$result.length < 2){ return true; }
      o.$break = true; return false;
    });

    result.should.have.property('length', 2);
    result.should.be.eql([
      {_id: 1, name: 'one', key: 'val'},
      {_id: 2, name: 'two', key: 'val'}
    ]);
  });

  it('find([Function]) does not skip $test', function(){
    var mase = new Mase(testData);

    var result = mase.find(function(fields, doc, key, o){
      if(doc.key === 'val' && o.$result.length < 1){ return true; }
      o.$break = true; return false;
    });

    result.should.have.property('length', 1);
    result.should.be.eql([
      {_id: 1, name: 'one', key: 'val'}
    ]);
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

    var found = mase.find({key: 'val'}, {$break: true});

    found.should.have.property('length', 1);
    found.should.be.eql([{_id: 1, name: 'one', key: 'val'}]);
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

};
