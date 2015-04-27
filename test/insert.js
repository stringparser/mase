'use strict';

var should = require('should');

module.exports = function(Mase, util){
  should.exists(util);

  it('value documents into db, insert(1) -> {value: 1}', function(){
    var mase = new Mase();

    mase.insert(1);
    mase.find().should.containDeep([
      {value: 1}
    ]);
  });

  it('object documents into db, insert({name: \'one\'})', function(){
    var mase = new Mase();

    mase.insert({name: 'one'});

    mase.find().should.containDeep([{name: 'one'}]);
  });

  it('attach given id if provided, {id: 1, name: \'one\'}', function(){
    var mase = new Mase();

    mase.insert({_id: 1, name: 'one'});

    mase.find().should.be.eql([
      {_id: 1, name: 'one'}
    ]);
  });

  it('attach id when is not provided', function(){
    var mase = new Mase();

    mase.insert('one');

    mase.find()[0].should.have.property('_id');
  });
};
