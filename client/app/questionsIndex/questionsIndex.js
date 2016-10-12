'use strict'

angular.module('superQaApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/questionsIndex/questionsIndex.html',
				controller: 'QuestionsIndexCtrl',
				resolve: {
					query: function () {
						return {}
					}
				},
			})
			.state('votedQuestionsIndex', {
				url: '/users/:userId/voted',
				templateUrl: 'app/questionsIndex/questionsIndex.html',
				controller: 'QuestionsIndexCtrl',
				resolve: {
					query: function ($stateParams) {
						return {
							$or: [
								{ 'votes': $stateParams.userId },
								{ 'votes.stars': $stateParams.userId }
              ]
						}
					}
				},
			})
			.state('userQuestionsIndex', {
				url: '/users/:userId',
				templateUrl: 'app/questionsIndex/questionsIndex.html',
				controller: 'QuestionsIndexCtrl',
				resolve: {
					query: function ($stateParams) {
						return { user: $stateParams.userId }
					}
				},
			})

	})
