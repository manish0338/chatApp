var app = angular.module('chatApp');

app.controller('loginController',function($scope,Login,$location,User){
		$scope.login = function(){
		var user = new Login({username:$scope.username,password:$scope.password});
		user.$save(function(){
			User.setName($scope.username);
			$location.path('/chat');
		});
	};	
});

app.controller('chatController',function($scope,Chatting,connectedUsers){
	//console.log(new Date());
	$scope.msg = ['Manish'];
	Chatting.newConnect();
	Chatting.receiveMsg();
	$scope.connectedUsers = connectedUsers.getConnectedUsers();
	$scope.send = function(message){
		Chatting.sendMsg(message);
	};

	
});