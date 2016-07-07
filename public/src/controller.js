var app = angular.module('chatApp');

app.controller('loginController',function($scope,Login,$location){
		$scope.login = function(){
		var user = new Login({username:$scope.username,password:$scope.password});
		user.$save(function(){
			$location.path('/chat');
		});
	};	
});

app.controller('chatController',function($scope){
	var socket = io();
	$scope.msg = ['Manish'];
	$scope.send = function(){
		console.log('send '+ $scope.message);
		socket.emit('chat',$scope.message);
		$scope.message = '';
	}

	socket.on('chat',function(data){
		console.log('message');
		$scope.msg.push(data);
		$scope.$apply();
	});
});