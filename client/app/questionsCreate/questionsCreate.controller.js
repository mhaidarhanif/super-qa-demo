'use strict'

angular.module('superQa3App')
	.controller('QuestionsCreateCtrl', function ($scope, $http, $location) {
		$scope.submit = function () {
			$http.post('/api/questions', $scope.question).success(function () {
				$location.path('/')
			})
		}
	})
