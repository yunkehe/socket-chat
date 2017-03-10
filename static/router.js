angular.
  module('chatRoomApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
		// 这句报错
		// $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

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
    }
  ]);