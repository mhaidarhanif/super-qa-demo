'use strict';

describe('Controller: QuestionsShowCtrl', function () {

  // load the controller's module
  beforeEach(module('superQa3App'));

  var QuestionsShowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuestionsShowCtrl = $controller('QuestionsShowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
