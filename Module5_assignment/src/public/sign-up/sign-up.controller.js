(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
	var formCtrl = this;

  formCtrl.submit = function (short_name) {
    var promise = MenuService.getMenuItem(short_name)
    promise.then(function (response) {
      formCtrl.user.menuItem = response;
      formCtrl.saved = MenuService.saveUser(formCtrl.user);
      formCtrl.error = false;
    })
    .catch(function (error) {
    	formCtrl.saved = false;
      if (error.status == 500) {
      	formCtrl.error = "No such menu item exists!" ;
      }
      else {
      	formCtrl.error = error.data.status + " ( " + error.statusText + " )";
      }
    });
  };
}

})();