angular.module('natrank')
.controller('HeaderCtrl',
function($scope, $location) {
  $scope.isActive = function (location) {
    return $location.path().indexOf(location) === 0;
  };
});