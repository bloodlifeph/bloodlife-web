var start = require('../app').start;
var shutdown = require('../app').shutdown;
var port = require('../app').port;
var superagent = require('superagent');
var expect = require('expect.js');

describe('server', function () {
    before(function () {
        console.log('starting app');
        start();
        console.log('app started');
    });
    
    describe('homepage', function(){
        it('should respond to GET',function(done){
            superagent
            .get('http://localhost:'+port)
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done()
            })
        })
    });
    
    after(function () {
        shutdown();
    });
});