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
    var selector = $routeParams.selector;

    if (selector.toLowerCase() === 'latest') {
      findLatestRanking();
    } else {
      var date = new Date(selector);

      if (date instanceof Date && isFinite(date)) {
        findRankingByDate(date);
      } else {
        // TODO: handle incorrect date
      }
    }
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

  function findRankingByDate(date) {
    rankingService.findByDate(date)
      .success(findRankingSuccess)
      .error(findRankingError);
  }

  init();
}]);