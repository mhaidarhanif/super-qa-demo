'use strict';

angular.module('superQaApp.auth', [
  'superQaApp.constants',
  'superQaApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
