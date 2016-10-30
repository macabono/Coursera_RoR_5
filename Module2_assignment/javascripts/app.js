(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemToBuy = this;

  itemToBuy.items = ShoppingListCheckOffService.getItemsToBuy()

  itemToBuy.itemBought = function (itemIndex) {
    ShoppingListCheckOffService.addBoughtItem(itemIndex);
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getItemsBought();

}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items1 = [{name: "cookies_1", quantity:3}, 
                {name: "cookies_2", quantity:6}, 
                {name: "cookies_3", quantity:2},
                {name: "cookies_4", quantity:6},
                {name: "cookies_5", quantity:2},
                {name: "cookies_6", quantity:10}];
  var items2 = [];

  service.addBoughtItem = function (i) {
    var item = {
      name: items1[i].name,
      quantity: items1[i].quantity
    };
    items2.push(item);
  };

  service.removeItem = function (itemIndex) {
    items1.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return items1;
  };

  service.getItemsBought = function () {
    return items2;
  };

}

})();
