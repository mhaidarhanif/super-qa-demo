'use strict';

angular.module('superQaApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('sandbox', {
				url: '/',
				templateUrl: 'app/sandbox/sandbox.html',
				controller: 'SandboxController',
				controllerAs: 'sandbox'
			});
	});
