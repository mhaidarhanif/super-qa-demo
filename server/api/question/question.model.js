'use strict'

var mongoose = require('bluebird').promisifyAll(require('mongoose'))

var QuestionSchema = new mongoose.Schema({
	title: String,
	content: String,
	tags: [{
		text: String
  }],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	answers: [{
		content: String,
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		updatedAt: {
			type: Date,
			default: Date.now
		}
  }],
	comments: [{
		content: String,
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		},
		createdAt: {
			type: Date,
			default: Date.now,
		}
  }],
})

QuestionSchema.pre('find', function (next) {
	this.populate('user', 'name')
	this.populate('comments.user', 'name')
	this.populate('answers.user', 'name')
	this.populate('answers.comments.user', 'name')
	next()
})
QuestionSchema.pre('findOne', function (next) {
	this.populate('user', 'name')
	this.populate('comments.user', 'name')
	this.populate('answers.user', 'name')
	this.populate('answers.comments.user', 'name')
	next()
})


export default mongoose.model('Question', QuestionSchema)
