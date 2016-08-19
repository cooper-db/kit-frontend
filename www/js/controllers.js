'use strict';

angular.module('KitApp.controllers', [])

.controller('HomeController', ['LoginService', 'ContactService', '$cordovaSms', function(LoginService, ContactService, $cordovaSms) {

  var vm = this;

  vm.loginView = LoginService.loginView;

  vm.contacts = ContactService.contacts;

  vm.updateLastContact = ContactService.editContact;

  vm.suggestions = ContactService.possibleSuggestions;

  vm.smsMessage = "Hi, ";

  vm.sendSms =   function(number){
    var options = {
      replaceLineBreaks: true, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'
      }
    };
    return $cordovaSms.send(number, vm.smsMessage, options).then(function(data){
      // ContactService.editContact();
      console.log(data);
    });
  };



}])

.controller('AccountController', ['LoginService', 'SignupService', function(LoginService, SignupService) {

  var vm = this;

  vm.loginView = LoginService.loginView;
  vm.errors = SignupService.errors;
  vm.loginErrors = LoginService.errors;
  vm.form = LoginService.loginForm;

  vm.login = function(username, password) {
    LoginService.login(username, password).then(function(){
      vm.form = {};
      vm.loginErrors.message = {};
    });
    // vm.form = {};
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

  vm.setPristine = function(){
    console.log('setting pristine');
    vm.loginForm.$setPristine();
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
         console.log('Contact Picked');
        //  alert('contact picked');
       if(isIOS === true){
         ContactService.addContact(result.name.formatted, result.phoneNumbers[0].value);
        //  ContactService.getContacts(id);
        //  alert("Added Contact");
       } else {
         ContactService.addContact(result.name.formatted, result.phoneNumbers[0].value);
         console.log("Detected NON IOS");
        //  ContactService.getContacts(id);
        //  alert("Detected NON IOS");
       }
     });
   };

   vm.setPristine = function(){
     console.log('setting pristine');
     vm.editContactForm.$setPristine();
   };

}])

.controller('AddContactController', ['ContactService', '$window', function(ContactService, $window) {
  var vm = this;

  var id = $window.sessionStorage.id;

  vm.addContact = function(name, phone, email, relationship, freq, notes){
    console.log('wat the hell');
    ContactService.addContact(name, phone, email, relationship, freq, notes);
    ContactService.getContacts(id);
  };

  // vm.setPristine = ContactService.setPristine;

  vm.setPristine = function(){
    console.log('setting pristine');
    vm.createContactForm.$setPristine();
  };

}]);
