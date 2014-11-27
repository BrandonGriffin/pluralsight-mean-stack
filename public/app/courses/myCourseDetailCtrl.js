angular.module('app').controller('myCourseDetailCtrl', function($scope, myCachedCourses, $routeParams) {
	myCachedCourses.query().$promise.then(function(collection) {
		collection.forEach(function(course) {
			if (course._id === $routeParams.id) 
				$scope.course = course;
		})
	})
});