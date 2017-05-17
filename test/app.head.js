
var express = require('../');
var request = require('supertest');
var assert = require('assert');

describe('app.head()', function(){
  it('should override prior', function(done){
    var app = express()
      , called;

    app.head('/tobi', function(req, res){
      called = true;
      res.end('');
    });

    app.get('/tobi', function(req, res){
      assert(0, 'should not call GET');
      res.send('tobi');
    });

    request(app)
    .head('/tobi')
    .expect(200, function(){
      assert(called);
      done();
    });
  })
  it('should override after', function(done){
    var app = express()
      , called;

    app.get('/tobi', function(req, res){
      assert(0, 'should not call GET');
      res.send('tobi');
    });

    app.head('/tobi', function(req, res){
      called = true;
      res.end('');
    });

    request(app)
    .head('/tobi')
    .expect(200, function(){
      assert(called);
      done();
    });
  })
})
