angular.module('app').controller('mySignupCtrl', function($scope, myUser, myNotifier, $location, myAuth) {
	$scope.signup = function() {
		console.log("going to sign up");
		var newUserData = {
			username: $scope.email,
			password: $scope.password,
			firstName: $scope.fname,
			lastName: $scope.lname
		};

		myAuth.createUser(newUserData).then(function() {
			myNotifier.notify("User account created");
			$location.path("/");
		}, function(reason) {
			myNotifier.error(reason);
		});
	};
})