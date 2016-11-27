(function () {
"use strict";

angular.module('public')
.directive('shortNameDir', SignUpDirective);

SignUpDirective.$inject = ['MenuService', '$q'];
function SignUpDirective(MenuService, $q) {
  var ddo = {
  	require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
    	ctrl.$asyncValidators.shortNameDir = function(modelValue, viewValue) {
    			return MenuService.getMenuItem(modelValue)
	    		.then(function (response) {
    				return $q.resolve();
    			})
    			.catch(function (error) {
    				return $q.reject();
    			});
    	}
    }
  };
  return ddo;
}

}) ()