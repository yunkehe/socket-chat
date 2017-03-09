var chatRoomApp = angular.module('chatRoomApp', ['ngRoute']);

chatRoomApp.run(function($window, $rootScope, $http, $location){
	$http({
		url: '/api/validate',
		method: 'GET'

	}).then(function(user){
		// 1.6抛弃了success/error
		$rootScope.me = user;
		$location.path('/');

	}).catch(function(data){
		$location.path('/login');
	});
});

chatRoomApp.factory('socket', function($rootScope){
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
