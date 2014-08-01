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
  .controller('ResultsCtrl', ['$scope', 'matchService', function($scope, matchService) {
  function init() {
    findAllResults();
  }

  function findAllResults() {
    matchService.findAll()
      .success(function(matches) {
        $scope.results = matches;
        console.log(matches);
      })
      .error(function(error) {
        $scope.results = 'Unable to load match data:' + error.message;
      });
  }

  init();
}]);