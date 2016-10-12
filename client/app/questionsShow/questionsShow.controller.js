'use strict'

angular.module('superQaApp')
	.controller('QuestionsShowCtrl', function ($scope, $http, $stateParams, Auth, $location) {

		$scope.isOwner = function (obj) {
			return Auth.isLoggedIn() && obj && obj.user && obj.user._id === Auth.getCurrentUser()._id
		}

		let loadQuestions = function () {
			$http.get('/api/questions/' + $stateParams.id).success(function (question) {
				$scope.question = question
			})
		}

		loadQuestions()

		// ------------------------------------------------------------------------
		// answers

		$scope.newAnswer = {}
		$scope.submitAnswer = function () {
			$http.post('/api/questions/' + $stateParams.id + '/answers', $scope.newAnswer).success(function () {
				loadQuestions()
				$scope.newAnswer = {}
			})
		}

		$scope.deleteQuestion = function () {
			$http.delete('/api/questions/' + $stateParams.id).success(function () {
				$location.path('/')
			})
		}

		$scope.deleteAnswer = function (answer) {
			$http.delete('/api/questions/' + $stateParams.id + '/answers/' + answer._id).success(function () {
				loadQuestions()
			})
		}

		$scope.updateQuestion = function () {
			$http.put('/api/questions/' + $stateParams.id, $scope.question).success(function () {
				loadQuestions()
			})
		}

		$scope.updateAnswer = function (answer) {
			$http.put('/api/questions/' + $stateParams.id + '/answers/' + answer._id, answer).success(function () {
				loadQuestions()
			})
		}

		// ------------------------------------------------------------------------
		// votes

		$scope.isVote = function (obj) {
			return Auth.isLoggedIn() && obj && obj.votes && obj.votes.indexOf(Auth.getCurrentUser()._id) !== -1
		}
		$scope.vote = function (subpath) {
			$http.put('/api/questions/' + $scope.question._id + subpath + '/vote').success(function () {
				loadQuestions()
			})
		}
		$scope.unvote = function (subpath) {
			$http.delete('/api/questions/' + $scope.question._id + subpath + '/vote').success(function () {
				loadQuestions()
			})
		}

	})
