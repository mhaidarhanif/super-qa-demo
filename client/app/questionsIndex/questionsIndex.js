'use strict';

angular.module('superQa3App')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/questionsIndex/questionsIndex.html',
				controller: 'QuestionsIndexCtrl'
			});
	});
