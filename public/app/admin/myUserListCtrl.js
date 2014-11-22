angular.module('app').controller('myUserListCtrl', function($scope, myUser) {
	$scope.users = myUser.query();
})