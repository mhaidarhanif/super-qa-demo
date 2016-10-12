'use strict'

angular.module('superQa3App')
	.controller('QuestionsCreateCtrl', function ($scope, $http, $location) {

		// Redirect to /login if not signed in yet
		if (!Auth.isLoggedIn()) {
			$location.path('/login');
			$location.replace();
			return;
		}

		// Get all questions from server
		$scope.submit = function () {
			$http.post('/api/questions', $scope.question).success(function () {
				$location.path('/')
			})
		}
	})
