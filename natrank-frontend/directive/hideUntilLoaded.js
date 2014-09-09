/*
 * Copyright (C) 2014 natrank Developers (http://github.com/fauu/natrank)
 *
 * This software is licensed under the GNU General Public License
 * (version 3 or later). See the COPYING file in this distribution.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this software. If not, see <http://www.gnu.org/licenses/>.
 *
 * Authored by: Piotr Grabowski <fau999@gmail.com>
 */

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
