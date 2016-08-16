'use strict';

angular.module('KitApp.controllers', [])

.controller('HomeController', ['LoginService', function(LoginService) {

  var vm = this;

  vm.loginView = LoginService.loginView;

}])

.controller('AccountController', ['LoginService', '$location', '$window', function(LoginService, $location, $window) {

  var vm = this;

  vm.loginView = LoginService.loginView;

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
}])

.controller('ContactController', ['ContactService', '$cordovaContacts', function(ContactService, $cordovaContacts) {
  var vm = this;
  vm.message = ContactService.message;

  //Works
  vm.getContacts = function() {     $cordovaContacts.pickContact()
     .then(function(result) {         console.log(result);     }); }

     //Doesn't Work
  // vm.getNativeContact = ContactService.getNativeContact;
  // vm.getNativeContacts = ContactService.getNativeContacts;

}]);
