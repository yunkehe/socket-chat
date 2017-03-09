

chatRoomApp.controller('MessageCreatorCtrl', ['$scope', 'socket', function($scope, socket){
	$scope.newMessage = '';
	$scope.createMessage = function(){
		if($scope.newMessage == '') return;

		socket.emit('createMessage', $scope.newMessage);
		socket.newMessage = '';
	}
}]);
