
angular.module('natrank')
.service('teamService', ['$http', 'NATRANK_CONFIG',
function($http, NATRANK_CONFIG) {
  var urlBase = NATRANK_CONFIG.baseUrl + '/teams';

  this.findByName = function(name) {
    return $http.get(urlBase + '/' + name);
  };

  this.findRanksByName = function(name) {
    return $http.get(urlBase + '/' + name + '/ranks');
  };

  this.findRatingsByName = function(name) {
    return $http.get(urlBase + '/' + name + '/ratings');
  };
}]);
