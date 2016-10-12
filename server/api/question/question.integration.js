'use strict'

import request from 'supertest'

const app = require('../..')
const User = require('../user/user.model')

let newQuestion

describe('Question API:', function () {

	// Need authentication

	var user
	before(function () {
		return User.removeAsync().then(function () {
			user = new User({
				name: 'Fake User',
				email: 'test@example.com',
				password: 'password'
			})

			return user.saveAsync()
		})
	})

	var token
	before(function (done) {
		request(app)
			.post('/auth/local')
			.send({
				email: 'test@example.com',
				password: 'password'
			})
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				token = res.body.token
				done()
			})
	})

	// It's fine without authentication
	describe('GET /api/questions', function () {
		var questions

		beforeEach(function (done) {
			request(app)
				.get('/api/questions')
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err)
					}
					questions = res.body
					done()
				})
		})

		it('should respond with JSON array', function () {
			expect(questions).to.be.instanceOf(Array)
		})

	})

	// Need authentication
	describe('POST /api/questions', function () {
		beforeEach(function (done) {
			request(app)
				.post('/api/questions')
				.set('authorization', 'Bearer ' + token) // need auth
				.send({
					title: 'New Question',
					content: 'This is the brand new question!!!'
				})
				.expect(201)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err)
					}
					newQuestion = res.body
					done()
				})
		})

		it('should respond with the newly created question', function () {
			expect(newQuestion.title).to.equal('New Question')
			expect(newQuestion.content).to.equal('This is the brand new question!!!')
		})

	})

	describe('GET /api/questions/:id', function () {
		var question

		beforeEach(function (done) {
			request(app)
				.get('/api/questions/' + newQuestion._id)
				.set('authorization', 'Bearer ' + token) // need auth
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err)
					}
					question = res.body
					done()
				})
		})

		afterEach(function () {
			question = {}
		})

		it('should respond with the requested question', function () {
			expect(question.title).to.equal('New Question')
			expect(question.content).to.equal('This is the brand new question!!!')
		})

	})

	describe('PUT /api/questions/:id', function () {
		var updatedQuestion

		beforeEach(function (done) {
			request(app)
				.put('/api/questions/' + newQuestion._id)
				.set('authorization', 'Bearer ' + token) // need auth
				.send({
					title: 'Updated Question',
					content: 'This is the updated question!!!'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err)
					}
					updatedQuestion = res.body
					done()
				})
		})

		afterEach(function () {
			updatedQuestion = {}
		})

		it('should respond with the updated question', function () {
			expect(updatedQuestion.title).to.equal('Updated Question')
			expect(updatedQuestion.content).to.equal('This is the updated question!!!')
		})

	})

	describe('DELETE /api/questions/:id', function () {

		it('should respond with 204 on successful removal', function (done) {
			request(app)
				.delete('/api/questions/' + newQuestion._id)
				.set('authorization', 'Bearer ' + token) // need auth
				.expect(204)
				.end((err, res) => {
					if (err) {
						return done(err)
					}
					done()
				})
		})

		it('should respond with 404 when question does not exist', function (done) {
			request(app)
				.delete('/api/questions/' + newQuestion._id)
				.set('authorization', 'Bearer ' + token) // need auth
				.expect(404)
				.end((err, res) => {
					if (err) {
						return done(err)
					}
					done()
				})
		})

	})

})
