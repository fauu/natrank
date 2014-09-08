angular.module('natrank').filter('dashedToProper', function() {
  return function(input) {
    return !input ? '' : input.replace(/-/g, ' ').replace(/\w\S*/g, function(str) {
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
  };
});
