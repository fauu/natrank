
angular.module('natrank').filter('properToDashed', function() {
	return function(input) {
    return !input ? '' : input.toLowerCase().replace(/ /g, '-');
	};
});