angular.module('app').factory('myCachedCourses', function(myCourse) {
	var courseList;

	return {
		query: function() {
			if(!courseList)
				courseList = myCourse.query();

			return courseList;
		}
	}
});