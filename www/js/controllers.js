'use strict';

angular.module('KitApp.controllers', [])

.controller('HomeController', [function() {

  var vm = this;

}])

.controller('AccountController', ['LoginService', '$location', '$window', function(LoginService, $location, $window) {

  var vm = this;

  vm.showLogin = LoginService.showLogin;

  vm.login = function(username, password) {
    LoginService.login(username, password);
  };

  vm.logout = function() {
    LoginService.logout();
  };


}])

.controller('SignupController', ['SignupService', function(SignupService) {
  var vm = this;
  vm.message = SignupService.message;
}]);
