'use strict'

angular.module('superQa3App')
	.controller('QuestionsIndexCtrl', function ($scope, $http) {
		$http.get('/api/questions').success(function (questions) {
			$scope.questions = questions
		})
	})
