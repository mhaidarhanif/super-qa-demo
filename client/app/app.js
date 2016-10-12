'use strict';

angular.module('superQaApp', [
  'superQaApp.auth',
  'superQaApp.admin',
  'superQaApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ui.pagedown',
  'ngTagsInput',
  'ngMessages'
])
	.config(function ($urlRouterProvider, $locationProvider) {
		$urlRouterProvider
			.otherwise('/');

		$locationProvider.html5Mode(true);
	});
