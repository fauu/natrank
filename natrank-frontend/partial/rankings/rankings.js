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
.controller('RankingsCtrl', ['$rootScope', '$scope', '$routeParams', 'rankingService',
function($rootScope, $scope, $routeParams, rankingService) {
  function init() {
    var selector = $routeParams.selector,
        fullParam = $routeParams.full,
        dynamic = true;

    $scope.months = [
      {k: 1,  v: 'January'},
      {k: 2,  v: 'February'},
      {k: 3,  v: 'March'},
      {k: 4,  v: 'April'},
      {k: 5,  v: 'May'},
      {k: 6,  v: 'June'},
      {k: 7,  v: 'July'},
      {k: 8,  v: 'August'},
      {k: 9,  v: 'September'},
      {k: 10, v: 'October'},
      {k: 11, v: 'November'},
      {k: 12, v: 'December'}
    ];

    if (selector.toLowerCase() === 'latest') {
      findLatestRanking();
    } else {
      var date = new Date(selector);

      if (date instanceof Date && isFinite(date)) {
        $scope.day = date.getDate();
        $scope.month = $scope.months[date.getMonth()].k;
        $scope.year = date.getFullYear();

        if (fullParam === 'full') {
          dynamic = false;
        }
      } else {
        // TODO: handle incorrect date
      }
    }

    $scope.isRankingDynamic = dynamic;

    $scope.$watch('[day, month, year]', function() {
      date.setDate($scope.day);
      date.setMonth($scope.month - 1);
      date.setFullYear($scope.year);

      findRankingByDate(date, dynamic);
    }, true);
  }

  var findRankingSuccess = function(ranking) {
    $scope.ranking = ranking;
  };

  var findRankingError = function(error) {
    $scope.ranking = 'Unable to load ranking data:' + error.message;
  };

  function findLatestRanking() {
    rankingService.findLatest()
      .success(findRankingSuccess)
      .error(findRankingError);
  }

  function findRankingByDate(date, dynamic) {
    rankingService.findByDate(date, dynamic)
      .success(findRankingSuccess)
      .error(findRankingError);
  }

  init();
}]);