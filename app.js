var express = require('express');
var app = express();

var port = process.env.PORT || 9002;

app.use(express.static(__dirname + 'static'));
app.use(function (req, res) {
	res.sendfile('./static/index.html');
});

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket){
	socket.emit('connected');
});

console.log('I\'m on port '+ port + '!');

app.use(express.static(__dirname + '/static'));

app.use(function(req, res){
	res.sendfile('./static/index.html');
});