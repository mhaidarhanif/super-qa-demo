'use strict'

angular.module('superQa3App')
	.controller('QuestionsShowCtrl', function ($scope, $http, $stateParams) {
		var loadQuestions = function () {
			$http.get('/api/questions/' + $stateParams.id).success(function (question) {
				$scope.question = question
			})
		}
		loadQuestions()
	})
