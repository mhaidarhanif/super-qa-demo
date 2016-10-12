'use strict'

angular.module('superQaApp')
	.controller('QuestionsCreateCtrl', function ($scope, $http, $location) {

		// TODO: BUGGY
		// Redirect to /login if not signed in yet
		// if (!Auth.isLoggedIn()) {
		// 	$location.path('/login');
		// 	$location.replace();
		// 	return;
		// }

		// Get all questions from server
		$scope.submit = function () {
			$http.post('/api/questions', $scope.question).success(function () {
				$location.path('/')
			})
		}
	})
