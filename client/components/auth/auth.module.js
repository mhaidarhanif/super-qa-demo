'use strict';

angular.module('superQa3App.auth', [
  'superQa3App.constants',
  'superQa3App.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
