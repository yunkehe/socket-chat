var chatRoomApp = angular.module('chatRoomApp', []);

var SocketFactory = chatRoomApp.factory('socket', function($rootScope){
	var socket = io.connect('/');
	return {
		on: function(eventName, callback){
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				})
			});
		},
		emit: function(eventName, data, callback){
			socket.emit(eventName, data, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					if(typeof callback === 'function'){
						callback.apply(socket, args);
					}
				});
			})
		}
	};
});

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

chatRoomApp.controller('MessageCreatorCtrl', ['$scope', 'socket', function($scope, socket){
	$scope.newMessage = '';
	$scope.createMessage = function(){
		if($scope.newMessage == '') return;

		socket.emit('createMessage', $scope.newMessage);
		socket.newMessage = '';
	}
}]);

chatRoomApp.directive('autoScrollToBottom', function(){
	return {
		link: function(scope, element, attrs){
			scope.$watch(function(){
				return element.children().length;
			}, function(){
				element.animate({
					scrollTop: element.prop('scrollHeight')
				}, 1000);
			})
		}
	}
});

chatRoomApp.directive('ctrlEnterBreakLine', function(){
	return function(scope, element, attrs){
		var ctrlDown = false;

		element.bind('keydown', function(e){
			if(e.keyCode === 17){
				ctrlDown = true;
				setTimeout(function(){
					ctrlDown = false;
				}, 1000)
			}

			if(e.keyCode === 13){
				if(ctrlDown){
					element.val(element.val()+'\n');
				}else{
					scope.$apply(function(){
						scope.$eval(attrs.ctrlEnterBreakLine);
					})
					e.preventDefault();
				}
			}
		})

	};
});