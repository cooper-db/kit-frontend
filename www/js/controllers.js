'use strict';

angular.module('KitApp.controllers', [])

.controller('HomeController', ['LoginService', 'ContactService', function(LoginService, ContactService) {

  var vm = this;

  vm.loginView = LoginService.loginView;

  vm.contacts = ContactService.contacts;

  vm.updateLastContact = ContactService.editContact;

  vm.suggestions = ContactService.possibleSuggestions;

}])

.controller('AccountController', ['LoginService', 'SignupService', function(LoginService, SignupService) {

  var vm = this;

  vm.loginView = LoginService.loginView;
  vm.errors = SignupService.errors;
  vm.loginErrors = LoginService.errors;

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

  vm.resetForm = {
    show: false
  };

  vm.resetFormToggle = function() {
    if (vm.resetForm.show === false) {
      vm.resetForm.show = true;
    } else {
      vm.resetForm.show = false;
    }
  };

  vm.resetPassword = function(newPassword) {
    SignupService.resetPassword(newPassword);
    vm.resetResponse = SignupService.resetResponse;
  };

}])


.controller('ContactController', ['ContactService', 'LoginService', '$cordovaContacts', '$window', function(ContactService, LoginService, $cordovaContacts, $window ) {
  var vm = this;

  vm.contacts = ContactService.contacts;

  vm.editContact = ContactService.editContact;

    vm.deleteContact = ContactService.deleteContact;

  vm.message = ContactService.message;

  vm.loginView = LoginService.loginView;

  var id = $window.sessionStorage.id;

  vm.showAddContactForm = false;


  var isIOS = ionic.Platform.isIOS();
  //Works
  vm.getContacts = function() {
    $cordovaContacts.pickContact()
     .then(function(result) {

       if(isIOS == true){
         ContactService.addContact(result.name.formatted, result.phoneNumbers[0].value);
         ContactService.getContacts(id);
        //  alert("Added Contact");

       } else {
         ContactService.addContact(result.name.formatted, result.phoneNumbers[0].value);
         ContactService.getContacts(id);
        //  alert("Added Contact");
       }

     });
   };

   vm.setPristine = function(){
     console.log('setting pristine');
     vm.editContactForm.$setPristine();
   };

  //  vm.showArrowUp = ContactService.showArrowUp;
  //  vm.showArrow = ContactService.showArrow;
   //
  //  vm.showArrowFunc = ContactService.showArrowFunc;

}])

.controller('AddContactController', ['ContactService', function(ContactService) {
  var vm = this;
  //vm.addContact = ContactService.addContact;
  vm.addContact = function(name, phone, email, relationship, freq, notes){
    console.log('wat the hell');
    ContactService.addContact(name, phone, email, relationship, freq, notes);
  };

  // vm.setPristine = ContactService.setPristine;

  vm.setPristine = function(){
    console.log('setting pristine');
    vm.createContactForm.$setPristine();
  };

}]);
