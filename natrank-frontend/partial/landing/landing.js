
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