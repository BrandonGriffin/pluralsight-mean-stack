angular.module('app').controller('myCourseListCtrl', function($scope, myCourse) {
	$scope.courses = myCourse.query();

	$scope.sortOptions = [{ value: "title", text: "Sort by Title" },
		{ value: "published", text: "Sort by Publish Date" }];

	$scope.sortOrder = $scope.sortOptions[0].value;
});