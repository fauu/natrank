angular.module('natrank')
.controller('TeamCtrl', ['$scope', '$routeParams', 'teamService', 'matchService', 'rankingService',
function($scope, $routeParams, teamService, matchService, rankingService) {
  function init() {
    var name = $routeParams.name;

    $scope.team = {};
    $scope.isRankingDynamic = true;

    findTeam(name);
    findRankingExcerpt(name);
    findForm(name);
    findNotableMatchCategories();
    findNotableMatches(name);
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
      });
  }

  function findForm(name) {
    matchService.findTeamFormByName(name)
      .success(function(form) {
        $scope.teamForm = form;
        console.log($scope.teamForm);
      })
      .error(function(error) {
        $scope.teamForm = 'Unable to load team form data:' + error.message;
      });
  }

  function findNotableMatchCategories() {
    matchService.findNotableCategories()
      .success(function(categories) {
        $scope.notableMatchCategories =
            _.object(_.map(categories, function(x) { return [x.id, x.name] }));
      })
      .error(function(error) {
        $scope.notableMatchCategories = 'Unable to load notable match category data:' + error.message;
      });
  }

  function findNotableMatches(name) {
    matchService.findNotableByTeamName(name)
      .success(function(notableMatches) {
        $scope.notableMatches = notableMatches;
      })
      .error(function(error) {
        $scope.notableMatches = 'Unable to load notable matches data:' + error.message;
      });
  }

  init();
}]);