'use strict';

var should = require('should');

module.exports = function(Mase, util){
  should.exists(util);

  it('instance should have property `name`', function(){
    var mase = new Mase();
    mase.should.have.property('name');
  });

  it('instance should be empty when no data is given', function(){
    var mase = new Mase();
    mase.find().should.be.eql([]);
  });

  it('instances should not have conflict', function(){
    var one = new Mase();
    var two = new Mase();

    one.insert({one: 1});
    two.insert({two: 2});

    one.find().should.have.property('length', 1);
    two.find().should.have.property('length', 1);

    one.find().should.containDeep([{one: 1}]);
    two.find().should.containDeep([{two: 2}]);
  });

  it('instances same name share data', function(){
    var one = new Mase('label');
    var two = new Mase('label');

    one.insert({one: 1});
    two.insert({two: 2});

    one.find().should.have.property('length', 2);
    two.find().should.have.property('length', 2);

    one.find().should.containDeep([{one: 1}, {two: 2}]);
    two.find().should.containDeep([{one: 1}, {two: 2}]);
  });

  it('instance with given `name`', function(){
    var mase = new Mase('collection');
    mase.should.have.property('name', 'collection');
  });

  it('instance with given `data` [1,2,3]', function(){
    var mase = new Mase(data), data = [1,2,3];

    mase.find().forEach(function(doc, index){
      doc.should.have.property('value', data[index]);
    });
  });

  it('instance with given `data` [{name: \'one\'}, ...]', function(){

    var data = ['one', 'two', 'three'].map(function(name){
      return {name: name};
    });

    var mase = new Mase(data);

    mase.find().forEach(function(doc, index){
      doc.should.have.property('name', data[index].name);
    });

  });
};
