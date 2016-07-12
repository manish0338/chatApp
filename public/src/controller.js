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

app.controller('chatController',function($scope,Chatting,connectedUsers,conversation){
	//console.log(new Date());
	$scope.msg = ['Manish'];
	Chatting.newConnect();
	Chatting.receiveMsg($scope);
	$scope.$watch(conversation.get());
	$scope.conversation = conversation.get();
	$scope.connectedUsers = connectedUsers.getConnectedUsers();
	$scope.send = function(message){
		Chatting.sendMsg(message,$scope.selectedUser);
	};

	$scope.search = function(query){
		Chatting.search(query).then(function(res){
				console.log(res.data);
				$scope.result = res.data.result;
			});
	};

	$scope.add = function(name){
		connectedUsers.addConnectedUser(name);
		$scope.selectedUser = name;
	};

	$scope.select = function(name){
		$scope.selectedUser = name;
	}
});