angular.module('app').factory('myAuth', function($http, myIdentity, $q, myUser){
	return {
		authenticateUser: function(username, password) {
			var deferred = $q.defer();

			$http.post('/login', { username:username, password: password }).then(function(response){
				if(response.data.success) {
					var user = new myUser();
					angular.extend(user, response.data.user);
					myIdentity.currentUser = user;
					deferred.resolve(true);
				}
				else {
					deferred.resolve(false);
				}
			});

			return deferred.promise;
		},

		createUser: function(newUserData) {
	      var newUser = new myUser(newUserData);
	      var deferred = $q.defer();

	      newUser.$save(function() {
	        myIdentity.currentUser = newUser;
	        deferred.resolve();
	      }, function(response) {
	        deferred.reject(response.data.reason);
	      });

	      return deferred.promise;
	    },

	    updateCurrentUser: function(updatedUserData) {
	    	var deferred = $q.defer();
	    	var clonedUser = angular.copy(myIdentity.currentUser);
	    	angular.extend(clonedUser, updatedUserData);

	    	clonedUser.$update().then(function() {
	    		myIdentity.currentUser = clonedUser;
	    		deferred.resolve();
	    	}, function(response) {
	    		deferred.reject(response.data.reason);
	    	});	

	    	return deferred.promise;
	    },

		logoutUser: function() {
			var deferred = $q.defer();

			$http.post('/logout', {logout: true}).then(function() {
				myIdentity.currentUser = undefined;
				deferred.resolve();
			});		

			return deferred.promise;
		},

		authorizeCurrentUserForRoute: function(role) {
			if(myIdentity.isAuthorized(role))
				return true;
			else
				return $q.reject('not authorized');
		},

		authorizeAuthenticatedUserForRoute: function() {
			if(myIdentity.isAuthenticated)
				return true;
			else
				return $q.reject('not authorized');
		}
	}
});