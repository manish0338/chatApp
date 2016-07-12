var express = require('express');
var app = express();
var http = require('http').Server(app);
var api = require('./api');
var accounts = require('./accounts');
var chat = require('./chat');
var validate = require('./validate')
//var server = http.createServer(app);
var io = require('socket.io')(http);

//app.listen(3000);
app.use(express.static('./public'));
//http.createServer(app).listen(4000);
//app.use(chat);
app.use(accounts);
//app.use(validate);
app.use('/api',api.router);

app.get('*',function(req,res){
	
	res.sendFile('main.html',{root: __dirname+'/public'});

});

var connections = {};

io.on('connection',function(socket) {
	socket.on('new',function(data){
		console.log('new');
		if(data in Object.keys(connections))
			;
		else{
			socket.name = data;
			connections[data] = socket;
		}
	});
    socket.on('chat',function(data){
    	data = JSON.parse(data);
    	console.log(data);
    	//connections[data.recipient].emit('chat' ,data);
    	socket.emit('chat', data);
    });
    socket.on('disconnect',function(){
    	console.log(socket.name + ' dis-connected');
    	delete connections[socket.name];
    });
});




http.listen(3000,function(){
	console.log("Server Started on port 3000");
});