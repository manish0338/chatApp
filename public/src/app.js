var app = angular.module("chatApp",["ngRoute","ngResource"]);

app.config(function($routeProvider,$locationProvider){
		$routeProvider
		.when("/",{
			controller : "loginController",
			templateUrl : "views/login.html"
		})
		.when("/chat",{
			controller : "chatController",
			templateUrl: "views/chat.html"
		});
		$locationProvider.html5Mode(true);
	});