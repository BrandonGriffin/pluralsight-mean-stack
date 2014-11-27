angular.module('app').controller('myMainCtrl', function ($scope, myCourse, myCachedCourses) {
	$scope.courses = myCachedCourses.query();
});