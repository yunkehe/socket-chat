
chatRoomApp.controller('RoomCtrl', ['$scope', 'socket', function($scope, socket){
	$scope.messages = [];
	// 初始化获取所有消息
	socket.emit('getAllMessages');
	socket.on('allMessage', function(messages){
		$scope.messages = messages;
	});

	// 消息增加
	socket.on('messageAdded', function(message){
		$scope.messages.push(message);
	})
}]);
