
var express = require('../')
  , request = require('supertest');

describe('req', function(){
  describe('.ip', function(){
    describe('when X-Forwarded-For is present', function(){
      describe('when "trust proxy" is enabled', function(){
        it('should return the client addr', function(done){
          var app = express();

          app.enable('trust proxy');

          app.use(function(req, res, next){
            res.send(req.ip);
          });

          request(app)
          .get('/')
          .set('X-Forwarded-For', 'client, p1, p2')
          .expect('client', done);
        })
      })

      describe('when "trust proxy" is disabled', function(){
        xit('should return the remote address', function(done){
          var app = express();

          app.use(function(req, res, next){
            res.send(req.ip);
          });

          request(app)
          .get('/')
          .set('X-Forwarded-For', 'client, p1, p2')
          .expect('127.0.0.1', done);
        })
      })
    })

    describe('when X-Forwarded-For is not present', function(){
      xit('should return the remote address', function(done){
        var app = express();

        app.enable('trust proxy');

        app.use(function(req, res, next){
          res.send(req.ip);
        });

        request(app)
        .get('/')
        .expect('127.0.0.1', done);
      })
    })
  })
})
