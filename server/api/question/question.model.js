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
	votes: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
  }],
	answers: [{
		content: String,
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		},
		votes: [{
			type: mongoose.Schema.ObjectId,
			ref: 'User'
	  }],
		createdAt: { // timestamp
			type: Date,
			default: Date.now
		},
		updatedAt: { // timestamp
			type: Date,
			default: Date.now
		}
  }]
}, { timestamps: true })

QuestionSchema.pre('find', function (next) {
	this.populate('user', 'name')
	this.populate('answers.user', 'name')
	next()
})
QuestionSchema.pre('findOne', function (next) {
	this.populate('user', 'name')
	this.populate('answers.user', 'name')
	next()
})


export default mongoose.model('Question', QuestionSchema)
