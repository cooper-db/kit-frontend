'use strict';

angular.module('KitApp.controllers', [])

.controller('HomeController', ['LoginService', 'ContactService', function(LoginService, ContactService) {

  var vm = this;

  vm.loginView = LoginService.loginView;

  vm.contacts = ContactService.contacts;

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
  var isIOS = ionic.Platform.isIOS();
  //Works
  vm.getContacts = function() {
    $cordovaContacts.pickContact()
     .then(function(result) {

       if(isIOS == true){
         alert(Object.keys(result));
        //  alert(result.name.givenName);
        //  alert(result.name.familyName);
         alert(result.name.formatted); // USE THIS FOR SIMPLICITY
         alert(Object.keys(result.phoneNumbers)); //This is an array // [object, Object]
         alert(JSON.stringify(result.phoneNumbers[0])); //This is an array // [object, Object]
         alert(result.phoneNumbers[0].value); // PHONE NUMBER!!
         alert(result.phoneNumbers[0].type); //PHONE NUMBER TYPE
         alert(Object.keys(result));

       } else {
         // result // this is an object
          alert(Object.keys(result));
         //  alert(result.id); //This is number
          // alert(result.displayName); //This is text // N/A in IOS
          // alert(result.name.familyName);
          // alert(result.givenName);
          alert(result.name.formatted); //USE FOR SIMPlICITY
          // alert(Object.keys(result.name));
          alert(JSON.stringify(result.phoneNumbers[0])); //This is an array // [object, Object]
          alert(result.phoneNumbers[0].value); // PHONE NUMBER!!
          alert(result.phoneNumbers[0].type); //PHONE NUMBER TYPE

       }

       

     });
   };


}])

.controller('AddContactController', ['ContactService', '$cordovaContacts', function(ContactService, $cordovaContacts ) {
  var vm = this;
  vm.addContact = ContactService.addContact;

  vm.setPristine = function(){
    console.log('setting pristine');
    vm.createContactForm.$setPristine();
  };

}]);
