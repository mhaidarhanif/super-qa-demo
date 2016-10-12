'use strict'

angular.module('superQaApp')
	.filter('fromNow', function () {
		return function (input) {
			return moment(input).locale(window.navigator.language).fromNow()
		}
	})
