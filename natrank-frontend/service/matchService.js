
angular.module('natrank')
.service('matchService', ['$http', 'NATRANK_CONFIG',
function($http, NATRANK_CONFIG) {
  var urlBase = NATRANK_CONFIG.baseUrl + '/matches';

  this.findPage = function(pageNo, year, teamName) {
    var paramString = '';

    if (year !== undefined && year !== 0) {
      paramString += '/year/' + year;
    } else if (teamName !== undefined && teamName.length !== 0) {
      paramString += '/team/' + teamName;
    }

    return $http.get(urlBase + paramString + '?page=' + pageNo);
  };

  this.findNotableCategories = function() {
    return $http.get(urlBase + '/notable/categories');
  };

  this.findNotableByTeamName = function(teamName) {
    return $http.get(urlBase + '/notable/team/' + teamName);
  };

  this.findTeamFormByName = function(teamName) {
    return $http.get(urlBase + '/form/team/' + teamName);
  };

  this.findLatestDate = function() {
    return $http.get(urlBase + '/latest-date');
  };

}]);