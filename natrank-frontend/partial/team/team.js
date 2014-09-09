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
.controller('TeamCtrl', ['$scope', '$routeParams', 'teamService', 'matchService', 'rankingService',
function($scope, $routeParams, teamService, matchService, rankingService) {
  function init() {
    var name = $routeParams.name;

    $scope.team = {};
    $scope.isRankingDynamic = true;

    findTeam(name);
    findRankingExcerpt(name);
    findForm(name);
    findRanks(name);
    findRatings(name);
    findNotableMatchCategories();
    findNotableMatches(name);

//    Highcharts.setOptions({
//      lang: {
//        thousandsSep: ''
//      }
//    });

    // TODO: Work on x axis after zooming
    $scope.rankingHistoryChartConfig = {
      options: {
        title: null,
        colors: ['#428BCA', '#F0AD4E'],
        chart: {
          spacingLeft: 27,
          spacingRight: 37,
          spacingBottom: 10,
          zoomType: 'x',
          style: {
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '12px'
          }
        },
        tooltip: {
          xDateFormat: '%m/%d/%Y',
          useHTML: true,
          backgroundColor: 'rgba(0, 0, 0, 0.87)',
          borderWidth: 0,
          borderRadius: 8,
          shadow: false,
          style: {
            color: '#FFFFFF'
          }
        },
        legend: {
          margin: 3
        },
        xAxis: {
          title: {
            text: 'Year',
            offset: 32
          },
          type: 'datetime',
          labels: {
            format: '{value: %Y}',
            y: 22
          }
        },
        yAxis: [
          {
            title: {
              text: 'Rating',
              offset: 40
            },
            labels: {
              x: -4,
              y: 3
            },
            alternateGridColor: '#FDFDFD'
          },
          {
            title: {
              text: 'Rank',
              offset: 25
            },
            labels: {
              x: 3,
              y: 3,
              formatter: function() {
                if (this.value !== 0) {
                  return this.value;
                } else {
                  return null;
                }
              }
            },
            opposite: true,
            reversed: true,
            allowDecimals: false,
            floor: 1
          }
        ]
      },
      series: [
        {
          yAxis: 0,
          name: 'Rating',
          type: 'spline',
          zIndex: 5,
          data: []
        },
        {
          yAxis: 1,
          name: 'Rank',
          type: 'line',
          step: true,
          data: []
        }
      ]
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
        $scope.team.extremes = [];
        $scope.team.extremes.push($scope.team.highestRank);
        $scope.team.extremes.push($scope.team.lowestRank);
        $scope.team.extremes.push($scope.team.highestRating);
        $scope.team.extremes.push($scope.team.lowestRating);
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

  function findRanks(name) {
    teamService.findRanksByName(name)
      .success(function(teamRanks) {
        var rankChartData = [];

        _.each(teamRanks, function(rank) {
          rankChartData.push([new Date(rank.date).getTime(), rank.value]);
        });

        $scope.rankingHistoryChartConfig.series[1].data = rankChartData;
      })
      .error(handleError);
  }

  function findRatings(name) {
    teamService.findRatingsByName(name)
      .success(function(teamRatings) {
        var ratingChartData = [];

        _.each(teamRatings, function(rating) {
          ratingChartData.push([new Date(rating.date).getTime(), rating.value]);
        });

        $scope.rankingHistoryChartConfig.series[0].data = ratingChartData;
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