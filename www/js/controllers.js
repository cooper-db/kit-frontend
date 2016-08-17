'use strict';

angular.module('KitApp.controllers', [])

.controller('HomeController', ['LoginService', 'ContactService', function(LoginService, ContactService) {

  var vm = this;

  vm.loginView = LoginService.loginView;

  vm.contacts = ContactService.contacts;

  console.log(vm.contacts);

}])

.controller('AccountController', ['LoginService', 'SignupService', '$location', '$window', function(LoginService, SignupService, $location, $window) {

  var vm = this;

  vm.loginView = LoginService.loginView;

  vm.login = function(username, password) {
    LoginService.login(username, password);
  };

  vm.logout = function() {
    LoginService.logout();
  };

  vm.signup = function(user) {
    SignupService.signup(user);
    vm.loginView.show = false;
  };

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

  vm.addContact = function(name){
    console.log("connected to addContact function");
    console.log(name);
  };

}]);
