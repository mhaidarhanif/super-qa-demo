'use strict';

angular.module('superQaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionsShow', {
        url: '/questions/show/:id',
        templateUrl: 'app/questionsShow/questionsShow.html',
        controller: 'QuestionsShowCtrl'
      });
  });
