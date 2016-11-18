(function () {
'use strict';

angular.module('Data')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['cats'];
function CategoriesController(cats) {
  var catList = this;
  catList.items = cats;
}

})();
