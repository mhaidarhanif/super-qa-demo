'use strict';

angular.module('superQaApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/questionsIndex/questionsIndex.html',
				controller: 'QuestionsIndexCtrl'
			});
	});
