'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var QuestionSchema = new mongoose.Schema({
	title: String,
	content: String,
	active: Boolean
});

export default mongoose.model('Question', QuestionSchema);
