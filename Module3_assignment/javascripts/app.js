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
      items.title = MenuSearchService.getSearchMessage(searchTerm, items.found);
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }
  
  items.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(items.found, itemIndex);
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
      if ( (searchTerm !== "") &&
        (searchTerm !== " ") &&
        (searchTerm !== null)) {
        for (var i = 0; i < menuItems.length; i++ ) {
          if (menuItems[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
            foundItems.push(menuItems[i]);
          }
        }
      }
      return foundItems;
    });
  };

  service.getSearchMessage = function (searchTerm, itemsFound) {
    var msg = "Nothing found!";
    var lengthMenuList = 0;
    if (itemsFound) {
      lengthMenuList = itemsFound.length;
    }
    if ( (searchTerm !== "") &&
        (searchTerm !== " ") &&
        (searchTerm !== null) &&
        (lengthMenuList > 0)) {
      msg = "Menu Items that contain:  " + searchTerm ;
    }
    return msg;
  }
 
  service.removeItem = function (items, itemIndex) {
    items.splice(itemIndex, 1);
  };
}

})();
