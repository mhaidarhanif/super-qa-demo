'use strict';

angular.module('superQa3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionsCreate', {
        url: '/questions/create',
        templateUrl: 'app/questionsCreate/questionsCreate.html',
        controller: 'QuestionsCreateCtrl'
      });
  });
