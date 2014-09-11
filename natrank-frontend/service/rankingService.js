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

angular.module('natrank').service('rankingService', ['$http', function($http) {
  var urlBase = 'http://localhost:8080/rankings';

  this.findLatest = function() {
    return $http.get(urlBase + '/latest');
  };

  this.findLatestExcerptByTeamName = function(teamName) {
    return $http.get(urlBase + '/excerpt/' + teamName);
  };

  this.findByDate = function(date) {
    var dateString = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' +
                     date.getDate().toString();

    return $http.get(urlBase + '/' + dateString);
  };
}]);