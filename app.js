var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

var port = process.env.PORT || 9002;

// __dirname app.js 项目根目录
console.log('I\'m on port '+ port + '!');

app.use(express.static(__dirname + '/static'));
// app.use(function (req, res) {
// 	res.sendFile('./static/index.html');
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 利用connet-mongo模块连接session
app.use(session({
  secret: 'chat-room',
  cookie: {maxAge: 1000*60*60*24*30}, // 30 days
  store: new MongoStore({
    url: 'mongodb://localhost/chat-room'
  }),
  resave: true, saveUninitialized: true
}));

// 业务逻辑
var Controllers = require('./controllers');
// 验证
app.get('/api/validate', function(req, res){
	_userId = req.session._userId;

	if(_userId){
		Controllers.User.findUserById(_userId, function(err, user){
			if(err){
				res.status(401).json({msg: err});
			}else{
				res.status(200).json(user);
			}
		});
	}else{
		res.status(401).json(null);
	}
});

// 登陆
app.post('/api/login', function(req, res){
	email = req.body.email;

	if(email){
		Controllers.User.findByEmailOrCreate(email, function(err, user){
			if(err){
				res.status(500).json({msg: err});
			}else{
				req.session._userId = user._id;
				res.status(200).json(user);
			}
		});
	}else{
		res.status(403);
	}
});

// 退出
app.get('/api/logout', function(req, res){
	req.session._userId = null;
	res.status(401);
});

// socket.io 使用方法
var io = require('socket.io').listen(app.listen(port));

var messages = [];

io.sockets.on('connection', function(socket){
	// 客户端连接上后向服务端发送请求
	socket.on('getAllMessages', function(){
		socket.emit('allMessages', messages);
	});

	socket.on('createMessage', function(message){
		messages.push(message);
		io.sockets.emit('messageAdded', message);
	});
	socket.emit('connected');
	
});

