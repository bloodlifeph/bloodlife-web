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
        it('should display homepage',function(done){
            superagent
            .get('http://localhost:'+port)
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done()
            })
        })
    });

    describe('retrieve providers', function(){
        it('should display list of providers',function(done){
            superagent
            .get('http://localhost:'+port+ '/providers')
            .end(function(err, res){
                expect(res.text).contain('providers');
                expect(res.status).to.equal(200);
                done()
            })
        })
    });

    // No data provided
    describe('inquire no-params', function(){
        it('should return an error',function(done){
            superagent
            .post('http://localhost:'+port+'/inquire')
            .type('json')
            .end(function(err, res){
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.result).to.equal('NOK');
                expect(data.errors.fullName).to.equal('Please provide your Full Name to allow Bloodbanks and Hospitals to contact you.')
                done()
            })
        })
    });

    // Email address, Contact Number and Blood type not provided
    describe('inquire fullName provided', function(){
        it('should return an error',function(done){

            var data = {
                fullName : 'Paul Sydney Orozco'
            }

            superagent
            .post('http://localhost:'+port+'/inquire')
            .type('json')
            .send(data)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.result).to.equal('NOK');
                expect(data.errors.emailAddress).to.equal('Please provide correct email.');
                done()
            })
        })
    });

    // Contact Number and Blood type not provided
    describe('inquire fullName, emailAddress provided', function(){
        it('should return an error',function(done){

            var data = {
                fullName : 'Paul Sydney Orozco',
                emailAddress : 'foo@bar.com'
            }

            superagent
            .post('http://localhost:'+port+'/inquire')
            .type('json')
            .send(data)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.result).to.equal('NOK');
                expect(data.errors.contactNumber).to.equal('Please provide your Contact Number(s) to allow Bloodbanks and Hospitals to contact you.');
                done()
            })
        })
    });

    // Blood type not provided
    describe('inquire fullName, email, contactNumber provided', function(){
        it('should return an error',function(done){

            var data = {
                fullName : 'Paul Sydney Orozco',
                emailAddress : 'foo@bar.com',
                contactNumber : '1234567890'
            }

            superagent
            .post('http://localhost:'+port+'/inquire')
            .type('json')
            .send(data)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.result).to.equal('NOK');
                expect(data.errors.bloodType).to.equal('Please provide the type of blood you are requesting.');
                done()
            })
        })
    });

    // All data provided
    describe('inquire fullName, email, contactNumber, bloodType provided', function(){
        it('should pass the post',function(done){

            var data = {
                fullName : 'Paul Sydney Orozco',
                emailAddress : 'foo@bar.com',
                contactNumber : '1234567890',
                bloodType : 'O-'
            }

            superagent
            .post('http://localhost:'+port+'/inquire')
            .type('json')
            .send(data)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.result).to.equal('OK');
                expect(data.message).to.equal('Successfully broadcasted your request. Kindly wait for the trusted blood providers to reach you.');
                done()
            })
        })
    });

    // Wrong email 
    describe('inquire wrong email provided', function(){
        it('should fail with wrong email',function(done){

            var data = {
                fullName : 'Paul Sydney Orozco',
                emailAddress : 'foo'
            }

            superagent
            .post('http://localhost:'+port+'/inquire')
            .type('json')
            .send(data)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.result).to.equal('NOK');
                expect(data.errors.emailAddress).to.equal('Please provide correct email.');
                done()
            })
        })
    });

    // Wrong email 
    describe('inquire wrong email provided', function(){
        it('should fail with wrong email',function(done){

            var data = {
                fullName : 'Paul Sydney Orozco',
                emailAddress : 'foo@'
            }

            superagent
            .post('http://localhost:'+port+'/inquire')
            .type('json')
            .send(data)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.result).to.equal('NOK');
                expect(data.errors.emailAddress).to.equal('Please provide correct email.');
                done()
            })
        })
    });

    // Wrong email 
    describe('inquire wrong email provided', function(){
        it('should fail with wrong email',function(done){

            var data = {
                fullName : 'Paul Sydney Orozco',
                emailAddress : 'foo@bar'
            }

            superagent
            .post('http://localhost:'+port+'/inquire')
            .type('json')
            .send(data)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.result).to.equal('NOK');
                expect(data.errors.emailAddress).to.equal('Please provide correct email.');
                done()
            })
        })
    });
    
    after(function () {
        shutdown();
    });
});