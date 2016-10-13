'use strict';

describe('Controller: SandboxController', function () {

	// load the controller's module
	beforeEach(module('superQaApp'));
	beforeEach(module('stateMock'));
	beforeEach(module('socketMock'));

	var scope;
	var SandboxController;
	var state;
	var $httpBackend;

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, $state) {
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/api/things')
			.respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

		scope = $rootScope.$new();
		state = $state;
		SandboxController = $controller('SandboxController', {
			$scope: scope
		});
	}));

	it('should attach a list of things to the controller', function () {
		$httpBackend.flush();
		expect(SandboxController.awesomeThings.length).to.equal(4);
	});
});
