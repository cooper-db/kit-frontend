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
