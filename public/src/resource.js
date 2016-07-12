angular.module('chatApp')
	.factory('Login', function($resource){
		return $resource('/login');
	})
	.factory('User', function(){
		var user = {};
		
		user.name=null;
		user.setName = function(name){
			user.name = name;
		}
		user.getName = function(){
			return user.name;
		}
		
		return user;
	})
	.factory('connectedUsers',function(){
		var connectedUsers = {};
		connectedUsers.users=[];
		connectedUsers.addConnectedUser = function(userName){
			//console.log('ind '+connectedUsers.indexOf({username:userName}));
			//console.log(connectedUsers.users);
			if(connectedUsers.users.indexOf(userName)==-1)
				connectedUsers.users.push(userName);
		}
		connectedUsers.removeConnectedUser = function(index){
			connectedUsers.users.splice(index,1);
		}
		connectedUsers.getConnectedUsers = function(){
			return connectedUsers.users;
		}
		return connectedUsers;
	})
	.factory('conversation',function(connectedUsers){
		var conversation = {chat:[]};
		conversation.add = function(obj){
			connectedUsers.addConnectedUser(obj.recipient);
			conversation.chat.push(obj);
		}
		conversation.get = function(){
			return conversation.chat;
		}
		return conversation;
	})
	.factory('wsConnection',function(){
		return io();
	});