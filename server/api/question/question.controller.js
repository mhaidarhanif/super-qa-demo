/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/questions              ->  index
 * POST    /api/questions              ->  create
 * GET     /api/questions/:id          ->  show
 * PUT     /api/questions/:id          ->  update
 * DELETE  /api/questions/:id          ->  destroy
 */

'use strict'

import _ from 'lodash'
import Question from './question.model'

function respondWithResult(res, statusCode) {
	statusCode = statusCode || 200
	return function (entity) {
		if (entity) {
			res.status(statusCode).json(entity)
		}
	}
}

function saveUpdates(updates) {
	return function (entity) {
		var updated = _.merge(entity, updates)
		return updated.saveAsync()
			.spread(updated => {
				return updated
			})
	}
}

function removeEntity(res) {
	return function (entity) {
		if (entity) {
			return entity.removeAsync()
				.then(() => {
					res.status(204).end()
				})
		}
	}
}

function handleEntityNotFound(res) {
	return function (entity) {
		if (!entity) {
			res.status(404).end()
			return null
		}
		return entity
	}
}

function handleError(res, statusCode) {
	statusCode = statusCode || 500
	return function (err) {
		res.status(statusCode).send(err)
	}
}

// =============================================================================

// An update or delete must be authorized first
function handleUnauthorized(req, res) {
	return function (entity) {
		if (!entity) {
			return null
		}
		if (entity.user._id.toString() !== req.user._id.toString()) {
			res.send(403).end()
			return null
		}
		return entity
	}
}

// Gets a list of Questions
export function index(req, res) {
	// query for selected questions
	var query = req.query.query && JSON.parse(req.query.query)
	Question.find(query).sort({ createdAt: -1 }).limit(20).execAsync()
		.then(respondWithResult(res))
		.catch(handleError(res))
}

// Gets a single Question from the DB
export function show(req, res) {
	Question.findByIdAsync(req.params.id)
		.then(handleEntityNotFound(res))
		.then(respondWithResult(res))
		.catch(handleError(res))
}

// Creates a new Question in the DB
export function create(req, res) {
	req.body.user = req.user
	Question.create(req.body)
		.then(respondWithResult(res, 201))
		.catch(handleError(res))
}

// Updates an existing Question in the DB
export function update(req, res) {
	if (req.body._id) {
		delete req.body._id
	}
	Question.findByIdAsync(req.params.id)
		.then(handleEntityNotFound(res))
		.then(handleUnauthorized(req, res)) // must be authenticated
		.then(saveUpdates(req.body))
		.then(respondWithResult(res))
		.catch(handleError(res))
}

// Deletes a Question from the DB
export function destroy(req, res) {
	Question.findByIdAsync(req.params.id)
		.then(handleEntityNotFound(res))
		.then(handleUnauthorized(req, res)) // must be authenticated
		.then(removeEntity(res))
		.catch(handleError(res))
}

// -----------------------------------------------------------------------------

// TODO: Get a list of Answers in a Question
export function indexAnswer(req, res) {
	Question.find({ _id: req.params.id, 'answers._id': req.params.answerId }).sort({ createdAt: -1 }).limit(20).execAsync()
		.then(respondWithResult(res))
		.catch(handleError(res))
}

// Create an Answer to a Question
export function createAnswer(req, res) {
	req.body.user = req.user
	Question.update({ _id: req.params.id }, { $push: { answers: req.body } }, function (err, num) {
		if (err) {
			return handleError(res)(err)
		}
		if (num === 0) {
			return res.send(404).end()
		}
		exports.show(req, res)
	})
}

// Update an Answer in a Question
export function updateAnswer(req, res) {
	Question.update({ _id: req.params.id, 'answers._id': req.params.answerId }, { 'answers.$.content': req.body.content, 'answers.$.user': req.user.id }, function (err, num) {
		if (err) {
			return handleError(res)(err)
		}
		if (num === 0) {
			return res.send(404).end()
		}
		exports.show(req, res)
	})
}

// Delete an Answer in a Question
export function destroyAnswer(req, res) {
	// TODO: Why update not delete?
	Question.update({ _id: req.params.id }, { $pull: { answers: { _id: req.params.answerId, 'user': req.user._id } } }, function (err, num) {
		if (err) {
			return handleError(res)(err)
		}
		if (num === 0) {
			return res.send(404).end()
		}
		exports.show(req, res)
	})
}

// =============================================================================

// votes

export function vote(req, res) {
	Question.update({ _id: req.params.id }, { $push: { votes: req.user.id } }, function (err, num) {
		if (err) {
			return handleError(res)(err);
		}
		if (num === 0) {
			return res.send(404).end();
		}
		exports.show(req, res);
	});
}
export function unvote(req, res) {
	Question.update({ _id: req.params.id }, { $pull: { votes: req.user.id } }, function (err, num) {
		if (err) {
			return handleError(res, err);
		}
		if (num === 0) {
			return res.send(404).end();
		}
		exports.show(req, res);
	});
}

/* vote/unvote answer */
export function voteAnswer(req, res) {
	Question.update({ _id: req.params.id, 'answers._id': req.params.answerId }, { $push: { 'answers.$.votes': req.user.id } }, function (err, num) {
		if (err) {
			return handleError(res)(err);
		}
		if (num === 0) {
			return res.send(404).end();
		}
		exports.show(req, res);
	});
}

export function unvoteAnswer(req, res) {
	Question.update({ _id: req.params.id, 'answers._id': req.params.answerId }, { $pull: { 'answers.$.votes': req.user.id } }, function (err, num) {
		if (err) {
			return handleError(res)(err);
		}
		if (num === 0) {
			return res.send(404).end();
		}
		exports.show(req, res);
	});
}
