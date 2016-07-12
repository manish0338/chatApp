angular.module('chatApp')
	.service('Chatting',function(User,wsConnection,conversation,$http){
		
		this.newConnect = function(){
			wsConnection.emit('new',User.getName());
			//this.receiveMsg();
		};

		this.sendMsg = function(msg,recipient){
			var message = {
				sender:User.getName(), 
				recipient:recipient, 
				message:msg, 
				datetime: new Date()
			};
			wsConnection.emit('chat',angular.toJson(message));
		};

		this.receiveMsg = function(scope){
			wsConnection.on('chat',function(msg){
			conversation.add(msg);
			scope.$digest();
			});
		};

		this.search = function(query){
			return $http.post('/search',{search:query});
		};
	});