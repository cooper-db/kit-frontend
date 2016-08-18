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

.controller('ContactController', ['ContactService', 'LoginService', '$cordovaContacts', function(ContactService, LoginService, $cordovaContacts ) {
  var vm = this;

  vm.contacts = ContactService.contacts;

  vm.message = ContactService.message;

  vm.loginView = LoginService.loginView;

  vm.showAddContactForm = false;
  var isIOS = ionic.Platform.isIOS();
  //Works
  vm.getContacts = function() {
    $cordovaContacts.pickContact()
     .then(function(result) {

       if(isIOS == true){
         alert(Object.keys(result));
        //  alert(result.displayName); //This is null in IOS
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
         //  alert(result.addressess); //undefined
         //  alert(result.ims); // null
         //  alert(result.organizations); //null
         //  alert(result.birthday); // invalid date
         //  alert(result.note);
         //  alert(result.photos);
         //  alert(result.categories);
         //  alert(result.urls);
         //  alert(result[0]);
         //  alert(typeof result);
         //  alert(typeof result[0]);
         //  console.log(result);
       }



     });
   };


  // vm.contacts.arr[i].showForm = false;



  // vm.showForm = false;
  //
  // vm.showInfo = function() {
  //   if(!vm.showForm) {
  //     vm.showForm = true;
  //   } else {
  //     vm.showForm = false;
  //   }
  // }

}])

.controller('AddContactController', ['ContactService', '$cordovaContacts', function(ContactService, $cordovaContacts ) {
  var vm = this;
  //vm.addContact = ContactService.addContact;
  vm.addContact = function(name, phone, email, relationship, freq, notes){
    console.log('wat the hell');
    ContactService.addContact(name, phone, email, relationship, freq, notes);
  };

  vm.setPristine = function(){
    console.log('setting pristine');
    vm.createContactForm.$setPristine();
  };

}]);
