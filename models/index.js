var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat-room');

// 检查是否连接成功
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log('mongoose connection is no problem!');
});

exports.User = mongoose.model('User', require('./user'));