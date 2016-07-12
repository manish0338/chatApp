var express = require('express');
var app = express();
var http = require('http').Server(app);
var api = require('./api');
var accounts = require('./accounts');
var io = require('socket.io')(http);

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
	console.log(socket.name + ' connected');
	socket.on('new',function(userName){
		console.log('new');
		if(userName in Object.keys(connections))
			;
		else{
			socket.name = userName;
			connections[userName] = socket;
		}
	});
    socket.on('chat',function(msg){
    	msg = JSON.parse(msg);
    	console.log(msg);
    	if(msg.recipient && connections[msg.recipient])
    	connections[msg.recipient].emit('chat' ,msg);
    	socket.emit('chat', msg);
    });
    socket.on('disconnect',function(){
    	console.log(socket.name + ' dis-connected');
    	delete connections[socket.name];
    });
});




http.listen(3000,function(){
	console.log("Server Started on port 3000");
});