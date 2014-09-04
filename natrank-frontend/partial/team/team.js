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
    findRatings(name);
    findNotableMatchCategories();
    findNotableMatches(name);

    $scope.ratingHistoryChartConfig = {
      options: {
        title: null,
        chart: {
          type: 'line',
          spacingLeft: 45,
          spacingRight: 20,
          spacingBottom: 40
        },
        xAxis: {
          labels: {
            enabled: false
          },
          tickLength: 0
        },
        yAxis: {
          title: null
        }
      },
      series: []
    };
  }

  var handleError = function(error) {
    console.log(error.message);
  };

  function findTeam(name) {
    teamService.findByName(name)
      .success(function(team) {
        $scope.team = team;
        $scope.teamRank = team.latestRankingEntry.rank;
      })
      .error(handleError);
  }

  function findRankingExcerpt(name) {
    rankingService.findLatestExcerptByTeamName(name)
      .success(function(ranking) {
        $scope.ranking = ranking;
      })
      .error(handleError);
  }

  function findForm(name) {
    matchService.findTeamFormByName(name)
      .success(function(form) {
        $scope.teamForm = form;
      })
      .error(handleError);
  }

  function findRatings(name) {
    teamService.findRatingsByName(name)
      .success(function(teamRatings) {
        var ratingArray = [];

        _.each(teamRatings, function(rating) {
          ratingArray.push(rating.value);
        });

        $scope.ratingHistoryChartConfig.series.push({
          showInLegend: false,
          data: ratingArray
        });
      })
      .error(handleError);
  }

  function findNotableMatchCategories() {
    matchService.findNotableCategories()
      .success(function(categories) {
        $scope.notableMatchCategories =
            _.object(_.map(categories, function(x) { return [x.id, x.name]; }));
      })
      .error(handleError);
  }

  function findNotableMatches(name) {
    matchService.findNotableByTeamName(name)
      .success(function(notableMatches) {
        $scope.notableMatches = notableMatches;
      })
      .error(handleError);
  }

  init();
}]);