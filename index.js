var express = require('express');
var http = require('http');
var socketIo = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIo(server);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	
	console.log('a user connected');
	
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	socket.on('client_message', function(msg) {
		console.log('message: ' + msg);

		io.emit('server_message', msg);
	});
});

server.listen(3000, function() {
	console.log('listening on *:3000');
});
