'use strict';

angular.module('superQa3App')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main.legacy', {
				url: '/',
				templateUrl: 'app/main/main.html',
				controller: 'MainController',
				controllerAs: 'main'
			});
	});
