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

angular.module('natrank').service('matchService', ['$http', function($http) {
  var urlBase = 'http://localhost:8080/matches';

  this.findPage = function(pageNo, year, teamName) {
    var paramString = '';

    if (year !== undefined && year !== 0) {
      paramString += '/year/' + year;
    } else if (teamName !== undefined && teamName.length !== 0) {
      paramString += '/team/' + teamName;
    }

    return $http.get(urlBase + paramString + '?page=' + pageNo);
  };
}]);