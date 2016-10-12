'use strict';

angular.module('superQaApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main.legacy', {
				url: '/',
				templateUrl: 'app/main/main.html',
				controller: 'MainController',
				controllerAs: 'main'
			});
	});
