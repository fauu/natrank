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

angular.module('natrank', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate', 'highcharts-ng',
                           'angular-loading-bar']);

angular.module('natrank').config(function($routeProvider, $locationProvider, paginationConfig) {
  $routeProvider
    .when('/results/:year', {
      templateUrl: 'partial/results/results.html',
      controller: 'ResultsCtrl'
    })
    .when('/results', {
      templateUrl: 'partial/results/results.html',
      controller: 'ResultsCtrl',
      fullReload: true
    })
    .when('/rankings', {
      redirectTo: '/rankings/latest',
      fullReload: true
    })
    .when('/rankings/:selector', {
      templateUrl: 'partial/rankings/rankings.html',
      controller: 'RankingsCtrl'
    })
    .when('/teams/:name', {
      templateUrl: 'partial/team/team.html',
      controller: 'TeamCtrl',
      fullReload: true
    })
    /* Add New Routes Above */
    .otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);

  paginationConfig.boundaryLinks = true;
  paginationConfig.rotate = false;
  paginationConfig.maxSize = 10;
  paginationConfig.firstText = '«';
  paginationConfig.previousText = '‹';
  paginationConfig.nextText = '›';
  paginationConfig.lastText = '»';
});

angular.module('natrank').run(function($route, $rootScope, $location) {
  var originalLocation;

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(next.fullReload) {
      $rootScope.fullReload = true;
    }
  });

  $rootScope.$on('preventFullReload', function() {
    $rootScope.fullReload = false;
  });

  $rootScope.safeApply = function(fn) {
    var phase = $rootScope.$$phase;
    if (phase === '$apply' || phase === '$digest') {
      if (fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  originalLocation = $location.path;

  $location.path = function (path, reload) {
    if (reload === false) {
      var lastRoute = $route.current;
      var un = $rootScope.$on('$locationChangeSuccess', function () {
        $route.current = lastRoute;
        un();
      });
    }
    return originalLocation.apply($location, [path]);
  };
});
