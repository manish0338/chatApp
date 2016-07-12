angular.module('chatApp')
	.filter('chat',function(){
		return function(data){
			console.log(data);
			return 0;
		}
	});