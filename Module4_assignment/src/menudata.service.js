(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiCatPath', "https://davids-restaurant.herokuapp.com/categories.json")
.constant('ApiItemsPath', "https://davids-restaurant.herokuapp.com/menu_items.json");;

MenuDataService.$inject = ['$http', 'ApiCatPath', 'ApiItemsPath'];
function MenuDataService($http, ApiCatPath, ApiItemsPath) {
  var service = this;

  service.getAllCategories = function () {
    return $http({ 
      method: "GET", 
      url: ApiCatPath
    }).then(function (result) {
      var menuCategories = result.data;
      return menuCategories;
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({ 
      method: "GET", 
      url: ApiItemsPath,
      params: {category: categoryShortName}
    }).then(function (result) {
      var menuItems = result.data;  
      return menuItems;
    });
  };
}

})();
