(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.arr = [];
  $scope.TooMuchMessage = "";

  $scope.checkIfTooMuch = function () {
    var re = /\s*,\s*/;
    
    if ($scope.arr.length == 0) {
      $scope.TooMuchMessage = "Please, enter some data first!";
    } else {
    
      if ($scope.arr.split(re).length < 4) {
        $scope.TooMuchMessage = "Enjoy!";      
      } else {
        $scope.TooMuchMessage = "Too much!";
      }
    }
    
  };
}

})();
