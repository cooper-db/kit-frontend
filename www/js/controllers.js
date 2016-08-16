'use strict';

angular.module('KitApp.controllers', [])

.controller('HomeController', function() {
  var vm = this;
  vm.showLogin = true;
  vm.showSignup = false;
  vm.showContactSuggestion = false;
})

.controller('LoginController', ['LoginService', function(LoginService) {
  var vm = this;
  vm.login = function(username, password) {
    LoginService.login(username, password);
  };
}])

.controller('SignupConroller', ['SignupService', function(SignupService) {
  var vm = this;
  vm.message = SignupService.message;
}]);
