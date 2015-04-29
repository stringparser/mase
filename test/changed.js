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

  it('should notify on insert', function(done){
    var db = new Mase(testData);

    db.changed = function(method){
      method.should.be.eql('insert');
      done();
    };

    db.insert({_id: 5, num: 5});
  });

  it('should give change and doc on insert', function(done){
    var db = new Mase(testData);

    db.changed = function(method, change, doc){
      method.should.be.eql('insert');
      change.should.be.eql({_id: 5, name: 'five'});
      (doc === null).should.be.eql(true);
      done();
    };

    db.insert({_id: 5, name: 'five'});
  });

  it('should notify on remove', function(done){
    var db = new Mase(testData);

    db.changed = function(method){
      method.should.be.eql('remove');
      done();
    };

    db.remove(4);
  });

  it('should give change and doc on remove', function(done){
    var db = new Mase(testData);

    db.changed = function(method, change, doc){
      method.should.be.eql('remove');
      (change === null).should.be.eql(true);
      doc.should.be.eql({_id: 4, name: 'four'});
      done();
    };

    db.remove(4);
  });

  it('should notify on update', function(done){
    var db = new Mase(testData);

    db.changed = function(method){
      method.should.be.eql('update');
      done();
    };

    db.update({_id: 4}, {num: 5});
  });

  it('should give change and doc on update', function(done){
    var db = new Mase(testData);

    db.changed = function(method, change, doc){
      method.should.be.eql('update');
      change.should.be.eql({num: 4});
      doc.should.be.eql({_id: 4, name: 'four'});
      done();
    };

    db.update({_id: 4}, {num: 4});
  });

  it('should notify on upsert with `insert`', function(done){
    var db = new Mase(testData);

    db.changed = function(method){
      method.should.be.eql('insert');
      done();
    };

    db.update({_id: 6}, {value: 6}, {$upsert: true});
  });
};
