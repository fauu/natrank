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

angular.module('natrank', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate']);

angular.module('natrank').config(function($routeProvider, $locationProvider) {
  $routeProvider
    /* Add New Routes Above */
    .when('/results', {
      templateUrl: 'partial/results/results.html',
      controller: 'ResultsCtrl'
    })
    .when('/rankings', {
      templateUrl: 'partial/rankings/rankings.html',
      controller: 'RankingsCtrl'
    })
    .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
});

angular.module('natrank').run(function($rootScope) {
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
});
