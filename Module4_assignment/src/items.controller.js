(function () {
'use strict';

angular.module('Data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['catItems'];
function ItemsController(catItems) {
  var itemsList = this;
  itemsList.items = catItems.menu_items;
  itemsList.catName = catItems.category.name;
}

})();
