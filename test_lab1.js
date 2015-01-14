/**
 * New node file
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var winston = require('winston');

function genRandNum() {
	return Math.floor(Math.random() * 9) + 100;
}
describe('Routing', function() {
	var url = 'http://localhost:1212';
	before(function(done) {

		done();
	});

	for(i=0;i<1000;i++)
	{
		describe('FindPrimes', function() {
			it('should pass if the random number is between 1 and 1000', function(done) {

				var num={number: 11};
				request(url)
				.get('/findprimenumber')
				.query({number: genRandNum()})
				//.send(num)
//				end handles the response
				.end(function(err, res) {
					if (err) {
						throw err;
					}
//					this is should.js syntax, very clear
					res.should.have.status(200);
					done();
				});
			});
		});
	}

	describe('FindPrimes- number greater than 1000', function() {
		it('should fail coz the number is greater than 1000', function(done) {

			var num={number: 1001};
			request(url)
			.get('/findprimenumber')
			.query({number: 1001})
			//.send(num)
//			end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
//				this is should.js syntax, very clear
				res.should.have.status(400);
				done();
			});
		});
	});
	describe('FindPrimes-Should fail if the input is of format other than number!', function() {
		it('should fail!', function(done) {

			var num={number: 11};
			request(url)
			.get('/findprimenumber')
			.query({number: 'abcde'})
			//.send(num)
//			end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
//				this is should.js syntax, very clear
				res.should.have.status(400);
				done();
			});
		});
	});
	var i=0;
	for(i=0;i<2;i++)
	{
		describe('FindPrimes- test with data 1 or 0', function() {
			it('should pass but the appropriate response should be returned!', function(done) {


				request(url)

				.get('/findprimenumber')
				.query({number: 0})
				//.send(num)
//				end handles the response
				.end(function(err, res) {
					if (err) {
						throw err;
					}
//					this is should.js syntax, very clear
					res.should.have.status(200);
					done();
				});

			});
		});
	}

	for(i=0;i<1000;i++)
	{
		describe('CheckIfPrime', function() {
			it('should pass if the random number is between 1 and 1000', function(done) {

				var num={number: 11};
				request(url)
				.get('/checkifprimenumber')
				.query({number: genRandNum()})
				//.send(num)
//				end handles the response
				.end(function(err, res) {
					if (err) {
						throw err;
					}
//					this is should.js syntax, very clear
					res.should.have.status(200);
					done();
				});
			});
		});
	}
	describe('CheckIfPrimeNumber- number greater than 1000', function() {
		it('should fail coz the number is greater than 1000', function(done) {


			request(url)
			.get('/checkifprimenumber')
			.query({number: 1000+genRandNum()})
			//.send(num)
//			end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
//				this is should.js syntax, very clear
				res.should.have.status(400);
				done();
			});
		});
	});
	describe('CheckIfPrimeNumber-Should fail if the input is of format other than number!', function() {
		it('should fail!', function(done) {

			var num={number: 11};
			request(url)
			.get('/checkifprimenumber')
			.query({number: 'abcde'})
			//.send(num)
//			end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
//				this is should.js syntax, very clear
				res.should.have.status(400);
				done();
			});
		});
	});
	describe('CheckIfPrimeNumber- test with data 1 or 0', function() {
		it('should pass but the appropriate response should be returned!', function(done) {

			var num={number: 11};
			request(url)
			.get('/checkifprimenumber')
			.query({number: 1})
			//.send(num)
//			end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
//				this is should.js syntax, very clear
				res.should.have.status(200);
				done();
			});
		});
	});





});