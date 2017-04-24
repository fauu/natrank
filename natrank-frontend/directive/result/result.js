angular.module('natrank').directive('result', function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'directive/result/result.html'
	};
});
