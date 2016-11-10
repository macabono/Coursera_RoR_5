(function () {
'use strict';

angular.module('TestDirectiveApp', [])
.controller('TestListController', TestListController)
.service('TestListService', TestListService)
.directive('myTest', MyTestDirective);


function MyTestDirective() {
  var ddo = {
    templateUrl: 'myTest.html',
    scope: {
      items: '<',
      //onRemove: '&'
    }
  
    //controller: ShoppingListDirectiveController,
    //controllerAs: 'list',
    //bindToController: true
  };
  console.log(ddo);
  return ddo;
}

// function ShoppingListDirectiveController() {
//   var list = this; 
// }

TestListController.$inject = ['TestListService'];
function TestListController(TestListService) {
  var list = this;

  list.items = [
    {name: "Test1", val: 100},
    {name: "Test2", val: 50},
    {name: "Test3", val: 150},
    {name: "Test4", val: 75},
  ];
}

//TestListService.$inject = ['$http'];
function TestListService() {
  var service = this;

}

})();
