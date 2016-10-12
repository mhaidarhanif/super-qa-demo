(function(angular, undefined) {
  angular.module("superQaApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	]
})

;
})(angular);