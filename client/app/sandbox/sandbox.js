'use strict';

angular.module('superQaApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('sandbox', {
				url: '/sandbox',
				templateUrl: 'app/sandbox/sandbox.html',
				controller: 'SandboxController',
				controllerAs: 'sandbox'
			});
	});
