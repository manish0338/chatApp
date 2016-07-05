angular.module('chatApp')
	.factory('Login', function($resource){
		return $resource('/login');
	});