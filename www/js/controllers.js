'use strict';

angular.module('KitApp.controllers', [])

.controller('HomeController', ['$rootScope', '$window', function($rootScope, $window) {
  var vm = this;
  vm.showLogin = true;
  vm.showContactSuggestion = true;
}])

.controller('LoginController', ['$rootScope', 'LoginService', function($window, LoginService) {

  var vm = this;

  vm.login = function(username, password) {
    LoginService.login(username, password);
  };

}])

.controller('AccountController', ['$window', 'LoginService', function($window, LoginService) {

  var vm = this;

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

  vm.getContacts = function() {     $cordovaContacts.pickContact()
     .then(function(result) {         console.log(result);     }); }

  vm.getNativeContact = ContactService.getNativeContact;
  vm.getNativeContacts = ContactService.getNativeContacts;

}]);
