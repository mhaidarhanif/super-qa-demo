'use strict'

var express = require('express')
var controller = require('./question.controller')
var auth = require('../../auth/auth.service')

var router = express.Router()

// questions

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', auth.isAuthenticated(), controller.create)
router.put('/:id', auth.isAuthenticated(), controller.update)
router.patch('/:id', auth.isAuthenticated(), controller.update)
router.delete('/:id', auth.isAuthenticated(), controller.destroy)

// answers

router.post('/:id/answers', auth.isAuthenticated(), controller.createAnswer)
router.put('/:id/answers/:answerId', auth.isAuthenticated(), controller.updateAnswer)
router.delete('/:id/answers/:answerId', auth.isAuthenticated(), controller.destroyAnswer)

// comments

router.post('/:id/answers/:answerId/comments', auth.isAuthenticated(), controller.createAnswerComment)
router.put('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.updateAnswerComment)
router.delete('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.destroyAnswerComment)

// votes

router.put('/:id/vote', auth.isAuthenticated(), controller.vote)
router.delete('/:id/vote', auth.isAuthenticated(), controller.unvote)
router.put('/:id/answers/:answerId/vote', auth.isAuthenticated(), controller.voteAnswer)
router.delete('/:id/answers/:answerId/vote', auth.isAuthenticated(), controller.unvoteAnswer)
router.put('/:id/comments/:commentId/vote', auth.isAuthenticated(), controller.voteComment)
router.delete('/:id/comments/:commentId/vote', auth.isAuthenticated(), controller.unvoteComment)
router.put('/:id/answers/:answerId/comments/:commentId/vote', auth.isAuthenticated(), controller.voteAnswerComment)
router.delete('/:id/answers/:answerId/comments/:commentId/vote', auth.isAuthenticated(), controller.unvoteAnswerComment)

module.exports = router
