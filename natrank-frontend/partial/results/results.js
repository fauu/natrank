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
.controller('ResultsCtrl', ['$scope', '$location', '$routeParams', 'matchService',
function($scope, $location, $routeParams, matchService) {
  function init() {
    var attrs = $location.search(),
        pageNo = attrs.page || 0,
        year = parseInt($routeParams.year);

    // FIXME: DRY
    if (!isNaN(year) && year >= 1872 && year <= 2014) {
      $scope.year = year;
    }

    $scope.$watch('year', function() {
      if ($scope.year && !isNaN($scope.year)) {
        $location.path('results/' + $scope.year, false).replace();

        findResultsPageFilterByYear(pageNo, $scope.year);
      } else {
        $location.path('results', false).replace();

        findResultsPage(pageNo);
      }
    });

    $scope.filterDeleteClicked = function() {
      $scope.year = null;
    };

    $scope.pageChanged = function() {
      var newPageNo = $scope.resultsPage.number - 1, // one based -> zero based
        year = $scope.year;

      // FIXME: DRY
      if (!isNaN(year) && year >= 1872 && year <= 2014) {
        findResultsPageFilterByYear(newPageNo, year);
      } else {
        findResultsPage(newPageNo);
      }
    };

  }

  function findResultsPage(pageNo) {
    matchService.findPage(pageNo)
      .success(findResultsPageSuccess)
      .error(findResultsPageError);
  }

  function findResultsPageFilterByYear(pageNo, year) {
    matchService.findPage(pageNo, year)
      .success(findResultsPageSuccess)
      .error(findResultsPageError);
  }

  var findResultsPageSuccess = function(matchPage) {
    matchPage.number += 1; // zero-based -> one-based
    $scope.resultsPage = matchPage;
  };

  var findResultsPageError = function(error) {
    $scope.error = 'Unable to load match data:' + error.message;
  };

  init();
}]);