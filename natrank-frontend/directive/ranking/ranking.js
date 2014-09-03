angular.module('natrank').directive('ranking', function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'directive/ranking/ranking.html'
	};
});
