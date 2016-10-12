'use strict'

class NavbarController {
	//start-non-standard
	menu = [{
		'title': 'All Questions',
		'state': 'main'
  }]

	isCollapsed = true
		//end-non-standard

	constructor(Auth) {
		this.menu = [
			{
				'title': 'All Questions',
				'link': function () {
					return '/'
				},
				'show': function () {
					return true
				},
			},
			{
				'title': 'My Questions',
				'link': function () {
					return '/users/' + Auth.getCurrentUser()._id
				},
				'show': Auth.isLoggedIn,
			},
			{
				'title': 'Voted by Me',
				'link': function () {
					return '/users/' + Auth.getCurrentUser()._id + '/voted'
				},
				'show': Auth.isLoggedIn,
			},
		]

		this.isLoggedIn = Auth.isLoggedIn
		this.isAdmin = Auth.isAdmin
		this.getCurrentUser = Auth.getCurrentUser
	}
}

angular.module('superQaApp')
	.controller('NavbarController', NavbarController)
