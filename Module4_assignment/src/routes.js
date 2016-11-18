(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController as catList',
    resolve: {
      cats: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{itemId}',
    templateUrl: 'src/templates/items.template.html',
    controller: "ItemsController as itemsList",
    resolve: {
      catItems: ['$stateParams','MenuDataService', 
        function ($stateParams, MenuDataService) {
          return MenuDataService.getAllCategories()
            .then(function (menuCategories) {
              var category = menuCategories[$stateParams.itemId].short_name;
              return MenuDataService.getItemsForCategory(category);
            });
      }]
    }
  });

}

})();
