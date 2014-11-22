angular.module('app').controller('myProfileCtrl', function($scope, myAuth, myIdentity, myNotifier) {
	$scope.email = myIdentity.currentUser.username;
	$scope.fname = myIdentity.currentUser.firstName;
	$scope.lname = myIdentity.currentUser.lastName;

	$scope.update = function() {
		var updatedUserData = {
			username: $scope.email,
			firstName: $scope.fname,
			lastName: $scope.lname
		};

		if ($scope.password && $scope.password.length > 0)
			updatedUserData.password = $scope.password;

		myAuth.updateCurrentUser(updatedUserData).then(function() {
			myNotifier.notify("Your user account has been updated.");
		}, function(reason) {
			myNotifier.error(reason);
		});
	}
})