var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {controller:"myController", templateUrl: "View1.html"})
		.otherwise({redirectTo: '/'});
}]); 