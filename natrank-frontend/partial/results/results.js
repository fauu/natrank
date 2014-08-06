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

angular.module('natrank').controller('ResultsCtrl',
['$scope', '$location', 'matchService',
function($scope, $location, matchService) {
  function init() {
    var attrs = $location.search();
    var pageNo = attrs.page || 0;

    findResultsPage(pageNo);
  }

  function findResultsPage(pageNo) {
    matchService.findPage(pageNo)
      .success(function(matchPage) {
        matchPage.number += 1; // zero-based -> one-based
        $scope.resultsPage = matchPage;
      })
      .error(function(error) {
        $scope.error = 'Unable to load match data:' + error.message;
      });
  }

  $scope.changePage = function(newPageNo) {
    findResultsPage(newPageNo - 1); // one based -> zero-based
  };

  init();
}]);