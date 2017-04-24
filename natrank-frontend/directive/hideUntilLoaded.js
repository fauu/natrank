angular.module('natrank')
.directive('hideUntilLoaded', ['$http', '$animate', function($http, $animate) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
      scope.isLoading = function() {
        return $http.pendingRequests.length > 0;
      };

      scope.$watch(scope.isLoading, function(isLoading) {
        $animate[(scope.fullReload && isLoading) ? 'addClass' : 'removeClass'](element, 'ng-hide');
      });
		}
	};
}]);
