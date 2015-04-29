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

  it('update(fields, update) all matching documents', function(){
    var mase = new Mase(testData);

    mase.update({key: 'val'}, {key: 'value'}).find()
      .should.be.eql([
        {_id: 1, name: 'one', key: 'value'},
        {_id: 2, name: 'two', key: 'value'},
        {_id: 3, name: 'three'},
        {_id: 4, name: 'four'}
      ]);
  });

  it('update(fields, update, {$break: true}) only first', function(){
    var mase = new Mase(testData);

    mase.update({key: 'val'}, {key: 'value'}, {$break: true})
      .find().should.be.eql([
        {_id: 1, name: 'one', key: 'value'},
        {_id: 2, name: 'two', key: 'val'},
        {_id: 3, name: 'three'},
        {_id: 4, name: 'four'}
      ]);
  });


  it('update(fields, [function]) changes how to update', function(){
    var mase = new Mase(testData);

    mase.update({key: 'val'}, function(doc){
      doc._id = doc._id*10;
    }).find().should.be.eql([
        {_id: 10, name: 'one', key: 'val'},
        {_id: 20, name: 'two', key: 'val'},
        {_id: 3, name: 'three'},
        {_id: 4, name: 'four'}
      ]);
  });

  it('update(fields, {$update: [Fn]}) changes updates', function(){
    var mase = new Mase(testData);

    mase.update({key: 'val'}, {
      $update: function(doc){
        doc._id = doc._id*10;
      }
    }).find().should.be.eql([
        {_id: 10, name: 'one', key: 'val'},
        {_id: 20, name: 'two', key: 'val'},
        {_id: 3, name: 'three'},
        {_id: 4, name: 'four'}
      ]);
  });

  it('update(fields, {$break: true, $update: [Fn]}) updates one', function(){
    var mase = new Mase(testData);

    mase.update({key: 'val'}, {
      $break: true,
      $update: function(doc){
        doc._id = doc._id*10;
      }
    }).find().should.be.eql([
        {_id: 10, name: 'one', key: 'val'},
        {_id: 2, name: 'two', key: 'val'},
        {_id: 3, name: 'three'},
        {_id: 4, name: 'four'}
      ]);
  });

};
