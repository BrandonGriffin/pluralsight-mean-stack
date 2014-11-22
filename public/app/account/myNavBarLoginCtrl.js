angular.module('app').controller('myNavBarLoginCtrl', function($scope, $http, myIdentity, myNotifier, myAuth, $location) {
	$scope.identity = myIdentity;
	
	$scope.signIn = function(username, password) {
		myAuth.authenticateUser(username, password).then(function(success) {
			if(success) 
				myNotifier.notify('You are in');		
			else
				myNotifier.notify('Username/Password comination incorrect');
		});
	};

	$scope.signOut = function() {
		myAuth.logoutUser().then(function() {
			$scope.username = "";
			$scope.password = "";
			myNotifier.notify("You have been signed out.");
			$location.path('/');
		});
	};
})