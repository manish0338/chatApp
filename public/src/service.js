angular.module('chatApp')
	.service('Chatting',function(User,wsConnection,conversation){
		
		this.newConnect = function(){
			wsConnection.emit('new',User.getName());
			//this.receiveMsg();
		};

		this.sendMsg = function(msg){
			var message = {
				sender:User.getName(), 
				recipient:null, 
				message:msg, 
				datetime: new Date()
			};
			wsConnection.emit('chat',angular.toJson(message));
		};

		this.receiveMsg = function(){
			wsConnection.on('chat',function(msg){
			conversation.add(msg);
			console.log(conversation.get());
			});
		};
	});