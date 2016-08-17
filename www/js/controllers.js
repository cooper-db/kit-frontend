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


.controller('ContactController', ['ContactService', '$cordovaContacts', function(ContactService, $cordovaContacts ) {
  var vm = this;

  vm.contacts = ContactService.contacts;

  vm.message = ContactService.message;

  vm.showAddContactForm = false;

  //Works
  vm.getContacts = function() {     $cordovaContacts.pickContact()
     .then(function(result) {         console.log(result);     }); }


}])

.controller('AddContactController', ['ContactService', '$cordovaContacts', function(ContactService, $cordovaContacts ) {
  var vm = this;
  vm.addContact = ContactService.addContact;

}]);
