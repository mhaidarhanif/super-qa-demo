'use strict'

angular.module('superQaApp')
	.controller('QuestionsIndexCtrl', function ($scope, $http, Auth, query) {

		$http.get('/api/questions', { params: { query: query } }).success(function (questions) {
			$scope.questions = questions
		})

		$scope.isVote = function (obj) {
			return Auth.isLoggedIn() && obj && obj.votes && obj.votes.indexOf(Auth.getCurrentUser()._id) !== -1
		}

	})
