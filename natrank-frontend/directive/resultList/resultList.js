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
.directive('resultList', function() {
	return {
    restrict: 'A',
    replace: true,
    templateUrl: 'directive/resultList/resultList.html',
    controller: function ($scope, $location, $routeParams, matchService) {
      function init() {
        var attrs = $location.search(),
            pageNo = attrs.page || 0,
            year = parseInt($routeParams.year);

        if (isValidYear(year)) {
          $scope.year = year;
        }

        $scope.pageChanged = function () {
          var newPageNo = $scope.resultsPage.number - 1, // one based -> zero based
              year = $scope.year;

          $scope.$emit('preventFullReload');

          if (isValidYear(year)) {
            findResultsPageForYear(newPageNo, year);
          } else if ($scope.team) {
            findResultsPageForTeam(newPageNo, $scope.team.currentCountry.name.toLowerCase());
          } else {
            findResultsPage(newPageNo);
          }

          pageNo = newPageNo;
        };

        $scope.$watch('team', function() {
          if (!_.isEmpty($scope.team)) {
            findResultsPageForTeam(pageNo, $scope.team.currentCountry.name.toLowerCase());
          }
        });

        $scope.$watch('year', function () {
          if ($scope.year && !isNaN($scope.year)) {

            $location.path('results/' + $scope.year, false).replace();

            findResultsPageForYear(pageNo, $scope.year);
          } else if (!$scope.team) {
            $location.path('results', false).replace();

            findResultsPage(pageNo);
          }
        });

        $scope.filterDeleteClicked = function () {
          $scope.year = null;
        };
      }

      function findResultsPage(pageNo) {
        $scope.loadingPage = true;

        matchService.findPage(pageNo)
          .success(findResultsPageSuccess)
          .error(findResultsPageError);
      }

      function findResultsPageForYear(pageNo, year) {
        $scope.loadingPageForYear = true;

        matchService.findPage(pageNo, year)
          .success(findResultsPageSuccess)
          .error(findResultsPageError);
      }

      function findResultsPageForTeam(pageNo, teamName) {
        $scope.loadingPage = true;

        matchService.findPage(pageNo, 0, teamName)
          .success(findResultsPageSuccess)
          .error(findResultsPageError);
      }

      var findResultsPageSuccess = function (matchPage) {
        matchPage.number += 1; // zero-based -> one-based
        $scope.resultsPage = matchPage;
        $scope.loadingPage = false;
        $scope.loadingPageForYear = false;
      };

      var findResultsPageError = function (error) {
        $scope.error = 'Unable to load match data:' + error.message;
      };

      function isValidYear(year) {
        return !isNaN(year) && year >= 1872 && year <= 2014;
      }

      init();
    }
  };
});
