'use strict'

angular.module('superQa3App')
	.controller('QuestionsShowCtrl', function ($scope, $http, $stateParams) {
		let loadQuestions = function () {
			$http.get('/api/questions/' + $stateParams.id).success(function (question) {
				$scope.question = question
			})
		}
		loadQuestions()

		$scope.newAnswer = {}
		$scope.submitAnswer = function () {
			$http.post('/api/questions/' + $stateParams.id + '/answers', $scope.newAnswer).success(function () {
				loadQuestions()
				$scope.newAnswer = {}
			})
		}
	})
