var express = require('express');
var app = express();
var http = require('http').Server(app);
var api = require('./api');
var accounts = require('./accounts');
var chat = require('./chat');
//var server = http.createServer(app);
var io = require('socket.io')(http);

//app.listen(3000);
app.use(express.static('./public'));
//http.createServer(app).listen(4000);
//app.use(chat);
app.use(accounts);
app.use('/api',api.router);

app.get('*',function(req,res){
	
	res.sendFile('main.html',{root: __dirname+'/public'});

});

io.on('connection',function(socket) {
	console.log('user connected');
	socket.emit('Sent to all');
    socket.on('chat',function(data){
    	console.log(data);
    	io.emit('chat' ,data);
    });
});




http.listen(3000,function(){
	console.log("Server Started on port 3000");
});