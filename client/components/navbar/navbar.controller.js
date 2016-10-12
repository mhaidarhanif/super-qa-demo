'use strict';

class NavbarController {
	//start-non-standard
	menu = [{
		'title': 'Questions',
		'state': 'main'
  }];

	isCollapsed = true;
	//end-non-standard

	constructor(Auth) {
		this.isLoggedIn = Auth.isLoggedIn;
		this.isAdmin = Auth.isAdmin;
		this.getCurrentUser = Auth.getCurrentUser;
	}
}

angular.module('superQa3App')
	.controller('NavbarController', NavbarController);
