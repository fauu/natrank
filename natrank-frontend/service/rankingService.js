
angular.module('natrank')
.service('rankingService', ['$http', 'NATRANK_CONFIG',
function($http, NATRANK_CONFIG) {
  var urlBase = NATRANK_CONFIG.baseUrl + '/rankings';

  this.findLatest = function() {
    return $http.get(urlBase + '/latest');
  };

  this.findLatestExcerptByTeamName = function(teamName) {
    return $http.get(urlBase + '/excerpt/' + teamName);
  };

  this.findByDate = function(date) {
    var year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString(),
        day = date.getDate().toString();

    month = (month.length == 1) ? '0' + month : month;
    day = (day.length == 1) ? '0' + day : day;

    var dateString = [year, month, day].join('-');

    return $http.get(urlBase + '/' + dateString);
  };
}]);
