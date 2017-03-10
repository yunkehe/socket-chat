angular.module('chatRoomApp').controller('LoginCtrl', function ($scope, $http, $location) {
	$scope.login = function(){
		console.log('email', $scope.email)
		$http({
			url: '/api/login',
			method: 'POST',
			data: {
				email: $scope.email
			}
		}).then(function(user){
			$scope.$emit('login', user);
			$location.path('');
		}).catch(function(data){
			// 登陆失败
			$location.path('/login');
		})
	}
})