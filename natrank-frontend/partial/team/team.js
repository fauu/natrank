angular.module('natrank')
.controller('TeamCtrl', ['$scope', '$routeParams', 'teamService', 'rankingService',
function($scope, $routeParams, teamService, rankingService) {
  function init() {
    var name = $routeParams.name;

    $scope.team = {};
    $scope.isRankingDynamic = true;

    findTeam(name);
    findRankingExcerpt(name);
  }

  function findTeam(name) {
    teamService.findByName(name)
      .success(function(team) {
        $scope.team = team;
        $scope.teamRank = team.latestRankingEntry.rank;
      })
      .error(function(error) {
        $scope.team = 'Unable to load team data:' + error.message;
      });
  }

  function findRankingExcerpt(name) {
    rankingService.findLatestExcerptByTeamName(name)
      .success(function(ranking) {
        $scope.ranking = ranking;
      })
      .error(function(error) {
        $scope.ranking = 'Unable to load ranking data:' + error.message;
      })
  }

  init();
}]);