angular.module('chatApp')
	.directive('message',function(){
		var directive = {};
		directive.restrict='E';
		//directive.template = "<h1>Manisssh</h1>";
		directive.link = function($scope, element, attributes){
			var chat = $scope.conversation | chat;
			element.html("<h2>Manish</h2>"+$scope.msg);
		};
		return directive;
	});