chatRoomApp.config(function($routeProvider, $locationProvider){
	// 采用html5的pushState来实现路由
	$locationProvider.html5Mode(true);
	$routeProvider.
	when('/', {
		templateUrl: '/pages/room.html',
		controller: 'RoomCtrl'
	}).
	when('/login', {
		templateUrl: '/pages/login.html',
		controller: 'LoginCtrl'
	}).
	otherwise({
		redirectTo: '/login'
	});
})