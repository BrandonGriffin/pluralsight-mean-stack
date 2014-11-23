angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	var routeRoleChecks = {
		admin:  { auth: function(myAuth) {
			return myAuth.authorizeCurrentUserForRoute('admin');
			}
		},
		user: { auth: function(myAuth) {
			return myAuth.authorizeAuthenticatedUserForRoute()
			}
		}
	};

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	
	$routeProvider
		.when('/', {
			templateUrl: '/partials/main/main', 
			controller: 'myMainCtrl'
		}).when('/admin/users', {
			templateUrl: '/partials/admin/user-list', 
			controller: 'myUserListCtrl',
			resolve: routeRoleChecks.admin
		})
		.when('/signup', {
			templateUrl: '/partials/account/signup',
			controller: 'mySignupCtrl'
		})
		.when('/profile', {
			templateUrl: '/partials/account/profile',
			controller: 'myProfileCtrl',
			resolve: routeRoleChecks.user
		})
		.when('/courses', {
			templateUrl: '/partials/courses/course-list',
			controller: 'myCourseListCtrl'
		});	
});

angular.module('app').run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
		if(rejection === 'not authorized')
			$location.path('/');
	});
});