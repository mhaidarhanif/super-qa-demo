'use strict';

angular.module('superQa3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionsShow', {
        url: '/questions/show/:id',
        templateUrl: 'app/questionsShow/questionsShow.html',
        controller: 'QuestionsShowCtrl'
      });
  });
