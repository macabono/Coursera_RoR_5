(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    //controller: ShoppingListDirectiveController,
    //controllerAs: 'list',
    //bindToController: true
  };
  return ddo;
}
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var items = this;
  
  items.foundItems = function(searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm); 
    promise.then(function (response) {
      items.found = response;
      items.title = "Menu Items that contains:  " + searchTerm;
      console.log(items);
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
    
  }
  
  items.removeItem = function (itemIndex) {
    //this.lastRemoved = "Last item removed was " + this.items[itemIndex].description;
    console.log(itemIndex);
    MenuSearchService.removeItem(itemIndex);
  };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    
    return $http({ 
      method: "GET", 
      url: ApiBasePath
    }).then(function (result) {
      var menuItems = result.data.menu_items;      
      // process result and only keep items that match
      var foundItems = [];
      for (var i = 0; i < menuItems.length; i++ ) {
        if (menuItems[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(menuItems[i]);
        }
      }
      return foundItems;
    });
  };
 
  service.removeItem = function (itemIndex) {
    console.log(itemIndex);
    found.splice(itemIndex, 1);
  };
}

})();
