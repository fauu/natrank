/*
 * Copyright (C) 2014-2016 natrank Developers (http://github.com/fauu/natrank)
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
.controller('LandingCtrl', ['$scope', 'matchService',
function($scope, matchService) {
  function init() {
    findLatestMatchDate();
  }

  function findLatestMatchDate() {
    matchService.findLatestDate()
      .success(function(date) {
        $scope.latestMatchDate = moment(date.substr(1, date.length - 2)).format('D/M/YYYY');
      })
      .error(function(error) {
        console.log(error.message);
      });
  }

  init();
}]);