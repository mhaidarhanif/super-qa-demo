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

// votes

router.put('/:id/vote', auth.isAuthenticated(), controller.vote)
router.delete('/:id/vote', auth.isAuthenticated(), controller.unvote)
router.put('/:id/answers/:answerId/vote', auth.isAuthenticated(), controller.voteAnswer)
router.delete('/:id/answers/:answerId/vote', auth.isAuthenticated(), controller.unvoteAnswer)

module.exports = router
