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
		var connectedUsers = [];
		connectedUsers.addConnectedUser = function(userName){
			connectedUsers.push({username:userName});
		}
		connectedUsers.removeConnectedUser = function(index){
			connectedUsers.splice(index,1);
		}
		connectedUsers.getConnectedUsers = function(){
			return connectedUsers;
		}
		return connectedUsers;
	})
	.factory('conversation',function(){
		var conversation = {chat:[]};
		conversation.add = function(obj){
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