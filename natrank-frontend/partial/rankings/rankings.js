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
.controller('RankingsCtrl', ['$scope', '$location', '$route', '$routeParams', 'rankingService',
function($scope, $location, $route, $routeParams, rankingService) {
  var date,
      dynamic,
      selector;

  function init() {
    selector = $routeParams.selector;

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
      $scope.isRankingDynamic = false;
      dynamic = false;

      findLatestRanking();
    } else {
      $scope.isRankingDynamic = true;

      var dateFragments = selector.split('-');
      date = new Date(dateFragments[0], dateFragments[1] - 1, dateFragments[2]);

      if (date instanceof Date && isFinite(date)) {
        dynamic = true;

        $scope.day = date.getDate();
        $scope.month = $scope.months[date.getMonth()].k;
        $scope.year = date.getFullYear();
      } else {
        // TODO: handle incorrect date
      }
    }

    $scope.$watch('[day, month, year]', function() {
      var dateStr;

      if (!selector || selector.toLowerCase() !== 'latest') {
        $scope.$emit('preventFullReload');
      }

      $scope.loadingRanking = true;

      if (dynamic) {
        if (!isNaN($scope.day) && !isNaN($scope.month) && !isNaN($scope.year)) {
          date.setDate($scope.day);
          date.setMonth($scope.month - 1);
          date.setFullYear($scope.year);

          dateStr = date.getFullYear() + '-' +
            ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
            ('0' + date.getDate()).slice(-2);

          $location.path('rankings/' + dateStr, false).replace();

          findRankingByDate(date);
        }
      }

      selector = null;
    }, true);
  }

  var findRankingSuccess = function(ranking) {
    $scope.ranking = ranking;

    $scope.loadingRanking = false;

    if (!dynamic) {
      var dateFragments = $scope.ranking.date.split('-');

      date = new Date(dateFragments[0], dateFragments[1], dateFragments[2]);

      $scope.day = date.getDate();
      $scope.month = $scope.months[date.getMonth()].k;
      $scope.year = date.getFullYear();

      dynamic = true;
    } else {
      $scope.isRankingDynamic = true;
    }
  };

  var findRankingError = function(error) {
    $scope.ranking = 'Unable to load ranking data:' + error.message;
  };

  function findLatestRanking() {
    rankingService.findLatest()
      .success(findRankingSuccess)
      .error(findRankingError);
  }

  function findRankingByDate(date) {
    rankingService.findByDate(date)
      .success(findRankingSuccess)
      .error(findRankingError);
  }

  init();
}]);